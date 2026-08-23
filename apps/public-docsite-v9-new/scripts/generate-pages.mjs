import { mkdirSync, readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { storySlug, storyTitle, toKebab } from './story-route.mjs';

/**
 * One-shot page generator (design D4).
 *
 * Emits a thin MDX stub per story entry point. Pages are hand-owned afterwards — this is
 * deliberately NOT part of the build, so edits are never overwritten.
 *
 * Usage: node scripts/generate-pages.mjs <tree>
 *   tree: "headless" | "react"
 */

const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));

/**
 * Components with generated API data, so a page only claims a props table when one exists.
 * Regenerate with `node scripts/generate-docgen.mjs` before running this.
 */
const docgenPath = join(appRoot, 'app/generated/docgen.json');
const docgen = existsSync(docgenPath) ? JSON.parse(readFileSync(docgenPath, 'utf8')) : {};
const repoRoot = resolve(appRoot, '../..');

const TREES = {
  headless: {
    packages: ['react-headless-components-preview'],
    showThemePicker: false,
  },
  react: {
    /*
     * Every component package that ships stories, minus:
     *  - the headless preview, which is its own tree
     *  - the migration shims, which are explicitly out of scope (see proposal Non-goals);
     *    they embed v8/v0 playgrounds that would pull those libraries into the bundle
     *  - internal tooling packages, which document the workbench rather than components
     */
    packagesGlob: 'packages/react-components',
    exclude: [
      'react-headless-components-preview',
      'react-migration-v8-v9',
      'react-migration-v0-v9',
      'react-storybook-addon',
      'react-storybook-addon-export-to-sandbox',
      'babel-preset-storybook-full-source',
      'react-conformance-griffel',
    ],
    showThemePicker: true,
    appStories: 'apps/public-docsite-v9/src',
  },
};

/** Which entry-point file a story directory uses. */
function entryFile(root, segments) {
  return ['index.stories.tsx', 'index.stories.ts'].find(candidate => existsSync(join(root, ...segments, candidate)));
}

/** `TeachingPopover` -> `teaching-popover`; used for both the slug and the file name. */
/** `TeachingPopover` -> `Teaching Popover`, for the page title. */
function toTitle(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

const treeName = process.argv[2];
const tree = TREES[treeName];

if (!tree) {
  throw new Error(`Unknown tree "${treeName}". Expected one of: ${Object.keys(TREES).join(', ')}`);
}

const outDir = join(appRoot, 'content', treeName);

mkdirSync(outDir, { recursive: true });

const created = [];
const skipped = [];

/** Component packages contributing to this tree. */
function resolvePackages() {
  if (tree.packages) {
    return tree.packages;
  }

  return readdirSync(join(repoRoot, tree.packagesGlob), { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !tree.exclude.includes(entry.name))
    .map(entry => entry.name)
    .filter(name => existsSync(join(repoRoot, tree.packagesGlob, name, 'stories/src')));
}

/**
 * Finds every story entry point beneath `dir`.
 *
 * Entry points are not always one level deep — stories nest under grouping folders
 * (`Concepts/Positioning`, `Tags/Tag`), so this recurses rather than assuming depth.
 */
function findEntryPoints(dir, segments = []) {
  const found = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const childDir = join(dir, entry.name);
    const childSegments = [...segments, entry.name];

    const hasEntry = ['index.stories.tsx', 'index.stories.ts'].some(candidate => existsSync(join(childDir, candidate)));

    if (hasEntry) {
      found.push(childSegments);
      continue;
    }

    found.push(...findEntryPoints(childDir, childSegments));
  }

  return found;
}

/*
 * Story roots contributing to this tree.
 *
 * The Storybook docsite ships its own stories alongside the component packages — focus
 * management and theme utilities, positioning concepts, accessibility scenarios — and they
 * appear in its sidebar like any other. Scanning only the packages silently dropped them.
 */
function resolveStoryRoots() {
  const roots = resolvePackages().map(pkg => ({
    dir: join(repoRoot, 'packages/react-components', pkg, 'stories/src'),
    specifier: `@fluentui/${pkg}-stories/src`,
  }));

  if (tree.appStories && existsSync(join(repoRoot, tree.appStories))) {
    roots.push({ dir: join(repoRoot, tree.appStories), specifier: `@repo/${tree.appStories}` });
  }

  return roots;
}

for (const { dir: storiesDir, specifier: rootSpecifier } of resolveStoryRoots()) {
  for (const segments of findEntryPoints(storiesDir)) {
    const name = segments[segments.length - 1];

    /*
     * The page's position comes from the story's `title`, not its directory, because the
     * title is what carries the information architecture Storybook presents
     * (`Components/Badge/CounterBadge`, `Utilities/...`, `Compat Components/...`). Deriving
     * paths from directories alone flattened every component to the root and lost it.
     */
    const source = readFileSync(join(storiesDir, ...segments, entryFile(storiesDir, segments)), 'utf8');
    const slug = storySlug(source, name);

    /*
     * The directory name, spaced out, is the better heading where the two agree on wording:
     * `AvatarGroup` reads as "Avatar Group". `meta.title` is only preferred when it says
     * something genuinely different — `Concepts/Developer/Positioning Components` lives in a
     * directory called `Positioning`, and the extra word belongs in the heading.
     */
    const metaTitle = storyTitle(source)?.split('/').at(-1)?.trim();
    const sameWording = metaTitle && toKebab(metaTitle) === toKebab(name);
    const pageTitle = !metaTitle || sameWording ? toTitle(name) : metaTitle;

    /*
     * Skip entry points whose examples render v8/v0 components — importing those libraries
     * would pull them into the bundle (proposal Non-goals). Checked across the whole story
     * folder because the import usually sits in an individual example, not the entry point.
     */
    const legacy = readdirSync(join(storiesDir, ...segments))
      .filter(file => file.endsWith('.tsx'))
      .some(file =>
        /from '@fluentui\/react'|from '@fluentui\/react-northstar'/.test(
          readFileSync(join(storiesDir, ...segments, file), 'utf8').replace(/```[\s\S]*?```/g, ''),
        ),
      );

    if (legacy) {
      skipped.push(`${segments.join('/')} (renders v8/v0 components)`);
      continue;
    }
    const outFile = join(outDir, `${slug}.mdx`);

    if (existsSync(outFile)) {
      skipped.push(`${segments.join('/')} (page already exists)`);
      continue;
    }

    const specifier = `${rootSpecifier}/${segments.join('/')}/index.stories`;
    const themeProp = tree.showThemePicker ? '' : ' showThemePicker={false}';

    // The docgen manifest is keyed by component display name, which the page title carries.
    const componentName = name.replace(/\s+/g, '');
    const docgenProp = docgen[componentName] ? ` docgen="${componentName}"` : '';
    const depth = slug.split('/').length + 1;
    const appPath = `${'../'.repeat(depth)}app/components/component-page`;

    mkdirSync(join(outFile, '..'), { recursive: true });

    writeFileSync(
      outFile,
      `---
title: ${pageTitle}
---

import meta, * as stories from '${specifier}';
import { ComponentPage } from '${appPath}';

<ComponentPage meta={meta} stories={stories}${docgenProp}${themeProp} />
`,
    );

    created.push(slug);
  }
}

console.log(`created ${created.length} page(s) in content/${treeName}`);

if (skipped.length > 0) {
  console.log(`skipped ${skipped.length}:`);
  for (const reason of skipped) {
    console.log(`  - ${reason}`);
  }
}
