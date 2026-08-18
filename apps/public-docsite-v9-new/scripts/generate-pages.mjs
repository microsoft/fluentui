import { mkdirSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
  },
};

/** `TeachingPopover` -> `teaching-popover`; used for both the slug and the file name. */
function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

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

    const hasEntry = ['index.stories.tsx', 'index.stories.ts'].some(candidate =>
      existsSync(join(childDir, candidate)),
    );

    if (hasEntry) {
      found.push(childSegments);
      continue;
    }

    found.push(...findEntryPoints(childDir, childSegments));
  }

  return found;
}

for (const pkg of resolvePackages()) {
  const storiesDir = join(repoRoot, 'packages/react-components', pkg, 'stories/src');

  for (const segments of findEntryPoints(storiesDir)) {
    const name = segments[segments.length - 1];
    const slug = segments.map(toKebab).join('/');
    const outFile = join(outDir, `${slug}.mdx`);

    if (existsSync(outFile)) {
      skipped.push(`${pkg}/${segments.join('/')} (page already exists)`);
      continue;
    }

    const specifier = `@fluentui/${pkg}-stories/src/${segments.join('/')}/index.stories`;
    const themeProp = tree.showThemePicker ? '' : ' showThemePicker={false}';
    const depth = slug.split('/').length + 1;
    const appPath = `${'../'.repeat(depth)}app/components/component-page`;

    mkdirSync(join(outFile, '..'), { recursive: true });

    writeFileSync(
      outFile,
      `---
title: ${toTitle(name)}
---

import meta, * as stories from '${specifier}';
import { ComponentPage } from '${appPath}';

<ComponentPage meta={meta} stories={stories}${themeProp} />
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
