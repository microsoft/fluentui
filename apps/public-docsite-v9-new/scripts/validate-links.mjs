import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { distRoot } from './static-server.mjs';

/**
 * Validates every internal link in the built site.
 *
 * Pages are generated and their links are rewritten by a codemod, so a broken link is a
 * silent, systematic failure rather than a typo. This checks the built output — the same
 * files a reader is served — so a link that resolves in dev but not from static hosting
 * still fails here.
 */

const DOCS_ROOT = join(distRoot, 'docs');

async function exists(path) {
  return stat(path).then(
    () => true,
    () => false,
  );
}

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);

    if ((await stat(full)).isDirectory()) {
      yield* walk(full);
      continue;
    }

    if (entry === 'index.html') {
      yield full;
    }
  }
}

/** Every route the site actually serves, as a set of `/docs/...` paths. */
async function collectRoutes() {
  const routes = new Set();

  for await (const file of walk(DOCS_ROOT)) {
    routes.add(file.slice(distRoot.length).replace(/\/index\.html$/, '') || '/docs');
  }

  return routes;
}

const routes = await collectRoutes();
const broken = new Map();
let pages = 0;
let links = 0;

for await (const file of walk(DOCS_ROOT)) {
  const html = await readFile(file, 'utf8');
  const from = file.slice(distRoot.length).replace(/\/index\.html$/, '');
  pages++;

  for (const [, href] of html.matchAll(/href="(\/docs\/[^"#?]*)"/g)) {
    links++;

    const target = href.replace(/\/$/, '');

    // Assets are files, not routes; verify them on disk instead.
    if (/\.[a-z0-9]+$/i.test(target)) {
      if (await exists(join(distRoot, target))) {
        continue;
      }
    } else if (routes.has(target)) {
      continue;
    }

    if (!broken.has(target)) {
      broken.set(target, new Set());
    }

    broken.get(target).add(from);
  }
}

console.log(`checked ${links} internal link(s) across ${pages} page(s)`);

if (broken.size > 0) {
  console.error(`\n${broken.size} broken link target(s):`);

  for (const [target, sources] of [...broken].sort()) {
    const [first] = sources;
    const more = sources.size > 1 ? ` (+${sources.size - 1} more page(s))` : '';
    console.error(`  ${target}\n    from ${first}${more}`);
  }

  process.exit(1);
}

console.log('all internal links resolve');
