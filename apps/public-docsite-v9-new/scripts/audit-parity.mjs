import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Content parity check against the Storybook docsite.
 *
 * Compares the examples each component page publishes with the stories Storybook indexes for
 * the same component. This is what "did the migration lose anything" actually means — a page
 * can render, pass every other gate, and still be missing half its examples.
 *
 * Reads Storybook's own `index.json` rather than scraping, so it compares against what
 * Storybook itself considers published.
 */
const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(appRoot, '../..');

const [treeArg] = process.argv.slice(2);

const TREES = {
  headless: {
    index: 'apps/public-docsite-v9-headless/dist/storybook/index.json',
    dist: 'apps/public-docsite-v9-new/dist/client/docs/headless',
  },
  react: {
    index: 'apps/public-docsite-v9/dist/react/index.json',
    dist: 'apps/public-docsite-v9-new/dist/client/docs/react',
  },
};

const tree = TREES[treeArg];

if (!tree) {
  throw new Error(`Usage: node scripts/audit-parity.mjs <${Object.keys(TREES).join('|')}>`);
}

const indexPath = join(repoRoot, tree.index);

if (!existsSync(indexPath)) {
  console.log(`Storybook index not found at ${tree.index}; build that docsite first.`);
  process.exit(0);
}

/** `Components/Badge/CounterBadge` -> `components/badge/counter-badge`, matching page paths. */
function toPath(title) {
  const segments = title.split('/').map(segment => segment.trim());

  if (segments.length > 1 && segments.at(-1) === segments.at(-2)) {
    segments.pop();
  }

  return segments
    .map(segment =>
      segment
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z]{2,})/g, '$1-$2')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    )
    .join('/');
}

const index = JSON.parse(readFileSync(indexPath, 'utf8'));
const byTitle = new Map();

for (const entry of Object.values(index.entries ?? {})) {
  if (entry.type !== 'story') {
    continue;
  }

  if (!byTitle.has(entry.title)) {
    byTitle.set(entry.title, []);
  }

  byTitle.get(entry.title).push(entry.name);
}

const missingPages = [];
const missingExamples = [];
let compared = 0;

for (const [title, stories] of byTitle) {
  const page = join(repoRoot, tree.dist, toPath(title), 'index.html');

  if (!existsSync(page)) {
    missingPages.push({ title, path: toPath(title) });
    continue;
  }

  const html = readFileSync(page, 'utf8');
  compared++;

  // Examples render as headings whose id is the story name, lowercased and hyphenated.
  const absent = stories.filter(name => !html.includes(`id="${name.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}"`));

  if (absent.length > 0) {
    missingExamples.push({ title, absent, total: stories.length });
  }
}

console.log(`compared ${compared} of ${byTitle.size} component(s) documented by Storybook`);

if (missingPages.length > 0) {
  console.log(`\n${missingPages.length} component(s) with no page on the new site:`);
  for (const { title, path } of missingPages) {
    console.log(`  ${title}  (expected ${path})`);
  }
}

if (missingExamples.length > 0) {
  console.log(`\n${missingExamples.length} page(s) missing examples:`);
  for (const { title, absent, total } of missingExamples) {
    console.log(`  ${title}: ${absent.length}/${total} missing — ${absent.slice(0, 5).join(', ')}`);
  }
}

if (missingPages.length === 0 && missingExamples.length === 0) {
  console.log('every Storybook story has a counterpart on the new site');
}
