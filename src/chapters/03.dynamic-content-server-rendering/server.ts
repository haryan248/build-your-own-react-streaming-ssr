import { createElement } from "react";
import { Hono } from "hono";

import App from "./client";
import { transformResponseStream } from "./helpers";

const dynamicContentServerRendering = new Hono();

dynamicContentServerRendering.get("/", async () => {
  const element = createElement(App);

  const stream = transformResponseStream({ element });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Response(stream as any, {
    headers: {
      "Content-type": "text/html"
    }
  });
});

export default dynamicContentServerRendering;
