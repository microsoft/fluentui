/* eslint-disable no-undef */

/**
 * Regenerates SSR template HTML and stylesheet CSS files next to their
 * source `.template.ts` / `.styles.ts` counterparts in `src/`.
 *
 * Flow:
 *   1. Compile `src/` to a throwaway temp dir so we have JS modules with
 *      runtime metadata for the generators to walk.
 *   2. Run `generate-templates` and `generate-stylesheets` from the
 *      `@microsoft/fast-test-harness` library, writing back into `src/`
 *      while preserving the per-component subdirectory structure.
 *
 * The generated files should be committed to the repo; the normal `compile` script
 * copies them into `dist/esm/`.
 *
 * Running this script is only necessary when making changes to the source `.template.ts` or `.styles.ts` files,
 * and should be part of the development workflow when working on those files. The generated files can then
 * be modified as needed for SSR purposes, and those modifications should also be committed to the repo.
 *
 * Pass `--check` to compare what regeneration would produce against the
 * current working tree without writing. Each output file is classified
 * against the matrix of (TS@HEAD vs TS@working) × (HTML@HEAD vs
 * HTML@working) × (regen output vs disk). Exits non-zero when any
 * stale, hand-edited, or conflicting files are detected.
 */

import { execSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { glob, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

import chalk from 'chalk';
import prettier from 'prettier';

import { generateStylesheets } from '@microsoft/fast-test-harness/build/generate-stylesheets.js';
import { generateFTemplates } from '@microsoft/fast-test-harness/build/generate-templates.js';

const cwd = process.cwd();
const TEMP_PARENT = join(cwd, 'temp');
const checkMode = process.argv.includes('--check');
const label = checkMode ? 'generate:ssr:check' : 'generate:ssr';

async function main() {
  mkdirSync(TEMP_PARENT, { recursive: true });
  const tempDir = mkdtempSync(join(TEMP_PARENT, 'ssr-'));
  const stagingDir = checkMode ? mkdtempSync(join(TEMP_PARENT, 'ssr-staging-')) : null;
  const prettierConfig = (await prettier.resolveConfig(cwd)) ?? {};
  const outDir = stagingDir ? relative(cwd, stagingDir) : 'src';
  let exitCode = 0;

  try {
    console.log(chalk.bold(`🎬 ${label} start`));

    console.log(chalk.blueBright(`${label}: compiling src → ${tempDir}`));
    execSync(`tsc -p tsconfig.lib.json --rootDir ./src --baseUrl . --outDir ${tempDir} --declaration false`, {
      stdio: 'inherit',
    });

    console.log(chalk.blueBright(`${label}: writing *.template.html → ${outDir}/`));
    await generateFTemplates({
      cwd,
      distDir: tempDir,
      outDir,
      tagPrefix: 'fluent',
      format: content =>
        prettier.format(content, { ...prettierConfig, parser: 'html', htmlWhitespaceSensitivity: 'ignore' }),
    });

    console.log(chalk.blueBright(`${label}: writing *.styles.css → ${outDir}/`));
    await generateStylesheets({
      cwd,
      distDir: tempDir,
      outDir,
      format: content => prettier.format(content, { ...prettierConfig, parser: 'css' }),
    });

    if (checkMode) {
      const result = await classify(stagingDir);
      printSummary(result);
      if (result.stale.length || result.handEdited.length || result.conflicts.length) {
        exitCode = 1;
      }
    }

    console.log(chalk.bold(`🏁 ${label} end`));
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
    if (stagingDir) rmSync(stagingDir, { recursive: true, force: true });
  }

  if (exitCode) process.exit(exitCode);
}

/**
 * Classify each staged file against the working tree using the
 * four-state matrix. Returns counts plus per-bucket file lists.
 *
 * - `unchanged`  — regen produces the file already on disk
 * - `created`    — no committed baseline for this HTML/CSS
 * - `updated`    — TS changed; regen produces new HTML/CSS (normal flow)
 * - `stale`      — TS and HTML both at HEAD, but regen disagrees with disk
 *                  (committed state is out of sync — CI failure signal)
 * - `handEdited` — HTML differs from HEAD with no TS change; regen would clobber
 * - `conflicts`  — both TS and HTML differ from HEAD, and regen disagrees with disk
 */
async function classify(stagingDir) {
  const dirtyMap = buildDirtyMap();
  // git status --porcelain paths are relative to the repo root; lookups
  // need to be prefixed with the path from repo root to cwd.
  const repoPrefix = execSync('git rev-parse --show-prefix', { cwd, encoding: 'utf8' }).trim();
  const dirtyStatus = path => statusOf(dirtyMap.get(repoPrefix + path));
  const result = {
    unchanged: [],
    created: [],
    updated: [],
    stale: [],
    handEdited: [],
    conflicts: [],
  };

  for (const pattern of ['**/*.template.html', '**/*.styles.css']) {
    for await (const file of glob(pattern, { cwd: stagingDir })) {
      const stagedAbs = join(stagingDir, file);
      const srcHtmlAbs = join(cwd, 'src', file);
      const srcHtmlRel = join('src', file);

      let srcTsRel;
      if (file.endsWith('.template.html')) {
        srcTsRel = join('src', file.replace(/\.template\.html$/, '.template.ts'));
      } else if (file.endsWith('.styles.css')) {
        srcTsRel = join('src', file.replace(/\.styles\.css$/, '.styles.ts'));
      } else {
        continue;
      }

      const tsStatus = dirtyStatus(srcTsRel);
      const htmlStatus = dirtyStatus(srcHtmlRel);
      const newHtml = await readFile(stagedAbs, 'utf8');
      const onDiskHtml = await readFile(srcHtmlAbs, 'utf8').catch(() => null);

      if (newHtml === onDiskHtml) {
        result.unchanged.push(file);
        continue;
      }

      if (htmlStatus === 'new') {
        result.created.push(file);
        continue;
      }

      if (htmlStatus === 'same') {
        if (tsStatus === 'same') {
          result.stale.push(file);
        } else {
          result.updated.push(file);
        }
        continue;
      }

      // htmlStatus === 'changed'
      if (tsStatus === 'same') {
        result.handEdited.push(file);
      } else {
        result.conflicts.push(file);
      }
    }
  }

  return result;
}

/**
 * One git invocation that returns a map of {pathRelativeToCwd → status code}
 * for every file that differs from HEAD (modified, added, untracked, etc.).
 * Tracked files in sync with HEAD are absent from the map.
 */
function buildDirtyMap() {
  const map = new Map();
  const output = execSync('git status --porcelain=v1 -uall', { cwd, encoding: 'utf8' });
  for (const line of output.split('\n')) {
    if (!line) continue;
    const code = line.slice(0, 2);
    let path = line.slice(3);
    if (path.startsWith('"')) path = JSON.parse(path);
    const arrow = path.indexOf(' -> '); // rename: "old -> new"
    if (arrow !== -1) path = path.slice(arrow + 4);
    map.set(path, code);
  }
  return map;
}

function statusOf(code) {
  if (!code) return 'same';
  if (code[0] === '?' || code[0] === 'A') return 'new';
  return 'changed';
}

function printSummary({ unchanged, created, updated, stale, handEdited, conflicts }) {
  console.log(chalk.bold(`\n${label} summary:`));
  console.log(chalk.green(`  ✓ ${unchanged.length} unchanged`));
  printBucket(chalk.cyan, '+', created, 'new (no committed baseline)');
  printBucket(chalk.blue, '✎', updated, 'would update (TS changed)');
  printBucket(chalk.yellow, '!', stale, 'stale (committed HTML out of sync with committed TS)');
  printBucket(chalk.yellow, '⚠', handEdited, 'hand-edited (HTML differs from HEAD, TS unchanged)');
  printBucket(chalk.red, '✘', conflicts, 'conflicts (TS and HTML both differ from HEAD, regen disagrees with disk)');
  console.log('');
}

function printBucket(color, glyph, files, description) {
  if (files.length === 0) return;
  console.log(color(`  ${glyph} ${files.length} ${description}`));
  for (const f of files) console.log(chalk.dim(`      ${f}`));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
