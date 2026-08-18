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
    storiesRoot: 'packages/react-components/react-headless-components-preview/stories/src',
    importBase: '@fluentui/react-headless-components-preview-stories/src',
    showThemePicker: false,
  },
  react: {
    storiesRoot: 'packages/react-components/react-button/stories/src',
    importBase: '@fluentui/react-button-stories/src',
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

const storiesDir = join(repoRoot, tree.storiesRoot);
const outDir = join(appRoot, 'content', treeName);

mkdirSync(outDir, { recursive: true });

const created = [];
const skipped = [];

/**
 * Finds every story entry point beneath `dir`.
 *
 * Entry points are not always one level deep — the headless tree nests them under grouping
 * folders (`Concepts/Positioning`, `Tags/Tag`), so this recurses rather than assuming depth.
 */
function findEntryPoints(dir, segments = []) {
  const found = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const childDir = join(dir, entry.name);
    const childSegments = [...segments, entry.name];

    const stories = ['index.stories.tsx', 'index.stories.ts'].find(candidate =>
      existsSync(join(childDir, candidate)),
    );

    if (stories) {
      found.push({ segments: childSegments });
      continue;
    }

    found.push(...findEntryPoints(childDir, childSegments));
  }

  return found;
}

const entryPoints = findEntryPoints(storiesDir);

for (const { segments } of entryPoints) {
  const name = segments[segments.length - 1];
  const slug = segments.map(toKebab).join('/');
  const outFile = join(outDir, `${slug}.mdx`);

  if (existsSync(outFile)) {
    skipped.push(`${segments.join('/')} (page already exists — not overwriting)`);
    continue;
  }

  const specifier = `${tree.importBase}/${segments.join('/')}/index.stories`;
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

console.log(`created ${created.length} page(s) in content/${treeName}`);

if (skipped.length > 0) {
  console.log(`skipped ${skipped.length}:`);
  for (const reason of skipped) {
    console.log(`  - ${reason}`);
  }
}
