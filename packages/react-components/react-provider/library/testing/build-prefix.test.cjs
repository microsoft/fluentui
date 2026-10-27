'use strict';

const assert = require('node:assert/strict');
const { mkdtempSync, readFileSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join, resolve } = require('node:path');
const { after, before, test } = require('node:test');
const { buildSync, transformSync } = require('esbuild');
const { chromium } = require('playwright');
const webpack = require('webpack');

const providerRoot = resolve(__dirname, '..');
const workspaceRoot = resolve(providerRoot, '../../../..');
const utilitiesRoot = resolve(providerRoot, '../../react-utilities');
const reactModules = process.env.FLUENT_TEST_REACT_ROOT || join(workspaceRoot, 'node_modules');
const reactVersion = require(join(reactModules, 'react/package.json')).version;
const legacyRoot = Number(reactVersion.split('.')[0]) < 18;
const token = '__FLUENT_USE_ID_BUILD_PREFIX__';
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'fluent-build-prefix-'));
const hookPaths = ['lib/hooks/useId.js', 'lib-commonjs/hooks/useId.cjs'].map(path => join(utilitiesRoot, path));
let browser;

const define = namespace => ({
  [token]: JSON.stringify(namespace),
  'process.env.NODE_ENV': JSON.stringify('production'),
});

function bundle(source, name, namespace, platform = 'browser') {
  const outfile = join(temporaryDirectory, `${name}.${platform === 'node' ? 'cjs' : 'js'}`);
  buildSync({
    stdin: { contents: source, resolveDir: workspaceRoot },
    absWorkingDir: workspaceRoot,
    tsconfig: join(workspaceRoot, 'tsconfig.base.json'),
    nodePaths: [join(workspaceRoot, 'node_modules')],
    alias: {
      '@fluentui/react-utilities': join(utilitiesRoot, 'lib/index.js'),
      react: join(reactModules, 'react/index.js'),
      'react/jsx-runtime': join(reactModules, 'react/jsx-runtime.js'),
      'react-dom': join(reactModules, 'react-dom/index.js'),
      'react-dom/server': join(reactModules, `react-dom/server.${platform === 'node' ? 'node' : 'browser'}.js`),
      ...(!legacyRoot && { 'react-dom/client': join(reactModules, 'react-dom/client.js') }),
    },
    bundle: true,
    platform,
    format: platform === 'node' ? 'cjs' : 'iife',
    globalName: name,
    define: namespace === undefined ? { 'process.env.NODE_ENV': JSON.stringify('production') } : define(namespace),
    outfile,
    logLevel: 'error',
  });
  return outfile;
}

function hookEntry(hookPath) {
  return `
    import * as React from 'react';
    import { renderToString } from 'react-dom/server';
    import { useId, IdPrefixProvider } from ${JSON.stringify(hookPath)};
    function Content() {
      return React.createElement('input', { id: useId('field-') });
    }
    export function render() {
      return renderToString(React.createElement(IdPrefixProvider, {value: 'scope-'}, React.createElement(Content)));
    }
  `;
}

function providerEntry() {
  return `
    import * as React from 'react';
    ${
      legacyRoot
        ? "import { render as renderLegacy, hydrate as hydrateLegacy, unmountComponentAtNode } from 'react-dom';"
        : "import { createRoot, hydrateRoot } from 'react-dom/client';"
    }
    import { flushSync } from 'react-dom';
    import { renderToString } from 'react-dom/server';
    import { FluentProvider } from ${JSON.stringify(join(providerRoot, 'lib/index.js'))};
    import { useId, IdPrefixProvider, SSRProvider } from '@fluentui/react-utilities';
    import { webLightTheme, webDarkTheme } from '@fluentui/react-theme';
    export const themeValue = __FLUENT_USE_ID_BUILD_PREFIX__ === 'app-a'
      ? webLightTheme.colorBrandBackground : webDarkTheme.colorBrandBackground;
    export const errors = [];
    export let ready = false;
    const rootOptions = {identifierPrefix: 'instance-', onRecoverableError: error => errors.push(String(error))};
    let root;
    function Content() {
      const id = useId('field-');
      React.useEffect(() => { ready = true; }, []);
      return React.createElement('div', null,
        React.createElement('label', {htmlFor: id}, 'Field'),
        React.createElement('input', {id}));
    }
    function App() {
      return React.createElement(SSRProvider, null,
        React.createElement(IdPrefixProvider, {value: 'scope-'},
          React.createElement(FluentProvider, {theme: {colorBrandBackground: themeValue}},
            React.createElement(Content))));
    }
    export function render() {
      return renderToString(React.createElement(App), rootOptions);
    }
    export function mount(container) {
      ${
        legacyRoot
          ? 'root = container; flushSync(() => renderLegacy(React.createElement(App), container));'
          : 'root = createRoot(container, rootOptions); flushSync(() => root.render(React.createElement(App)));'
      }
    }
    export function hydrate(container) {
      ${
        legacyRoot
          ? 'root = container; flushSync(() => hydrateLegacy(React.createElement(App), container));'
          : 'flushSync(() => { root = hydrateRoot(container, React.createElement(App), rootOptions); });'
      }
    }
    export function unmount() {
      flushSync(() => ${legacyRoot ? 'unmountComponentAtNode(root)' : 'root.unmount()'});
    }
  `;
}

before(async () => {
  browser = await chromium.launch({ headless: true });
});

after(async () => {
  try {
    await browser?.close();
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test('published ESM and CommonJS preserve the token and compose identically', () => {
  for (const [index, path] of hookPaths.entries()) {
    assert.match(readFileSync(path, 'utf8'), /typeof __FLUENT_USE_ID_BUILD_PREFIX__/);
    for (const namespace of [undefined, '', 'app-a']) {
      const name = namespace === undefined ? 'absent' : namespace ? 'configured' : 'empty';
      const output = bundle(hookEntry(path), `hook${index}${name}`, namespace, 'node');
      const html = require(output).render();
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

test('unconfigured and empty browser builds preserve the existing prefix without process', async () => {
  for (const [index, path] of hookPaths.entries()) {
    for (const namespace of [undefined, '']) {
      const output = bundle(hookEntry(path), `browserConsumer${index}`, namespace);
      const page = await browser.newPage();
      try {
        await page.addScriptTag({ path: output });
        const result = await page.evaluate(
          consumerIndex => ({
            html: globalThis[`browserConsumer${consumerIndex}`].render(),
            hasProcess: typeof process !== 'undefined',
          }),
          index,
        );
        assert.match(result.html, /id="scope-field-/);
        assert.equal(result.hasProcess, false);
      } finally {
        await page.close();
      }
    }
  }
});

for (const hydration of [false, true]) {
  test(`React ${reactVersion}: independent bundles isolate provider styles (${
    hydration ? 'hydration' : 'client'
  })`, async () => {
    const source = providerEntry();
    const clientA = bundle(source, 'appA', 'app-a');
    const clientB = bundle(source, 'appB', 'app-b');
    const renderServerA = hydration ? require(bundle(source, 'serverA', 'app-a', 'node')).render : undefined;
    const serverA = renderServerA ? renderServerA() : '';
    const serverB = hydration ? require(bundle(source, 'serverB', 'app-b', 'node')).render() : '';
    if (renderServerA) {
      assert.equal(renderServerA(), serverA, 'a new SSR request must start with the same IDs');
    }
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') {
        errors.push(message.text());
      }
    });

    try {
      await page.setContent(`<div id="a">${serverA}</div><div id="b">${serverB}</div>`);
      const serverIds = await page.locator('input').evaluateAll(inputs => inputs.map(input => input.id));
      await page.addScriptTag({ path: clientA });
      await page.addScriptTag({ path: clientB });
      await page.evaluate(hydrate => {
        const method = hydrate ? 'hydrate' : 'mount';
        globalThis.appA[method](document.getElementById('a'));
        globalThis.appB[method](document.getElementById('b'));
      }, hydration);
      await page.waitForFunction(() => globalThis.appA.ready && globalThis.appB.ready);

      const state = await page.evaluate(() => {
        const providers = [...document.querySelectorAll('.fui-FluentProvider')];
        const inputs = [...document.querySelectorAll('input')];
        const styleIds = [...document.querySelectorAll('style[id]')].map(style => style.id);
        return {
          ids: inputs.map(input => input.id),
          labels: [...document.querySelectorAll('label')].map(label => label.htmlFor),
          styleIds,
          classes: providers.map(provider => provider.className.split(' ').find(name => name.includes('-scope-'))),
          colors: providers.map(provider => getComputedStyle(provider).getPropertyValue('--colorBrandBackground')),
          expectedColors: [globalThis.appA.themeValue, globalThis.appB.themeValue],
          hydrationErrors: [...globalThis.appA.errors, ...globalThis.appB.errors],
          hasProcess: typeof process !== 'undefined',
        };
      });

      assert.match(state.ids[0], /^app-a-scope-field-/);
      assert.match(state.ids[1], /^app-b-scope-field-/);
      assert.deepEqual(state.labels, state.ids);
      assert.equal(new Set([...state.ids, ...state.styleIds]).size, state.ids.length + state.styleIds.length);
      assert.deepEqual(state.styleIds.sort(), [...state.classes].sort());
      assert.deepEqual(state.colors, state.expectedColors);
      assert.notEqual(state.colors[0], state.colors[1]);
      assert.deepEqual(state.hydrationErrors, []);
      assert.equal(state.hasProcess, false);
      if (hydration) {
        assert.deepEqual(state.ids, serverIds);
      }

      await page.evaluate(() => globalThis.appA.unmount());
      assert.equal(await page.locator(`style[id="${state.classes[0]}"]`).count(), 0);
      assert.equal(await page.locator(`style[id="${state.classes[1]}"]`).count(), 1);
      assert.equal(
        await page
          .locator('#b .fui-FluentProvider')
          .evaluate(element => getComputedStyle(element).getPropertyValue('--colorBrandBackground')),
        state.expectedColors[1],
      );
      await page.evaluate(() => globalThis.appB.unmount());
      assert.equal(await page.locator('style[id]').count(), 0);
      assert.deepEqual(await page.evaluate(() => [...globalThis.appA.errors, ...globalThis.appB.errors]), []);
      assert.deepEqual(errors, []);
    } finally {
      await page.close();
    }
  });
}

test('Webpack and Vite replace the token in published dependency code without a process shim', async () => {
  const entry = join(temporaryDirectory, 'consumer.js');
  writeFileSync(entry, `${hookEntry(hookPaths[0])}\nglobalThis.renderConsumer = render;`);
  const webpackOutput = join(temporaryDirectory, 'webpack');
  const compiler = webpack({
    mode: 'production',
    entry,
    output: { path: webpackOutput, filename: 'consumer.js' },
    resolve: { modules: [join(workspaceRoot, 'node_modules'), 'node_modules'] },
    plugins: [new webpack.DefinePlugin({ [token]: JSON.stringify('webpack-app') })],
    optimization: { minimize: false },
  });
  try {
    await new Promise((resolveBuild, reject) => {
      compiler.run((error, stats) => {
        if (error || stats.hasErrors()) {
          reject(error || new Error(stats.toString({ all: false, errors: true })));
        } else {
          resolveBuild();
        }
      });
    });
  } finally {
    await new Promise((resolveClose, reject) => {
      compiler.close(error => (error ? reject(error) : resolveClose()));
    });
  }

  const { build } = await import('vite');
  const viteOutput = join(temporaryDirectory, 'vite');
  await build({
    configFile: false,
    root: workspaceRoot,
    logLevel: 'error',
    // Vite library mode leaves NODE_ENV replacement to consumers, unlike an application build.
    define: define('vite-app'),
    resolve: { dedupe: ['react', 'react-dom'] },
    build: {
      outDir: viteOutput,
      lib: { entry, name: 'consumer', formats: ['iife'], fileName: () => 'consumer.js' },
      minify: false,
    },
  });

  for (const [directory, namespace] of [
    [webpackOutput, 'webpack-app'],
    [viteOutput, 'vite-app'],
  ]) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    try {
      await page.addScriptTag({ path: join(directory, 'consumer.js') });
      assert.deepEqual(errors, [], namespace);
      const result = await page.evaluate(() => ({
        html: globalThis.renderConsumer(),
        hasProcess: typeof process !== 'undefined',
      }));
      assert.match(result.html, new RegExp(`id="${namespace}-scope-field-`));
      assert.equal(result.hasProcess, false);
    } finally {
      await page.close();
    }
  }
});
