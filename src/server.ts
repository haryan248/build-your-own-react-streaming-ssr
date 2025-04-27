import { PassThrough, Readable } from "stream";

import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { createElement } from "react";
import ReactDomServer from "react-dom/server";

import App from "./client";

const app = new Hono();

serve(app, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
// 정적 js파일 받아올 수 있도록 세팅
app.use("/build/*", serveStatic({ root: "./" }));

const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
const header = `
<!DOCTYPE html>
  <html>
    <head>
      <title>Hello World</title>
      <script type="module" src="/build/client.js"></script>
    </head>
    <body>
      <div id="root">`.replace(/\n\s*/g, "");
const trailer = `</div></body></html>`;

app.get("/", async () => {
  const element = createElement(App);

  const reactAppPassThrough = new PassThrough();
  const reactAppStream = Readable.toWeb(reactAppPassThrough);

  const { pipe, abort } = ReactDomServer.renderToPipeableStream(element, {
    onShellReady() {
      pipe(reactAppPassThrough);
    },
    onError(error) {
      reactAppPassThrough.destroy();
      abort(error);
    }
  });

  const decodeChunk = (chunk: unknown) => {
    if (chunk instanceof Uint8Array) {
      return textDecoder.decode(chunk);
    }

    return String(chunk);
  };

  const onResponseStreamStart = async (controller: ReadableStreamDefaultController<Uint8Array>) => {
    // [1] HTML 시작 chunk 전달 (`<!DOCTYPE html><html><head><title>Hello World</title></head><body><div id="root"></div>`)
    controller.enqueue(textEncoder.encode(header));

    // [2] React Stream chunk 전달
    try {
      let chunk: ReadableStreamReadResult<Uint8Array>;

      const reader = reactAppStream.getReader();

      while (true) {
        chunk = await reader.read();

        if (chunk.done) {
          break;
        }

        const decodedChunk = decodeChunk(chunk.value);
        controller.enqueue(textEncoder.encode(decodedChunk));
      }
    } catch (error) {
      controller.error(error);
    } finally {
      // [3] HTML 종료 chunk 전달 `</body></html>`
      controller.enqueue(textEncoder.encode(trailer));
      controller.close();
    }
  };

  const responseStream = new ReadableStream<Uint8Array>({ start: onResponseStreamStart });

  return new Response(responseStream, {
    headers: {
      "Content-type": "text/html; charset=UTF-8"
    }
  });
});
