'use strict';

const { buildSync } = require('esbuild');
const { mkdirSync, rmSync, writeFileSync } = require('node:fs');
const { join, resolve } = require('node:path');

const providerRoot = resolve(__dirname, '..');
const workspaceRoot = resolve(providerRoot, '../../../..');
const utilitiesRoot = resolve(providerRoot, '../../react-utilities');
const token = '__FLUENT_USE_ID_BUILD_PREFIX__';
const tokenNames = ['colorBrandBackground', 'colorPaletteRedBackground3', 'fontSizeBase200', 'strokeWidthThin'];

function createBuilder(outputDirectory, reactModules = join(workspaceRoot, 'node_modules')) {
  const reactVersion = require(join(reactModules, 'react/package.json')).version;
  const legacy = Number(reactVersion.split('.')[0]) < 18;

  function bundle(source, name, namespace, platform = 'browser') {
    const outfile = join(outputDirectory, `${name}.${platform === 'node' ? 'cjs' : 'js'}`);
    mkdirSync(outputDirectory, { recursive: true });
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
        ...(!legacy && { 'react-dom/client': join(reactModules, 'react-dom/client.js') }),
      },
      bundle: true,
      platform,
      format: platform === 'node' ? 'cjs' : 'iife',
      globalName: name,
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        ...(namespace !== undefined && { [token]: JSON.stringify(namespace) }),
      },
      outfile,
      logLevel: 'error',
    });
    return outfile;
  }

  function providerEntry(themeName, protection) {
    return `
      import * as React from 'react';
      ${
        legacy
          ? "import {render, hydrate as hydrateLegacy, unmountComponentAtNode, flushSync} from 'react-dom';"
          : "import {createRoot, hydrateRoot} from 'react-dom/client'; import {flushSync} from 'react-dom';"
      }
      import {renderToString} from 'react-dom/server';
      import {FluentProvider} from ${JSON.stringify(join(providerRoot, 'lib/index.js'))};
      import {useId, IdPrefixProvider, SSRProvider} from '@fluentui/react-utilities';
      import {webLightTheme, webDarkTheme} from '@fluentui/react-theme';
      export const version = React.version;
      export const runtime = React;
      export const errors = [];
      export let ready = false;
      let root;
      let theme = ${themeName === 'host' ? 'webLightTheme' : 'webDarkTheme'};
      const options = {
        ${protection === 'root' ? `identifierPrefix: '${themeName}-',` : ''}
        onRecoverableError: error => errors.push(String(error))
      };
      function Content() {
        const id = useId('field-');
        React.useEffect(() => { ready = true; }, []);
        return React.createElement('div', null,
          React.createElement('label', {htmlFor: id}, '${themeName} field'),
          React.createElement('input', {id}),
          React.createElement('p', {style: {
            color: 'var(--colorNeutralForegroundOnBrand)',
            backgroundColor: 'var(--colorBrandBackground)',
            fontSize: 'var(--fontSizeBase200)',
            borderStyle: 'solid',
            borderWidth: 'var(--strokeWidthThin)'
          }}, 'Theme-dependent content'));
      }
      function App() {
        const provider = React.createElement(FluentProvider, {theme}, React.createElement(Content));
        return React.createElement(SSRProvider, null, ${
          protection === 'provider'
            ? `React.createElement(IdPrefixProvider, {value: '${themeName}-'}, provider)`
            : 'provider'
        });
      }
      export function expected() {
        return Object.fromEntries(${JSON.stringify(tokenNames)}.map(name => [name, theme[name]]));
      }
      export function serverRender() {
        return renderToString(React.createElement(App), options);
      }
      export function mount(container, hydration) {
        ready = false;
        ${
          legacy
            ? 'root = container; flushSync(() => (hydration ? hydrateLegacy : render)(React.createElement(App), container));'
            : 'flushSync(() => { root = hydration ? hydrateRoot(container, React.createElement(App), options) : createRoot(container, options); if (!hydration) root.render(React.createElement(App)); });'
        }
      }
      export function updateTheme() {
        theme = theme === webLightTheme ? webDarkTheme : webLightTheme;
        flushSync(() => ${legacy ? 'render(React.createElement(App), root)' : 'root.render(React.createElement(App))'});
      }
      export function unmount() {
        flushSync(() => ${legacy ? 'unmountComponentAtNode(root)' : 'root.unmount()'});
        ready = false;
      }
    `;
  }

  return { bundle, providerEntry, reactVersion, legacy };
}

function hookEntry(hookPath) {
  return `
    import * as React from 'react';
    import {renderToString} from 'react-dom/server';
    import {useId, IdPrefixProvider} from ${JSON.stringify(hookPath)};
    function Content() { return React.createElement('input', {id: useId('field-')}); }
    export function render() {
      return renderToString(React.createElement(IdPrefixProvider, {value: 'scope-'}, React.createElement(Content)));
    }
  `;
}

function controller(hydration, reverse) {
  return `
    const apps = {host: appHost, embedded: appEmbedded};
    const mounted = {host: true, embedded: true};
    const failures = [];
    let revision = 1;
    addEventListener('error', event => failures.push(event.message));
    const order = ${JSON.stringify(reverse ? ['embedded', 'host'] : ['host', 'embedded'])};
    const serverIds = [...document.querySelectorAll('input')].map(input => input.id);
    for (const name of order) apps[name].mount(document.getElementById(name), ${hydration});
    function getState() {
      const styleIds = [...document.querySelectorAll('style[id]')].map(style => style.id);
      const state = {};
      for (const name of Object.keys(apps)) {
        const container = document.getElementById(name);
        const provider = container.querySelector('.fui-FluentProvider');
        const input = container.querySelector('input');
        function values(element) {
          return element ? Object.fromEntries(${JSON.stringify(tokenNames)}.map(token =>
            [token, getComputedStyle(element).getPropertyValue('--' + token).trim()])) : null;
        }
        state[name] = {
          version: apps[name].version,
          id: input?.id,
          label: container.querySelector('label')?.htmlFor,
          themeClass: provider && [...provider.classList].find(name => styleIds.includes(name)),
          values: values(provider),
          descendantValues: values(input),
          expected: apps[name].expected()
        };
      }
      return {
        revision,
        ready: Object.keys(apps).every(name => !mounted[name] || apps[name].ready),
        apps: state, styleIds, serverIds,
        griffelSheets: document.querySelectorAll('style[data-make-styles-bucket]').length,
        independentRuntimes: apps.host.runtime !== apps.embedded.runtime,
        errors: [...failures, ...apps.host.errors, ...apps.embedded.errors],
        hasProcess: typeof process !== 'undefined'
      };
    }
    function refresh() {
      const state = getState();
      parent.postMessage({
        type: 'id-namespace-state', value: JSON.stringify(state, null, 2), ready: state.ready
      }, location.origin);
      return state;
    }
    globalThis.namespaceDemo = {
      getState,
      unmount(name) { apps[name].unmount(); mounted[name] = false; revision++; refresh(); },
      updateTheme(name) { apps[name].updateTheme(); revision++; refresh(); }
    };
    addEventListener('message', event => {
      if (event.source !== parent || event.origin !== location.origin) return;
      const command = event.data;
      if (command?.type !== 'id-namespace-command') return;
      if (command.action === 'getState') { refresh(); return; }
      if (command.name !== 'host' && command.name !== 'embedded') return;
      if (!mounted[command.name]) return;
      if (command.action === 'unmount') namespaceDemo.unmount(command.name);
      if (command.action === 'updateTheme') namespaceDemo.updateTheme(command.name);
    });
    function waitForMount() {
      const state = getState();
      if (state.ready || state.errors.length) { refresh(); return; }
      requestAnimationFrame(waitForMount);
    }
    waitForMount();
  `;
}

function prepareDemo(outputDirectory, reactModules) {
  const initial = createBuilder(outputDirectory, reactModules);
  const scenarios = ['broken', 'build', initial.legacy ? 'provider' : 'root'];
  for (const protection of scenarios) {
    const modes =
      protection === 'build'
        ? [
            [false, false],
            [false, true],
            [true, false],
            [true, true],
          ]
        : [[false, false]];
    for (const [hydration, reverse] of modes) {
      const name = `${protection}${hydration ? '-hydrate' : ''}${reverse ? '-reverse' : ''}`;
      const directory = join(outputDirectory, name);
      const builder = createBuilder(directory, reactModules);
      const hostSource = builder.providerEntry('host', protection);
      const embeddedSource = builder.providerEntry('embedded', protection);
      const hostNamespace = protection === 'build' ? 'host' : undefined;
      const embeddedNamespace = protection === 'build' ? 'embedded' : undefined;
      builder.bundle(hostSource, 'appHost', hostNamespace);
      builder.bundle(embeddedSource, 'appEmbedded', embeddedNamespace);
      let hostHtml = '';
      let embeddedHtml = '';
      if (hydration) {
        const host = require(builder.bundle(hostSource, 'serverHost', hostNamespace, 'node'));
        const embedded = require(builder.bundle(embeddedSource, 'serverEmbedded', embeddedNamespace, 'node'));
        hostHtml = host.serverRender();
        embeddedHtml = embedded.serverRender();
        if (host.serverRender() !== hostHtml || embedded.serverRender() !== embeddedHtml) {
          throw new Error('SSR requests must generate stable identifiers.');
        }
      }
      writeFileSync(join(directory, 'controller.js'), controller(hydration, reverse));
      writeFileSync(
        join(directory, 'index.html'),
        `<!doctype html>
          <html><head><meta charset="utf-8"><title>ID namespace: ${name}</title></head><body>
          <h3>Host</h3><div id="host">${hostHtml}</div>
          <h3>Embedded app</h3><div id="embedded">${embeddedHtml}</div>
          <script src="appHost.js"></script><script src="appEmbedded.js"></script>
          <script src="controller.js"></script></body></html>`,
      );
    }
  }
  writeFileSync(join(outputDirectory, 'manifest.json'), JSON.stringify({ reactVersion: initial.reactVersion }));
  return initial.reactVersion;
}

async function prepareConsumers(outputDirectory, reactModules = join(workspaceRoot, 'node_modules')) {
  const webpack = require('webpack');
  const entry = join(outputDirectory, 'consumer-entry.js');
  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(
    entry,
    `${hookEntry(join(utilitiesRoot, 'lib/hooks/useId.js'))}
    globalThis.renderConsumer = render;
    globalThis.consumerReactVersion = React.version;`,
  );
  const webpackDirectory = join(outputDirectory, 'webpack');
  const compiler = webpack({
    mode: 'production',
    entry,
    output: { path: webpackDirectory, filename: 'consumer.js' },
    resolve: {
      modules: [join(workspaceRoot, 'node_modules'), 'node_modules'],
      alias: {
        react$: join(reactModules, 'react/index.js'),
        'react-dom/server$': join(reactModules, 'react-dom/server.browser.js'),
      },
    },
    plugins: [new webpack.DefinePlugin({ __FLUENT_USE_ID_BUILD_PREFIX__: JSON.stringify('webpack-app') })],
    optimization: { minimize: false },
  });
  try {
    await new Promise((resolveBuild, reject) => {
      compiler.run((error, stats) => {
        if (error || !stats || stats.hasErrors()) {
          reject(error || new Error(stats ? stats.toString({ all: false, errors: true }) : 'No Webpack stats.'));
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
  await build({
    configFile: false,
    root: workspaceRoot,
    logLevel: 'error',
    define: {
      __FLUENT_USE_ID_BUILD_PREFIX__: JSON.stringify('vite-app'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    resolve: {
      alias: [
        { find: /^react$/, replacement: join(reactModules, 'react/index.js') },
        { find: /^react-dom\/server$/, replacement: join(reactModules, 'react-dom/server.browser.js') },
      ],
    },
    build: {
      outDir: join(outputDirectory, 'vite'),
      lib: { entry, name: 'consumer', formats: ['iife'], fileName: () => 'consumer.js' },
      minify: false,
    },
  });
  for (const name of ['webpack', 'vite']) {
    writeFileSync(
      join(outputDirectory, name, 'report.js'),
      `
      globalThis.namespaceConsumer = {
        html: renderConsumer(), version: consumerReactVersion, hasProcess: typeof process !== 'undefined'
      };
      parent.postMessage({
        type: 'id-namespace-state', value: JSON.stringify(namespaceConsumer), ready: true
      }, location.origin);
    `,
    );
    writeFileSync(
      join(outputDirectory, name, 'index.html'),
      `<!doctype html>
      <html><head><meta charset="utf-8"><title>${name} consumer</title></head><body>
      <script src="consumer.js"></script><script src="report.js"></script></body></html>`,
    );
  }
}

module.exports = {
  createBuilder,
  hookEntry,
  prepareDemo,
  prepareConsumers,
  providerRoot,
  workspaceRoot,
  utilitiesRoot,
  tokenNames,
};

if (require.main === module) {
  const directory = join(providerRoot, 'dist/id-namespace-demo');
  rmSync(directory, { recursive: true, force: true });
  prepareDemo(directory);
}
