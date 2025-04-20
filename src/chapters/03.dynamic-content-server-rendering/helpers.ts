import { PassThrough, Readable } from "stream";

import ReactDomServer from "react-dom/server";

/**
 * UTILS
 * @see https://github.com/TanStack/router/blob/main/packages/start-server-core/src/transformStreamWithRouter.ts
 */

type CorePassthrough = {
  stream: ReadableStream;
  destroyed: boolean;
  write: (chunk: string) => void;
  end: (chunk?: string) => void;
  destroy: (error: unknown) => void;
};

const textDecoder = new TextDecoder();
const header = `<!DOCTYPE html><html><head><title>Hello World</title></head><body><div id="root"></div>`;
const trailer = `</body></html>`;

function createCorePassthrough() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let controller: ReadableStreamDefaultController<any>;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(c) {
      controller = c;
    }
  });

  const corePassthrough: CorePassthrough = {
    stream,
    write: (chunk) => {
      controller.enqueue(encoder.encode(chunk));
    },
    end: (chunk) => {
      if (chunk) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
      corePassthrough.destroyed = true;
    },
    destroy: (error) => {
      controller.error(error);
    },
    destroyed: false
  };

  return corePassthrough;
}

function decodeChunk(chunk: unknown) {
  if (chunk instanceof Uint8Array) {
    return textDecoder.decode(chunk);
  }

  return String(chunk);
}

function pipeReactElementStream({ element, passthrough }: { element: React.ReactElement; passthrough: PassThrough }) {
  const pipeable = ReactDomServer.renderToPipeableStream(element, {
    onShellReady() {
      pipeable.pipe(passthrough);
    },
    onError(error) {
      passthrough.destroy();
      pipeable.abort(error);
    }
  });
}

export function transformResponseStream({ element }: { element: React.ReactElement }) {
  const reactAppPassThrough = new PassThrough();
  const reactAppStream = Readable.toWeb(reactAppPassThrough);

  const corePassthrough = createCorePassthrough();

  const readStream = async () => {
    corePassthrough.write(header);

    const reader = reactAppStream.getReader();

    try {
      let chunk;

      while (!(chunk = await reader.read()).done) {
        const decodedChunk = decodeChunk(chunk.value);

        corePassthrough.write(decodedChunk);
      }
    } catch (error) {
      corePassthrough.destroy(error);
    } finally {
      corePassthrough.write(trailer);
      corePassthrough.end();
    }
  };

  pipeReactElementStream({ element, passthrough: reactAppPassThrough });
  readStream();

  return corePassthrough.stream;
}
