import { build as esbuild } from "esbuild";
import { Hono } from "hono";

import { resolveCWD } from "~/utils/server-utils";

const browserRenderingRouter = new Hono();

browserRenderingRouter.get("/", async (c) => {
  const { outputFiles } = await esbuild({
    bundle: true,
    format: "esm",
    platform: "browser",
    jsx: "automatic",
    entryPoints: [resolveCWD("client.tsx", import.meta.url)],
    external: [],
    write: false
  });

  const bundleScriptList = outputFiles.map((outputFile) => {
    return `<script type="module">${outputFile.text}</script>`;
  });

  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Browser Rendering</title>
    </head>
    <body>
      <div id="root"></div>
      <!-- this scripts generated on server -->
      ${bundleScriptList}
    </body>
    </html>
  `);
});

export default browserRenderingRouter;
