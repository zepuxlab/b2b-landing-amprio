import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const base = "/b2b";

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    let manifest;

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = await fs.readFile("./dist/client/index.html", "utf-8");
      try {
        manifest = JSON.parse(
          await fs.readFile("./dist/client/manifest.json", "utf-8")
        );
      } catch (e) {
        // Manifest might not exist, that's ok
        manifest = null;
      }
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const { html: appHtml, helmet } = await render(url, req, res);

    // Inject the rendered app into HTML
    let html = template.replace(`<!--ssr-outlet-->`, appHtml);

    // Inject helmet head tags
    if (helmet) {
      // Replace title
      if (helmet.title) {
        html = html.replace(/<title>.*?<\/title>/, helmet.title.toString());
      }
      
      // Inject other head tags before </head>
      const headTags = [
        helmet.meta?.toString() || "",
        helmet.link?.toString() || "",
        helmet.script?.toString() || "",
        helmet.style?.toString() || "",
        helmet.noscript?.toString() || "",
      ].filter(Boolean).join("");
      
      if (headTags) {
        html = html.replace("</head>", `${headTags}</head>`);
      }
    }

    // Inject preload links for assets
    if (manifest) {
      const preloadLinks = renderPreloadLinks(manifest, url);
      html = html.replace("</head>", `${preloadLinks}</head>`);
    }

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.error(e);
    res.status(500).end(e.stack);
  }
});

function renderPreloadLinks(manifest, url) {
  if (!manifest) return "";
  
  let links = "";
  const css = new Set();
  const js = new Set();

  // Vite manifest format: { "index.html": { file: "assets/index.js", ... }, ... }
  // Get main entry point
  const mainEntry = manifest["index.html"];
  if (mainEntry) {
    if (mainEntry.css) {
      mainEntry.css.forEach((file: string) => css.add(file));
    }
    if (mainEntry.file) {
      js.add(mainEntry.file);
    }
  }

  // Add all other entries
  Object.values(manifest).forEach((entry: any) => {
    if (entry.css) {
      entry.css.forEach((file: string) => css.add(file));
    }
    if (entry.file && entry.file.endsWith(".js")) {
      js.add(entry.file);
    }
  });

  for (const file of css) {
    links += `<link rel="stylesheet" href="${base}/${file}">`;
  }

  for (const file of js) {
    links += `<link rel="modulepreload" href="${base}/${file}">`;
  }

  return links;
}

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}${base}`);
});
