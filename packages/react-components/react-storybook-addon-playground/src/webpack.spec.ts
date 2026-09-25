/** @jest-environment node */ // eslint-disable-line jsdoc/check-tag-names -- Jest environment pragma.

import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as vm from 'node:vm';
import webpack from 'webpack';

import {
  buildRuntimeEntrySource,
  collectConfiguredTypings,
  filterRuntimeEntryAssets,
  findHtmlWebpackPluginConstructors,
  getAddonOptions,
  getMonacoTypeScriptVersion,
  getRuntimeEntryDirectory,
  isPlaygroundAddonFile,
} from './webpack';

describe('isPlaygroundAddonFile', () => {
  it.each([
    '/repo/react-storybook-addon-playground/preset.js',
    'C:\\repo\\react-storybook-addon-playground\\preset.js',
  ])('matches the addon preset path %s', presetPath => {
    expect(isPlaygroundAddonFile(presetPath)).toBe(true);
  });
});

describe('getAddonOptions', () => {
  type Options = Parameters<typeof getAddonOptions>[0];

  it('reads addon options passed directly to the preset hook', () => {
    const options = { modules: { icons: '@fluentui/react-icons' }, setup: './setup', typings: ['csstype'] };

    expect(getAddonOptions(options as unknown as Options)).toEqual(expect.objectContaining(options));
  });

  it('falls back to the registration in presetsList', () => {
    const options = {
      presetsList: [
        { name: '/repo/other-addon/preset.js', options: { modules: { other: 'other' } } },
        { name: '/repo/react-storybook-addon-playground/preset.js', options: { modules: { icons: 'icons' } } },
      ],
    };

    expect(getAddonOptions(options as unknown as Options).modules).toEqual({ icons: 'icons' });
  });
});

describe('findHtmlWebpackPluginConstructors', () => {
  const getHooks = () => ({ beforeAssetTagGeneration: { tap: () => undefined } });

  it('finds HtmlWebpackPlugin by its static hooks API even when the class name is mangled', () => {
    class HtmlWebpackPlugin {
      public static getHooks = getHooks;
    }
    class Minified {
      public static getHooks = getHooks;
      public userOptions = {};
    }
    class Unrelated {
      public static getHooks = getHooks;
    }

    expect(
      findHtmlWebpackPluginConstructors([
        new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new Minified(),
        new Unrelated(),
        null,
      ]),
    ).toEqual([HtmlWebpackPlugin, Minified]);
  });
});

describe('collectConfiguredTypings', () => {
  it('splits declarations into always-loaded React typings and per-module additions', () => {
    const typings = collectConfiguredTypings(
      { modules: { compression: 'lz-string', react: 'react' } },
      { configDir: path.resolve(__dirname, '..') },
      '4.5.5',
    );
    const baseFiles = Object.keys(typings.base);

    expect(typings.missing).toEqual([]);
    expect(baseFiles.some(file => file.startsWith('file:///node_modules/@types/react/'))).toBe(true);
    expect(typings.modules.react).toEqual({ files: {}, usesShared: false });
    const compression = typings.modules.compression.files;
    expect(compression['file:///node_modules/compression/index.d.ts']).toContain('"lz-string"');
    expect(Object.keys(compression).some(file => file.includes('/lz-string/'))).toBe(true);
    expect(Object.keys(compression).filter(file => baseFiles.includes(file))).toEqual([]);
  });

  it('moves declarations needed by several modules into a shared file', () => {
    const typings = collectConfiguredTypings(
      { modules: { first: 'lz-string', second: 'lz-string', react: 'react' } },
      { configDir: path.resolve(__dirname, '..') },
      '4.5.5',
    );

    expect(Object.keys(typings.shared).some(file => file.includes('/lz-string/'))).toBe(true);
    expect(typings.modules.first.usesShared).toBe(true);
    expect(Object.keys(typings.modules.first.files)).toEqual([
      'file:///node_modules/first/index.d.ts',
      'file:///node_modules/first/package.json',
    ]);
    expect(typings.modules.react.usesShared).toBe(false);
  });
});

describe('getMonacoTypeScriptVersion', () => {
  it('prefers the version recorded by the shell build and falls back to monaco-editor', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playground-shell-'));
    const metadataPath = path.join(root, 'playground-shell.json');

    try {
      fs.writeFileSync(metadataPath, JSON.stringify({ typescriptVersion: '9.8.7' }));
      expect(getMonacoTypeScriptVersion(metadataPath)).toBe('9.8.7');

      fs.writeFileSync(metadataPath, '{');
      expect(getMonacoTypeScriptVersion(metadataPath)).toMatch(/^\d+\.\d+\.\d+$/);
      expect(getMonacoTypeScriptVersion(path.join(root, 'missing.json'))).toMatch(/^\d+\.\d+\.\d+$/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

describe('getRuntimeEntryDirectory', () => {
  it('uses node_modules/.cache scoped by config directory, falling back to the config directory', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playground-cache-'));
    const configDir = path.join(root, 'app', '.storybook');
    fs.mkdirSync(configDir, { recursive: true });

    try {
      const fallback = getRuntimeEntryDirectory(configDir);
      // The temp directory may itself sit below a node_modules folder on some machines.
      if (!fallback.includes(`node_modules${path.sep}.cache`)) {
        expect(fallback).toBe(path.join(configDir, '.cache', 'fluentui-playground-runtime'));
      }

      fs.mkdirSync(path.join(root, 'node_modules'));
      const directory = getRuntimeEntryDirectory(configDir);
      expect(path.dirname(directory)).toBe(path.join(root, 'node_modules', '.cache', 'fluentui-playground-runtime'));
      expect(getRuntimeEntryDirectory(path.join(root, 'other', '.storybook'))).not.toBe(directory);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
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

  it.each([
    [
      'CommonJS',
      'setup.js',
      'Object.defineProperty(exports, "__esModule", { value: true }); exports.default = { title: "Setup" };',
    ],
    ['ES module', 'setup.mjs', 'export default { title: "Setup" };'],
  ])('registers the default export of a %s setup module', async (_kind, setupFile, setupSource) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playground-setup-'));
    const setup = path.join(root, setupFile);
    const entry = path.join(root, 'entry.mjs');
    fs.writeFileSync(setup, setupSource);
    fs.writeFileSync(entry, buildRuntimeEntrySource({ modules: {}, setup }, true));

    try {
      await new Promise<void>((resolve, reject) => {
        webpack({
          mode: 'production',
          devtool: false,
          optimization: { minimize: false },
          entry,
          output: { path: path.join(root, 'out'), filename: 'runtime.js' },
          externals: Object.fromEntries(
            ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'].map(name => [name, `commonjs ${name}`]),
          ),
        }).run((error, stats) => {
          if (error || stats?.hasErrors()) {
            reject(error ?? new Error(stats?.toString('errors-only')));
          } else {
            resolve();
          }
        });
      });
      const context = { require: () => ({}), __FLUENTUI_PLAYGROUND_REGISTER_V1__: jest.fn() };
      vm.runInNewContext(fs.readFileSync(path.join(root, 'out/runtime.js'), 'utf8'), context);

      expect(context.__FLUENTUI_PLAYGROUND_REGISTER_V1__.mock.calls[0][0].setup).toEqual({ title: 'Setup' });
    } finally {
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
