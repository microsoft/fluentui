import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'node:fs';

/**
 * One-shot codemod: Storybook MDX docs pages -> Fumadocs content pages.
 *
 * Not part of the build. Pages are hand-owned once migrated, so this never overwrites an
 * existing page.
 *
 * Storybook identifies a page by `<Meta title="A/B/C" />` and links to it by a derived id
 * (`/docs/a-b-c--docs`). Fumadocs uses file position plus frontmatter, so the title becomes
 * both the frontmatter title and the file path, and every internal link has to be rewritten
 * from the id form to the new path.
 */

const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(appRoot, '../..');

const SOURCES = [
  { glob: 'apps/public-docsite-v9/src/**/*.mdx' },
  { glob: 'packages/react-components/*/stories/src/**/*.mdx' },
];

const EXCLUDE = /react-headless-components-preview|react-migration-v8-v9|react-migration-v0-v9/;

/** Mirrors Storybook's id derivation, so existing links can be matched. */
function toStorybookId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** `Concepts/Developer/Supported Platforms` -> `concepts/developer/supported-platforms` */
function toPath(title) {
  return title
    .split('/')
    .map(segment =>
      segment
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    )
    .filter(Boolean)
    .join('/');
}

function collect() {
  const pages = [];

  for (const { glob } of SOURCES) {
    for (const file of globSync(glob, { cwd: repoRoot })) {
      if (EXCLUDE.test(file)) {
        continue;
      }

      const absolute = join(repoRoot, file);
      const source = readFileSync(absolute, 'utf8');
      const match = source.match(/<Meta\s+title=(?:"([^"]+)"|\{'([^']+)'\})/);

      if (!match) {
        continue;
      }

      const title = match[1] ?? match[2];
      pages.push({ file, absolute, source, title, path: toPath(title), id: toStorybookId(title) });
    }
  }

  return pages;
}

const pages = collect();
// Paths are relative to the router basename (`/docs`); including it would yield /docs/docs/...
const routeById = new Map(pages.map(page => [page.id, `/react/${page.path}`]));

/*
 * Component pages are generated separately (see generate-pages.mjs) but conceptual pages link
 * to them by Storybook id, so their routes have to be in the map too. The slug comes from the
 * directory, the id from the meta title, so both are read here.
 */
function toKebabSegment(name) {
  return (
    name
      .trim()
      // `TeachingPopover` -> `Teaching-Popover`
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      // `ARIALive` -> `ARIA-Live`, but leave `APIs` intact (one trailing lowercase is a plural)
      .replace(/([A-Z]+)([A-Z][a-z]{2,})/g, '$1-$2')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  );
}

for (const file of globSync('packages/react-components/*/stories/src/**/index.stories.{ts,tsx}', { cwd: repoRoot })) {
  if (EXCLUDE.test(file)) {
    continue;
  }

  const source = readFileSync(join(repoRoot, file), 'utf8');
  const title = source.match(/title:\s*'([^']+)'|title:\s*"([^"]+)"/);

  if (!title) {
    continue;
  }

  const segments = file
    .replace(/\/index\.stories\.tsx?$/, '')
    .split('/stories/src/')[1]
    .split('/');
  const tree = /react-headless-components-preview/.test(file) ? 'headless' : 'react';

  routeById.set(toStorybookId(title[1] ?? title[2]), `/docs/${tree}/${segments.map(toKebabSegment).join('/')}`);
}

const force = process.argv.includes('--force');

/** Pages kept on the Storybook docsite (see the exclusion below). */
const EXCLUDED_PATH = /^concepts\/migration\/from-v[08]\//;
const STORYBOOK_DOCSITE = 'https://storybooks.fluentui.dev/react/?path=/docs/';

/*
 * Links to excluded pages must still reach the reader, so they are pointed at the Storybook
 * docsite rather than left dangling — the site links out to it for this content anyway.
 */
for (const page of pages) {
  if (EXCLUDED_PATH.test(page.path)) {
    routeById.set(page.id, `${STORYBOOK_DOCSITE}${page.id}--docs`);
  }
}
const written = [];
const skippedExisting = [];
const excludedLegacy = [];
const needsReview = [];

for (const page of pages) {
  let body = page.source;

  // Drop the Storybook docs-block imports and the <Meta> marker; the title moves to frontmatter.
  body = body.replace(/^\s*import\s+\{[^}]*\}\s+from\s+'@storybook\/addon-docs(?:\/blocks)?';?\s*$/gm, '');
  body = body.replace(/<Meta\s+[^>]*\/>\s*/g, '');

  const leaf = page.title.split('/').pop().trim();

  // Fumadocs renders the frontmatter title as the page h1, so a leading duplicate heading
  // would produce two h1s and break heading order.
  /*
   * Drop the page's opening heading whatever it says. Fumadocs renders the frontmatter title as
   * the h1, and matching only headings equal to that title missed pages whose heading differed
   * slightly (`Button accessibility spec` under the title `Button`), leaving two h1s.
   */
  body = body.replace(/^\s*#\s+.*$/m, '');

  /*
   * Demote any remaining top-level headings. The frontmatter title owns the page's h1, so a
   * mid-document `#` would produce a second one — which a few sources do.
   */
  body = body.replace(/^# (?!#)/gm, '## ');

  /*
   * Relative imports (helper modules, images) were relative to the page's original location,
   * which no longer holds. Rewrite them to a repo-root alias so content keeps importing the
   * real files rather than copies that would drift.
   */
  body = body.replace(/from '(\.\.?\/[^']+)'/g, (whole, spec) => {
    const target = resolve(dirname(page.absolute), spec);
    const fromRepo = relative(repoRoot, target);

    if (fromRepo.startsWith('..')) {
      return whole;
    }

    return `from '@repo/${fromRepo.split(sep).join('/')}'`;
  });

  /*
   * `FluentCanvas` is the Storybook addon's preview wrapper. Rendering it here would pull the
   * addon into the documentation bundle and bypass this site's own preview chrome (theming,
   * direction, per-example error boundary), so it is swapped for `<StoryPreview>`.
   */
  if (body.includes('FluentCanvas')) {
    body = body.replace(
      /<FluentCanvas>\s*<(\w+)\s*\/>\s*<\/FluentCanvas>/g,
      (_whole, name) => `<StoryPreview story={${name}} name="${name}" />`,
    );
    body = body.replace(
      /import \{ FluentCanvas \} from '@fluentui\/react-storybook-addon';/g,
      `import { StoryPreview } from '${'../'.repeat(page.path.split('/').length + 1)}app/components/story-preview';`,
    );
  }

  /*
   * `<FluentStory id="components-accordion--default" />` embeds another component's example by
   * Storybook id. There is no component to hand `<StoryPreview>`, so it becomes a link to that
   * example's own page and anchor.
   */
  body = body.replace(
    /<FluentCanvas>\s*<FluentStory\s+id="([a-z0-9-]+)--([a-z0-9-]+)"[^>]*\/>\s*<\/FluentCanvas>/g,
    (whole, id, story) => {
      const route = routeById.get(id);
      return route ? `[See the ${story} example](${route}#${story})` : whole;
    },
  );

  body = body.replace(/import \{ FluentCanvas, FluentStory \} from '@fluentui\/react-storybook-addon';\s*/g, '');

  // Storybook's own deep links carry the page in a query string rather than the path.
  body = body.replace(/\(\?path=\/docs\/([a-z0-9-]+)--([a-z0-9-]+)\)/g, (whole, id, story) => {
    const route = routeById.get(id);
    return route ? `(${route}#${story})` : whole;
  });

  /*
   * Storybook pages carried their own title element. Fumadocs renders the frontmatter title as
   * the page h1, so leaving this produces two h1s and breaks heading order.
   */
  body = body.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/g, '');

  /*
   * Storybook's docs blocks render the page heading and subtitle. Their imports are stripped
   * above, so any remaining usage would reference an undefined component and break the page at
   * hydration — which is exactly what happened with `<Title>` on the typography page.
   */
  body = body.replace(/<(Title|Subtitle)>[\s\S]*?<\/\1>\s*/g, '');
  body = body.replace(/<(Primary|Stories|ArgTypes|Controls|Canvas|Source|Description)\b[^>]*\/>\s*/g, '');

  // Rewrite Storybook id links to their new paths.
  body = body.replace(/\/docs\/([a-z0-9-]+)--docs/g, (whole, id) => routeById.get(id) ?? whole);

  /*
   * Pages that render live v8/v0 components are excluded for the same reason as the migration
   * shim packages (see proposal Non-goals): importing those libraries would pull them into the
   * bundle. They remain available on the Storybook docsite, which the site links out to.
   */
  /*
   * The per-component v8/v0 migration guides render legacy components side by side, pulling
   * `@fluentui/react` and `@fluentui/react-northstar` into the bundle — often transitively via
   * story modules, so inspecting the page text alone does not catch them. Excluded by path for
   * the same reason as the migration shim packages (proposal Non-goals). They remain on the
   * Storybook docsite, which the site links out to.
   */
  if (EXCLUDED_PATH.test(page.path)) {
    excludedLegacy.push(page.path);
    continue;
  }

  if (/FluentCanvas|from '\.\.?\/.*\.stories'|import\s+\w+\s+from\s+'.*\.(png|jpg|svg)'/.test(body)) {
    needsReview.push(page.path);
  }

  const outFile = join(appRoot, 'content/react', `${page.path}.mdx`);

  // Pages are hand-owned once migrated, so an existing page is never clobbered unless
  // regeneration is explicitly requested.
  if (existsSync(outFile) && !force) {
    skippedExisting.push(page.path);
    continue;
  }

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, `---\ntitle: ${leaf}\n---\n\n${body.trim()}\n`);
  written.push(page.path);
}

console.log(`migrated ${written.length} page(s) from ${pages.length} source file(s)`);

if (excludedLegacy.length > 0) {
  console.log(`excluded ${excludedLegacy.length} page(s) that render live v8/v0 components`);
}

if (skippedExisting.length > 0) {
  console.log(`skipped ${skippedExisting.length} existing page(s); pass --force to regenerate`);
}

const unresolved = new Set();
for (const page of pages) {
  for (const [, id] of page.source.matchAll(/\/docs\/([a-z0-9-]+)--docs/g)) {
    if (!routeById.has(id)) {
      unresolved.add(id);
    }
  }
}

if (unresolved.size > 0) {
  console.log(`\n${unresolved.size} link target(s) not found among migrated pages (likely component pages):`);
  for (const id of [...unresolved].slice(0, 10)) {
    console.log(`  ${id}`);
  }
}

if (needsReview.length > 0) {
  console.log(`\n${needsReview.length} page(s) import stories or assets and need manual review:`);
  for (const path of needsReview) {
    console.log(`  ${path}`);
  }
}
