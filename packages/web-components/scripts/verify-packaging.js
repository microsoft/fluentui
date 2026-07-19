// @ts-check
/**
 * Copied from ${@link 'file://./../../../scripts/tasks/src/verify-packaging.ts'}
 */

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { glob, readFile } from 'node:fs/promises';
import path from 'node:path';

import { parse } from 'acorn';
import micromatch from 'micromatch';
import fastTaggedTemplates from 'rollup-plugin-fast-tagged-templates';

await main();

async function main() {
  /**
   * @see https://docs.npmjs.com/cli/v10/commands/npm-publish#files-included-in-package
   */
  const alwaysPublishedFiles = ['LICENSE', 'package.json', 'README.md'];
  const rootConfigFiles = [
    'just.config.[jt]s',
    'jest.config.[jt]s',
    'eslint.config.js',
    'project.json',
    '.babelrc.json',
    '.swcrc',
    'tsconfig(.*)?.json',
  ];
  const nonProdAssets = ['assets/', 'docs/*', 'temp/*', 'bundle-size/*', '.storybook/*', 'stories/*'];

  verifyPackaging({ alwaysPublishedFiles, nonProdAssets, rootConfigFiles });
  await verifyTaggedTemplatesAreMinified();
}

/**
 * The shipped ESM build must not contain readable whitespace inside `html` and `css` tagged
 * template literals: whitespace-only text nodes in templates become visible when a consumer
 * sets a non-`normal` CSS `white-space`, and the rollup bundles already ship these templates
 * minified via rollup-plugin-fast-tagged-templates. Asserting that the same transform is a
 * no-op over `dist/esm` guarantees the ESM and bundle builds stay behaviorally identical.
 * @see https://github.com/microsoft/fluentui/issues/36298
 */
async function verifyTaggedTemplatesAreMinified() {
  const esmRoot = path.join(import.meta.dirname, '../dist/esm');
  const plugin = fastTaggedTemplates();
  const pluginContext = { parse: code => parse(code, { ecmaVersion: 'latest', sourceType: 'module' }) };

  const unminified = [];
  for await (const file of glob('**/*.js', { cwd: esmRoot })) {
    const code = await readFile(path.join(esmRoot, file), 'utf-8');
    const result = await plugin.transform.call(pluginContext, code, file);
    if (result && result.code !== code) {
      unminified.push(file);
    }
  }

  assert.deepEqual(
    unminified,
    [],
    'ships esm with minified tagged templates (dist/esm files listed above still contain template whitespace)',
  );
}

/**
 *
 * @param {{alwaysPublishedFiles:string[];rootConfigFiles:string[];nonProdAssets:string[]}} options
 * @returns
 */

function verifyPackaging(options) {
  const { alwaysPublishedFiles, nonProdAssets, rootConfigFiles } = options;
  const root = path.join(import.meta.dirname, '../');

  /** @type {{ private?: boolean }} */
  const packageJSON = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf-8'));

  // no need to check if package is not being published yet
  if (packageJSON.private) {
    return;
  }

  const npmPackResult = spawnSync('npm', ['pack', '--dry-run']);

  const processedResult = npmPackResult.output
    .toString()
    .replace(/\bnpm notice\b\s+[\d.]+[kB]+\s+/gi, '')
    .replace(/[ ]+/g, '');
  const processedResultArr = processedResult.split('\n');

  assert.ok(micromatch(processedResultArr, alwaysPublishedFiles).length, `npm always shipped files`);
  assert.equal(
    micromatch(processedResultArr, nonProdAssets).length,
    0,
    `wont ship non production code related folders/files`,
  );
  assert.equal(micromatch(processedResultArr, 'dist/storybook/**').length, 0, `wont ship storybook assets`);
  assert.equal(micromatch(processedResultArr, rootConfigFiles).length, 0, `wont ship configuration files`);
  assert.ok(micromatch(processedResultArr, 'CHANGELOG.md').length, 'ships changelog markdown file');
  assert.ok(micromatch(processedResultArr, 'dist/*.d.ts').length, 'ships rolluped dts');
  assert.ok(micromatch(processedResultArr, 'dist/*.(min.js|js)').length, 'ships rolluped js');
  assert.equal(micromatch(processedResultArr, 'src/*').length, 0, `wont ship source code from "/src"`);

  assert.ok(micromatch(processedResultArr, 'dist/esm/**/*.(js|map|d.ts)').length, 'ships esm');
}
