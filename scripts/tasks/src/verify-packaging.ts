import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import micromatch from 'micromatch';

import type { JustArgs } from './argv';

/**
 * @see https://docs.npmjs.com/cli/v10/commands/npm-publish#files-included-in-package
 */
const alwaysPublishedFiles = ['LICENSE', 'package.json', 'README.md'];
const rootConfigFiles = [
  'just.config.[jt]s',
  'jest.config.[jt]s',
  '.eslintrc.(js|json)',
  'project.json',
  '.babelrc.json',
  '.swcrc',
  'tsconfig(.*)?.json',
];
const nonProdAssets = ['assets/', 'docs/*', 'temp/*', 'bundle-size/*', '.storybook/*', 'stories/*'];

interface Options extends Partial<JustArgs> {}
export function verifyPackaging(options: Options) {
  const cwd = process.cwd();
  const packageJSON: { private?: boolean } = JSON.parse(readFileSync(path.join(cwd, 'package.json'), 'utf-8'));

  // no need to check if package is not being published yet
  if (packageJSON.private) {
    return;
  }

  const projectJSON: import('@nx/devkit').ProjectConfiguration = JSON.parse(
    readFileSync(path.join(cwd, 'project.json'), 'utf-8'),
  );
  const tags = projectJSON.tags ?? [];

  const npmPackResult = spawnSync('npm', ['pack', '--dry-run']);

  const processedResult = npmPackResult.output
    .toString()
    .replace(/\bnpm notice\b\s+[\d.]+[kB]+\s+/gi, '')
    .replace(/[ ]+/g, '');
  const processedResultArr = processedResult.split('\n');

  const isV8package = tags.indexOf('v8') !== -1;
  const isV9package = tags.indexOf('vNext') !== -1;
  const shipsAMD = isV8package || tags.indexOf('ships-amd') !== -1;
  const platform = { web: tags.indexOf('platform:web') !== -1, node: tags.indexOf('platform:node') !== -1 };

  // shared assertions
  assert.ok(micromatch(processedResultArr, alwaysPublishedFiles).length, `npm always shipped files`);
  assert.equal(
    micromatch(processedResultArr, nonProdAssets).length,
    0,
    `wont ship non production code related folders/files`,
  );
  assert.equal(micromatch(processedResultArr, rootConfigFiles).length, 0, `wont ship configuration files`);
  assert.ok(micromatch(processedResultArr, 'CHANGELOG.md').length, 'ships changelog markdown file');
  assert.ok(micromatch(processedResultArr, 'dist/*.d.ts').length, 'ships rolluped dts');
  assert.ok(micromatch(processedResultArr, 'lib-commonjs/**/*.(js|map)').length, 'ships cjs');
  assert.equal(micromatch(processedResultArr, 'src/*').length, 0, `wont ship source code from "/src"`);

  if (!platform.node) {
    assert.ok(micromatch(processedResultArr, 'lib/**/*.(js|map)').length, 'ships esm');
  }

  if (isV9package) {
    assert.equal(micromatch(processedResultArr, 'config/*').length, 0, `wont ship config folder`);
    assert.equal(micromatch(processedResultArr, 'etc/*').length, 0, `wont ship etc folder"`);
  }

  if (isV8package) {
    assert.ok(micromatch(processedResultArr, '(lib|lib-commonjs)/**/*.d.ts').length, `ships dts`);
  }

  // @FIXME `amd` is created only on release pipeline where `--production` flag is used on build commands which triggers it
  // we should enable this also on PR pipelines - need to verify time execution impact
  if (options.production && shipsAMD) {
    assert.ok(micromatch(processedResultArr, 'lib-amd/**/*.(js|map)').length, 'ships amd');
  }
}
