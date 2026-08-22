import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

/**
 * Serves the built site exactly as a static host does: no rewrite rules, no SPA fallback.
 *
 * Verifying against `dist/client` (rather than a hand-assembled directory) is deliberate —
 * an earlier mismatch there produced 404s for every asset, which looked like a styling bug.
 */
export async function serveStatic(root, port) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let filePath = join(root, normalize(decodeURIComponent(url.pathname)));

      const info = await stat(filePath).catch(() => null);

      if (info?.isDirectory()) {
        filePath = join(filePath, 'index.html');
      }

      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  });

  await new Promise(done => server.listen(port, done));

  return {
    origin: `http://localhost:${port}`,
    close: () => new Promise(done => server.close(done)),
  };
}

export const distRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/client');
