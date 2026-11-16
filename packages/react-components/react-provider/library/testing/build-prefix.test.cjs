'use strict';

const assert = require('node:assert/strict');
const { mkdtempSync, readFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { after, test } = require('node:test');
const { transformSync } = require('esbuild');
const {
  createBuilder,
  hookEntry,
  prepareConsumers,
  prepareDemo,
  utilitiesRoot,
} = require('./build-prefix-fixtures.cjs');

const directory = mkdtempSync(join(tmpdir(), 'fluent-build-prefix-'));
const { bundle, legacy } = createBuilder(directory);
const hookPaths = ['lib/hooks/useId.js', 'lib-commonjs/hooks/useId.cjs'].map(path => join(utilitiesRoot, path));

after(() => rmSync(directory, { recursive: true, force: true }));

test('published ESM and CommonJS preserve the token and compose identically', () => {
  for (const [index, path] of hookPaths.entries()) {
    assert.match(readFileSync(path, 'utf8'), /typeof __FLUENT_USE_ID_BUILD_PREFIX__/);
    for (const namespace of [undefined, '', 'app-a']) {
      const name = namespace === undefined ? 'absent' : namespace ? 'configured' : 'empty';
      const html = require(bundle(hookEntry(path), `hook${index}${name}`, namespace, 'node')).render();
      assert.match(html, namespace ? /id="app-a-scope-field-/ : /id="scope-field-/);
    }
  }
  assert.doesNotMatch(
    readFileSync(join(utilitiesRoot, 'dist/index.d.ts'), 'utf8'),
    /declare (?:const|let|var) __FLUENT_USE_ID_BUILD_PREFIX__/,
  );
});

test('production bundles omit namespace validation and its diagnostic', () => {
  for (const [index, path] of hookPaths.entries()) {
    for (const namespace of [undefined, 'app-a']) {
      const output = bundle(hookEntry(path), `production${index}`, namespace);
      const { code } = transformSync(readFileSync(output, 'utf8'), { minify: true });
      assert.doesNotMatch(code, /__FLUENT_USE_ID_BUILD_PREFIX__ must be/);
      assert.equal(code.includes('[A-Za-z_][A-Za-z0-9_-]*'), false);
    }
  }
});

test('Webpack and Vite substitute the token in published dependencies', async () => {
  await prepareConsumers(directory);
  for (const name of ['webpack', 'vite']) {
    const { code } = transformSync(readFileSync(join(directory, name, 'consumer.js'), 'utf8'), { minify: true });
    assert.equal(code.includes(`${name}-app`), true);
    assert.doesNotMatch(code, /__FLUENT_USE_ID_BUILD_PREFIX__/);
  }
});

test('shared demo emits both client and hydration documents in fresh output', () => {
  const output = join(directory, 'demo');
  prepareDemo(output);
  for (const name of [
    'broken',
    'build',
    'build-reverse',
    'build-hydrate',
    'build-hydrate-reverse',
    legacy ? 'provider' : 'root',
  ]) {
    assert.match(readFileSync(join(output, name, 'index.html'), 'utf8'), /src="controller.js"/);
    assert.match(readFileSync(join(output, name, 'controller.js'), 'utf8'), /id-namespace-state/);
  }
});
