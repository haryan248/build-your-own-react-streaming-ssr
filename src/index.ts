import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

import browserRenderRouter from "./chapters/01.browser-rendering/server";
import staticContentServerRenderRouter from "./chapters/02.static-content-server-rendering/sever";
import dynamicContentServerRendering from "./chapters/03.dynamic-content-server-rendering/server";

export const app = new Hono();

serve(app, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

app.use("/build/*", serveStatic());

app.get("/", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Build Your Own RSC</title>
      </head>
      <body>
        <h1>
          Build Your Own RSC(React Server Component)
        </h1>
        <ul>
            <li>
              <a href="browser_render">01.browser_render</a>
            </li>
            <li>
              <a href="server_static_content_render">02.server_static_content_render</a>
            </li>
            <li>
              <a href="server_dynamic_content_rendering">03.server_dynamic_content_rendering</a>
            </li>
        </ul>
      </body>
    </html>
    `);
});

app.route("/browser_render", browserRenderRouter);
app.route("/server_static_content_render", staticContentServerRenderRouter);
app.route("/server_dynamic_content_rendering", dynamicContentServerRendering);
