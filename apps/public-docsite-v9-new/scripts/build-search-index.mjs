import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createSearchAPI } from 'fumadocs-core/search/server';

/**
 * Builds the static search index.
 *
 * The site is served as static files (design D9, `docsite/site-navigation`), so there is no
 * `api/search` route to query at runtime — the index has to be a file the client fetches.
 *
 * It is built by reading the content directory directly rather than through the Fumadocs
 * loader, because that loader is built on `import.meta.glob` and only resolves inside Vite.
 * Reading from disk keeps this a plain Node step that can run before or after the bundle.
 */

const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const contentRoot = join(appRoot, 'content');

const TREES = [
  { dir: 'react', baseUrl: '/docs/react' },
  { dir: 'headless', baseUrl: '/docs/headless' },
];

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);

    if ((await stat(full)).isDirectory()) {
      yield* walk(full);
      continue;
    }

    if (entry.endsWith('.mdx')) {
      yield full;
    }
  }
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { data: {}, body: source };
  }

  const data = {};

  for (const line of match[1].split('\n')) {
    const field = line.match(/^(\w+):\s*(.*)$/);

    if (field) {
      data[field[1]] = field[2].replace(/^['"]|['"]$/g, '').trim();
    }
  }

  return { data, body: source.slice(match[0].length) };
}

/** Slugifies a heading the same way the rendered anchors do. */
function toAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extracts headings and prose.
 *
 * Fenced code, JSX expressions and import statements are dropped: they are not prose, and
 * indexing them makes every component page match on framework noise instead of its content.
 */
function toStructuredData(body) {
  const cleaned = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^import\s[\s\S]*?;$/gm, '')
    .replace(/<[^>]+>/g, ' ');

  const headings = [];
  const contents = [];
  let current;

  for (const line of cleaned.split('\n')) {
    const heading = line.match(/^(#{1,6})\s+(.*)$/);

    if (heading) {
      const content = heading[2].trim();
      current = toAnchor(content);
      headings.push({ id: current, content });
      continue;
    }

    const text = line.trim();

    if (text.length > 0 && !text.startsWith('---')) {
      contents.push({ heading: current, content: text });
    }
  }

  return { headings, contents };
}

const indexes = [];

for (const tree of TREES) {
  const root = join(contentRoot, tree.dir);

  for await (const file of walk(root)) {
    const source = await readFile(file, 'utf8');
    const { data, body } = parseFrontmatter(source);

    const slug = relative(root, file)
      .replace(/\.mdx$/, '')
      .split(sep)
      .filter(segment => segment !== 'index')
      .join('/');

    const url = slug.length > 0 ? `${tree.baseUrl}/${slug}` : tree.baseUrl;

    indexes.push({
      id: url,
      url,
      title: data.title ?? slug,
      description: data.description,
      structuredData: toStructuredData(body),
    });
  }
}

const api = createSearchAPI('advanced', { indexes });
const response = await api.staticGET();
const payload = await response.text();

const outFile = join(appRoot, 'public/docs/search-index.json');
await mkdir(join(appRoot, 'public/docs'), { recursive: true });
await writeFile(outFile, payload);

console.log(
  `indexed ${indexes.length} page(s) -> ${relative(appRoot, outFile)} (${(payload.length / 1024).toFixed(0)}KB)`,
);
