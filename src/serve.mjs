import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon"
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const candidate = path.join(root, clean.replace(/^\/+/, ""));
  if (!candidate.startsWith(root)) return null;

  try {
    const info = await stat(candidate);
    if (info.isDirectory()) {
      const index = path.join(candidate, "index.html");
      await stat(index);
      return index;
    }
    return candidate;
  } catch {
    if (!path.extname(candidate)) {
      const index = path.join(candidate, "index.html");
      try {
        await stat(index);
        return index;
      } catch {
        return null;
      }
    }
    return null;
  }
}

const server = createServer(async (request, response) => {
  const file = await resolveFile(request.url || "/");
  if (!file) {
    try {
      const html = await readFile(path.join(root, "404.html"));
      response.writeHead(404, { "Content-Type": types[".html"] });
      response.end(html);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
    return;
  }

  try {
    const body = await readFile(file);
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(body);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Lenormand site running at http://127.0.0.1:${port}/`);
});
