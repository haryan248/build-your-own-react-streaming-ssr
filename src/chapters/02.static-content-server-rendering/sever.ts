import { createElement } from "react";
import { Hono } from "hono";
import { renderToString } from "react-dom/server";

import App from "./client";

const staticContentServerRenderRouter = new Hono();

staticContentServerRenderRouter.get("/", async (c) => {
  const element = createElement(App);
  const html = renderToString(element);

  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Hello World</title>
    </head>
    <body>
      <div id="root">${html}</div>
    </body>
    </html>
  `);
});

export default staticContentServerRenderRouter;
