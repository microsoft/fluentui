import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Generates Fumadocs `meta.json` navigation ordering.
 *
 * The sidebar order is not derivable from titles or file names — it exists only as a
 * hand-maintained `options.storySort.order` array in the Storybook preview config. That
 * ordering is transcribed here, in Storybook's own nested form: a string names an entry, and
 * an array immediately after it orders that entry's children.
 *
 * Anything not named still appears, after the ordered entries, via Fumadocs' `...` rest.
 */
const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));

const ORDER = [
  'Concepts',
  [
    'Introduction',
    'Developer',
    [
      'Quick Start',
      'Styling Components',
      'Positioning Components',
      'Server-Side Rendering',
      ['Basic setup', 'Next.js setup', 'Limitations with Portals'],
    ],
    'Migration',
    [
      'Getting Started',
      'Keeping Design Consistent',
      'Handling Breaking Changes',
      'from v8',
      ['Component Mapping', 'Color Mapping', 'Troubleshooting'],
      'from v0',
    ],
    'Recipes',
  ],
  'Theme',
  ['Border Radii', 'Colors', 'Fonts', 'Shadows', 'Spacing', 'Stroke Widths', 'Typography', 'Theme Designer'],
  'Components',
  'Compat Components',
  'Preview Components',
  'Motion',
  'Utilities',
];

function toKebab(name) {
  return name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z]{2,})/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Splits Storybook's `['A', [children of A], 'B']` form into entries with their children. */
function parseOrder(order) {
  const entries = [];

  for (let index = 0; index < order.length; index++) {
    const item = order[index];

    if (typeof item !== 'string') {
      continue;
    }

    const next = order[index + 1];
    entries.push({ name: item, children: Array.isArray(next) ? parseOrder(next) : [] });
  }

  return entries;
}

const written = [];

function emit(dir, entries) {
  if (!existsSync(dir)) {
    return;
  }

  const present = new Set(
    readdirSync(dir, { withFileTypes: true }).map(entry =>
      entry.isDirectory() ? entry.name : entry.name.replace(/\.mdx$/, ''),
    ),
  );

  const pages = entries.map(entry => toKebab(entry.name)).filter(slug => present.has(slug));

  if (pages.length > 0) {
    writeFileSync(join(dir, 'meta.json'), `${JSON.stringify({ pages: [...pages, '...'] }, null, 2)}\n`);
    written.push(join(dir, 'meta.json').slice(appRoot.length + 1));
  }

  for (const entry of entries) {
    if (entry.children.length > 0) {
      emit(join(dir, toKebab(entry.name)), entry.children);
    }
  }
}

emit(join(appRoot, 'content/react'), parseOrder(ORDER));

console.log(`wrote ${written.length} meta.json file(s):`);
for (const file of written) {
  console.log(`  ${file}`);
}
