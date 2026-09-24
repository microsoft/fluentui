/** @jest-environment node */ // eslint-disable-line jsdoc/check-tag-names -- Jest environment pragma.

import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as vm from 'node:vm';
import webpack from 'webpack';

import { buildRuntimeEntrySource, filterRuntimeEntryAssets, isPlaygroundAddonFile } from './webpack';

describe('isPlaygroundAddonFile', () => {
  it.each([
    '/repo/react-storybook-addon-playground/preset.js',
    'C:\\repo\\react-storybook-addon-playground\\preset.js',
  ])('matches the addon preset path %s', presetPath => {
    expect(isPlaygroundAddonFile(presetPath)).toBe(true);
  });
});

describe('filterRuntimeEntryAssets', () => {
  it('removes playground-only assets from Storybook HTML and preserves shared chunks', () => {
    const entrypoints = new Map([
      [
        'main',
        {
          getFiles: () => ['runtime~main.js', 'shared.js', 'main.js', 'shared.css'],
        },
      ],
      [
        'playground-runtime',
        {
          getFiles: () => [
            'runtime~playground-runtime.js',
            'react-dom-client.js',
            'shared.js',
            'playground-runtime.js',
            'shared.css',
            'playground.css',
          ],
        },
      ],
    ]);
    const data = {
      assets: {
        js: [
          'runtime~main.js',
          'shared.js',
          'main.js',
          'runtime~playground-runtime.js',
          'react-dom-client.js',
          'playground-runtime.js',
        ],
        css: ['shared.css', 'playground.css'],
      },
    };

    expect(filterRuntimeEntryAssets(entrypoints, data)).toEqual({
      assets: {
        js: ['runtime~main.js', 'shared.js', 'main.js'],
        css: ['shared.css'],
      },
    });
  });
});

describe('buildRuntimeEntrySource', () => {
  it('defers development module evaluation without creating lazy-compilation proxies', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playground-runtime-'));
    const setup = path.join(root, 'setup.mjs');
    const icons = path.join(root, 'icons.mjs');
    const entry = path.join(root, 'entry.mjs');
    fs.writeFileSync(setup, 'export default {};');
    fs.writeFileSync(icons, 'globalThis.iconsEvaluated = true; export const Icon = "icon";');
    fs.writeFileSync(entry, buildRuntimeEntrySource({ modules: { icons }, setup }));
    const lazyModule = jest.fn(() => {
      throw new Error('Playground modules must not use lazy-compilation proxies');
    });
    const compiler = webpack({
      mode: 'development',
      devtool: false,
      entry,
      output: { path: path.join(root, 'out'), filename: 'runtime.js' },
      externals: Object.fromEntries(
        ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'].map(name => [name, `commonjs ${name}`]),
      ),
      experiments: {
        lazyCompilation: {
          entries: false,
          imports: true,
          backend: (_compiler, callback) => {
            callback(null, { module: lazyModule, dispose: done => done() });
          },
        },
      },
    });

    try {
      await new Promise<void>((resolve, reject) => {
        compiler.run((error, stats) => {
          if (error || stats?.hasErrors()) {
            reject(error ?? new Error(stats?.toString('errors-only')));
          } else {
            resolve();
          }
        });
      });
      const context = {
        iconsEvaluated: false,
        require: () => ({}),
        __FLUENTUI_PLAYGROUND_REGISTER_V1__: jest.fn(),
      };
      vm.runInNewContext(fs.readFileSync(path.join(root, 'out/runtime.js'), 'utf8'), context);
      expect(lazyModule).not.toHaveBeenCalled();
      expect(context.iconsEvaluated).toBe(false);
      const runtime = context.__FLUENTUI_PLAYGROUND_REGISTER_V1__.mock.calls[0][0];
      expect((await runtime.moduleLoaders.icons()).Icon).toBe('icon');
      expect(context.iconsEvaluated).toBe(true);
    } finally {
      await new Promise<void>((resolve, reject) => {
        compiler.close(error => (error ? reject(error) : resolve()));
      });
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('loads production modules on demand without changing public import names', () => {
    const source = buildRuntimeEntrySource(
      {
        modules: { icons: '@fluentui/react-icons', button: '@fluentui/react-headless-components-preview/button' },
        setup: '/abs/playground.setup.tsx',
      },
      true,
    );

    expect(source).toContain(
      '"icons": () => import(/* webpackChunkName: "playground-module-0" */ "@fluentui/react-icons")',
    );
    expect(source).toContain(
      '"button": () => import(/* webpackChunkName: "playground-module-1" */ "@fluentui/react-headless-components-preview/button")',
    );
    expect(source).not.toContain('import * as __pg_mod_');
    expect(source).toContain("import * as React from 'react';");
    expect(source).toContain("import * as ReactDOMClient from 'react-dom/client';");
  });

  it('keeps development modules in eager chunks without evaluating them at startup', () => {
    const source = buildRuntimeEntrySource({
      modules: {
        '@fluentui/react-components': '@fluentui/react-components',
        '@fluentui/react-icons': '@fluentui/react-icons',
      },
      setup: '/abs/playground.setup.tsx',
    });

    expect(source).toContain(
      '"@fluentui/react-components": () => import(/* webpackMode: "eager" */ "@fluentui/react-components")',
    );
    expect(source).toContain(
      '"@fluentui/react-icons": () => import(/* webpackMode: "eager" */ "@fluentui/react-icons")',
    );
    expect(source).toContain('const allowedModules = Object.freeze(Object.keys(moduleLoaders));');
    expect(source).toContain('allowedModules,');
    expect(source).not.toContain('import * as __pg_mod_');
  });
});
