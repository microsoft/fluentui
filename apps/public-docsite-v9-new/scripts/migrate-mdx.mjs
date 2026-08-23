import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'node:fs';
import { storySlug } from './story-route.mjs';

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

/*
 * `Concepts/Introduction` is the tree's landing page rather than a page inside Concepts. It is
 * the site's front door, and having it sit one level down while `/react` showed a placeholder
 * gave the tree two introductions, the more useful one hidden.
 */
const LANDING_PAGE = 'Concepts/Introduction';

/** `Concepts/Developer/Supported Platforms` -> `concepts/developer/supported-platforms` */
function toPath(title) {
  if (title === LANDING_PAGE) {
    return 'index';
  }

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
/**
 * A link to a story's example on its page.
 *
 * `docs` is not an example — it is Storybook's docs-tab anchor, and nothing on the generated
 * page carries that id, so it is left off rather than pointing at nothing.
 */
function storyAnchor(route, story) {
  return story === 'docs' ? route : `${route}#${story}`;
}

const REPO_SOURCE_URL = 'https://github.com/microsoft/fluentui/blob/master/';

const routeById = new Map(pages.map(page => [page.id, `/react/${page.path}`]));

/*
 * Component pages are generated separately (see generate-pages.mjs) but conceptual pages link
 * to them by Storybook id, so their routes have to be in the map too. The slug comes from the
 * directory, the id from the meta title, so both are read here.
 */
for (const file of globSync('packages/react-components/*/stories/src/**/index.stories.{ts,tsx}', { cwd: repoRoot })) {
  if (EXCLUDE.test(file)) {
    continue;
  }

  const source = readFileSync(join(repoRoot, file), 'utf8');
  const title = source.match(/title:\s*'([^']+)'|title:\s*"([^"]+)"/);

  if (!title) {
    continue;
  }

  const name = file.replace(/\/index\.stories\.tsx?$/, '').split('/').at(-1);
  const tree = /react-headless-components-preview/.test(file) ? 'headless' : 'react';

  // Same derivation the pages themselves are generated with, so links cannot drift from them.
  routeById.set(toStorybookId(title[1] ?? title[2]), `/${tree}/${storySlug(source, name)}`);
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
      return route ? `[See the ${story} example](${storyAnchor(route, story)})` : whole;
    },
  );

  body = body.replace(/import \{ FluentCanvas, FluentStory \} from '@fluentui\/react-storybook-addon';\s*/g, '');

  /*
   * Storybook's own deep links carry the page in a query string rather than the path, under
   * `/docs/` for a page and `/story/` for a single example.
   */
  body = body.replace(/\(\?path=\/(?:docs|story)\/([a-z0-9-]+)--([a-z0-9-]+)\)/g, (whole, id, story) => {
    const route = routeById.get(id);
    return route ? `(${storyAnchor(route, story)})` : whole;
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

  /*
   * Storybook's webpack build resolved assets with `require()` inside JSX. There is no
   * `require` in an ES module, so those pages threw during prerendering and fell back to
   * client rendering. Each becomes a real import.
   */
  const assetImports = new Map();

  const rewriteRequires = segment =>
    segment.replace(/require\('([^']+)'\)/g, (whole, spec) => {
      const target = resolve(dirname(page.absolute), spec);
      const fromRepo = relative(repoRoot, target);

      if (fromRepo.startsWith('..')) {
        return whole;
      }

      const existing = [...assetImports].find(([, value]) => value.endsWith(fromRepo));
      if (existing) {
        return existing[0];
      }

      const name = `asset${assetImports.size}`;
      assetImports.set(name, `@repo/${fromRepo.split(sep).join('/')}`);

      return name;
    });

  // Fenced samples showing `require()` are documentation, not code to run.
  body = body
    .split(/(```[\s\S]*?```)/)
    .map(segment => (segment.startsWith('```') ? segment : rewriteRequires(segment)))
    .join('');

  if (assetImports.size > 0) {
    const imports = [...assetImports]
      .map(([name, specifier]) => `import ${name} from '${specifier}';`)
      .join('\n');
    body = `${imports}\n\n${body.trimStart()}`;
  }

  /*
   * Some pages link to repository sources as bare paths. Those resolved against the page URL
   * rather than the repository, so they were broken on the Storybook docsite too; they become
   * links to the source on GitHub.
   */
  body = body.replace(/\]\((packages\/[^)\s]+)\)/g, (whole, path) => `](${REPO_SOURCE_URL}${path})`);

  /*
   * Same-page fragments were written against Storybook's anchor ids, which are shorter than the
   * heading slugs generated here (`#webpack` for "Webpack loader"). Where a fragment is an
   * unambiguous prefix of exactly one heading on the page, it is repointed at that heading;
   * anything ambiguous is left alone for a person to resolve.
   */
  const headingSlugs = [...body.matchAll(/^#{2,6}\s+(.+)$/gm)].map(([, heading]) =>
    heading
      .replace(/`/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
  );

  body = body.replace(/\]\(#([a-zA-Z0-9-]+)\)/g, (whole, fragment) => {
    if (headingSlugs.includes(fragment)) {
      return whole;
    }

    const matches = headingSlugs.filter(slug => slug.startsWith(`${fragment}-`));
    return matches.length === 1 ? `](#${matches[0]})` : whole;
  });

  // Rewrite Storybook id links to their new paths.
  /*
   * A trailing `#docs` is Storybook's docs-tab anchor, and no such element exists here because
   * the page itself is the documentation. It is dropped rather than carried over, where it
   * would be a fragment pointing at nothing.
   */
  body = body.replace(/\/docs\/([a-z0-9-]+)--docs(#docs\b)?/g, (whole, id) => routeById.get(id) ?? whole);

  /*
   * A link whose id was rewritten above but which kept its `?path=` wrapper resolves against
   * the current page rather than the route it names. Runs after the rewrite, not before it.
   */
  body = body.replace(/\(\?path=(\/(?:react|headless)\/[^)]*)\)/g, '($1)');
  body = body.replace(/href="\?path=(\/(?:react|headless)\/[^"]*)"/g, 'href="$1"');

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
