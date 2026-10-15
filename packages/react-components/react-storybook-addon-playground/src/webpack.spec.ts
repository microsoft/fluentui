/** @jest-environment node */ // eslint-disable-line jsdoc/check-tag-names -- Jest environment pragma.

import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as vm from 'node:vm';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import * as ts from 'typescript';

import {
  BUILT_IN_MODULES,
  ENTRY_NAME,
  PlaygroundRuntimeManifestPlugin,
  buildRuntimeEntrySource,
  collectConfiguredTypings,
  filterRuntimeEntryAssets,
  findHtmlWebpackPluginConstructors,
  getAddonOptions,
  getAllowedModules,
  getModuleRequests,
  getMonacoTypeScriptVersion,
  getRuntimeEntryDirectory,
  isPlaygroundAddonFile,
  webpackFinal,
} from './webpack';

import type { PresetConfig } from './public-types';

describe('isPlaygroundAddonFile', () => {
  it.each([
    '/repo/react-storybook-addon-playground/preset.js',
    'C:\\repo\\react-storybook-addon-playground\\preset.js',
  ])('matches the addon preset path %s', presetPath => {
    expect(isPlaygroundAddonFile(presetPath)).toBe(true);
  });
});

describe('getAddonOptions', () => {
  it('reads addon options passed directly to the preset hook', () => {
    const options = {
      modules: { icons: '@fluentui/react-icons' },
      setup: './setup',
      typings: ['csstype'],
      typingsRoots: { icons: '/workspace/icons' },
      inlineStyles: true,
    };

    expect(getAddonOptions(options)).toEqual(expect.objectContaining(options));
  });

  it('reads package-list options passed directly to the preset hook', () => {
    const options = { modules: ['@fluentui/react-components', '@fluentui/react-icons'] };

    expect(getAddonOptions(options).modules).toEqual(options.modules);
  });

  it('falls back to the registration in presetsList', () => {
    const options = {
      presetsList: [
        { name: '/repo/other-addon/preset.js', preset: {}, options: { modules: { other: 'other' } } },
        {
          name: '/repo/react-storybook-addon-playground/preset.js',
          preset: {},
          options: { modules: { icons: 'icons' } },
        },
      ],
    };

    expect(getAddonOptions(options).modules).toEqual({ icons: 'icons' });
  });

  it('preserves package-list options from presetsList', () => {
    const modules = ['@fluentui/react-components'];
    const options = {
      presetsList: [{ name: '/repo/react-storybook-addon-playground/preset.js', preset: {}, options: { modules } }],
    };

    expect(getAddonOptions(options).modules).toEqual(modules);
  });
});

describe('getModuleRequests', () => {
  it('maps a package list to matching import names and requests without duplicate entries', () => {
    expect(getModuleRequests(['@fluentui/react-components', '@fluentui/react-icons', '@fluentui/react-icons'])).toEqual(
      {
        '@fluentui/react-components': '@fluentui/react-components',
        '@fluentui/react-icons': '@fluentui/react-icons',
      },
    );
  });

  it('preserves aliases in an import map', () => {
    expect(getModuleRequests({ icons: './playground-icons' })).toEqual({ icons: './playground-icons' });
  });
});

describe('getAllowedModules', () => {
  it('accepts package lists and import maps without exposing aliased requests', () => {
    expect(getAllowedModules({ modules: ['icons'] })).toEqual([
      'react',
      'react/jsx-runtime',
      'react-dom',
      'react-dom/client',
      'icons',
    ]);
    expect(getAllowedModules({ modules: { icons: './playground-icons' } })).toEqual(
      getAllowedModules({ modules: ['icons'] }),
    );
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
  it('collects the same declarations for a package list and an equivalent import map', async () => {
    const storybookOptions = { configDir: path.resolve(__dirname, '..') };

    expect(await collectConfiguredTypings({ modules: ['lz-string'] }, storybookOptions, '5.4.5')).toEqual(
      await collectConfiguredTypings({ modules: { 'lz-string': 'lz-string' } }, storybookOptions, '5.4.5'),
    );
  });

  describe('webpack typings resolution', () => {
    function expectEditorImports(files: Record<string, string>, source: string) {
      const virtualFiles: Record<string, string> = {
        ...Object.fromEntries(
          Object.entries(files).map(([file, content]) => [file.replace(/^file:\/\//, ''), content]),
        ),
        '/example.ts': source,
      };
      const options: ts.CompilerOptions = {
        noLib: true,
        strict: true,
        types: [],
        moduleResolution: ts.ModuleResolutionKind.Node10,
      };
      const host: ts.CompilerHost = {
        ...ts.createCompilerHost(options),
        getCurrentDirectory: () => '/',
        fileExists: file => file in virtualFiles,
        readFile: file => virtualFiles[file],
        directoryExists: directory => Object.keys(virtualFiles).some(file => file.startsWith(`${directory}/`)),
        getSourceFile: (file, languageVersion) =>
          virtualFiles[file] === undefined ? undefined : ts.createSourceFile(file, virtualFiles[file], languageVersion),
      };
      const program = ts.createProgram(['/example.ts'], options, host);
      expect(
        program
          .getSemanticDiagnostics()
          .map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')),
      ).toEqual([]);
    }

    async function buildFixture(
      files: Record<string, string>,
      configure: (root: string) => { options: PresetConfig; resolve?: webpack.ResolveOptions },
    ) {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playground-resolution-'));
      for (const [relativePath, content] of Object.entries({
        'setup.mjs': 'export default {};',
        ...files,
      })) {
        const file = path.join(root, relativePath);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, content);
      }
      fs.mkdirSync(path.join(root, 'node_modules'), { recursive: true });
      const { options, resolve } = configure(root);
      const setup = path.join(root, 'setup.mjs');
      const config = webpackFinal(
        {
          mode: 'development',
          devtool: false,
          context: root,
          entry: setup,
          output: { path: path.join(root, 'out'), filename: '[name].js' },
          externals: Object.fromEntries(BUILT_IN_MODULES.map(name => [name, `commonjs ${name}`])),
        },
        {
          ...options,
          setup,
          configDir: path.join(root, '.storybook'),
          configType: 'DEVELOPMENT',
        },
      );
      // Consumers run webpackFinal after addon presets. Typings must see this final configuration.
      config.resolve = resolve;
      const compiler = webpack(config);

      try {
        const stats = await new Promise<webpack.Stats>((fulfill, reject) => {
          compiler.run((error, result) => (error || !result ? reject(error) : fulfill(result)));
        });
        expect(stats.toString('errors-only')).toBe('');
        const manifest = JSON.parse(fs.readFileSync(path.join(root, 'out/playground/runtime/manifest.json'), 'utf8'));
        const declarations = Object.fromEntries(
          Object.entries(manifest.moduleTypings as Record<string, string[]>).map(([name, emittedFiles]) => [
            name,
            Object.assign(
              {},
              ...emittedFiles.map(file => JSON.parse(fs.readFileSync(path.join(root, 'out', file), 'utf8'))),
            ) as Record<string, string>,
          ]),
        );
        const moduleFiles = (name: string) => declarations[name];
        const runtimeContext = { require: () => ({}), __FLUENTUI_PLAYGROUND_REGISTER_V1__: jest.fn() };
        vm.runInNewContext(fs.readFileSync(path.join(root, 'out', `${ENTRY_NAME}.js`), 'utf8'), runtimeContext);
        const runtime = runtimeContext.__FLUENTUI_PLAYGROUND_REGISTER_V1__.mock.calls[0][0];
        return {
          manifest,
          moduleFiles,
          base: JSON.parse(fs.readFileSync(path.join(root, 'out', manifest.typings), 'utf8')),
          runtime,
          warnings: stats.compilation.warnings.map(warning => warning.message),
        };
      } finally {
        await new Promise<void>((fulfill, reject) => {
          compiler.close(error => (error ? reject(error) : fulfill()));
        });
        fs.rmSync(root, { recursive: true, force: true });
      }
    }

    it('collects workspace declarations through a final webpack alias instead of an installed copy', async () => {
      const result = await buildFixture(
        {
          'packages/ui/package.json': JSON.stringify({
            name: '@workspace/ui',
            module: './lib/index.js',
            types: './dist/index.d.ts',
          }),
          'packages/ui/lib/index.js': 'export const workspaceValue = "workspace";',
          'packages/ui/lib/package.json': JSON.stringify({ type: 'module' }),
          'packages/ui/dist/index.d.ts': 'export * from "./button";',
          'packages/ui/dist/button.d.ts': 'export declare const workspaceValue: "workspace";',
          'node_modules/workspace-ui/package.json': JSON.stringify({
            name: 'workspace-ui',
            main: './index.js',
            types: './index.d.ts',
          }),
          'node_modules/workspace-ui/index.js': 'exports.installedValue = "installed";',
          'node_modules/workspace-ui/index.d.ts': 'export declare const installedValue: "installed";',
        },
        root => ({
          options: { modules: ['workspace-ui'] },
          resolve: { alias: { 'workspace-ui$': path.join(root, 'packages/ui/lib') } },
        }),
      );

      expect((await result.runtime.moduleLoaders['workspace-ui']()).workspaceValue).toBe('workspace');
      const files = result.moduleFiles('workspace-ui');
      expect(files['file:///node_modules/@workspace/ui/dist/button.d.ts']).toContain('workspaceValue');
      expect(files['file:///node_modules/workspace-ui/index.d.ts']).toBeUndefined();
      expect(files['file:///playground-typings/workspace-ui/root.d.ts']).toContain('@workspace/ui');
      expect(result.manifest.allowedModules).toContain('workspace-ui');
      expect(result.manifest.allowedModules).not.toContain('@workspace/ui');
      expect(result.warnings.join('\n')).not.toContain('"workspace-ui"');
      expectEditorImports(
        files,
        'import { workspaceValue } from "workspace-ui"; const value: "workspace" = workspaceValue;',
      );
    });

    it('keeps ordinary node_modules and declaration-only typings entries working', async () => {
      const result = await buildFixture(
        {
          'node_modules/ordinary/package.json': JSON.stringify({
            name: 'ordinary',
            main: './lib/index.js',
            typings: './types/index.d.ts',
          }),
          'node_modules/ordinary/lib/index.js': 'exports.value = "ordinary";',
          'node_modules/ordinary/types/index.d.ts': 'export declare const value: "ordinary";',
          'node_modules/types-only/package.json': JSON.stringify({
            name: 'types-only',
            types: './index.d.ts',
            exports: { '.': { types: './index.d.ts' } },
          }),
          'node_modules/types-only/index.d.ts': 'export type Value = "ordinary";',
          'node_modules/@types/react/package.json': JSON.stringify({
            name: '@types/react',
            types: './index.d.ts',
            exports: { '.': { types: './index.d.ts' } },
          }),
          'node_modules/@types/react/index.d.ts': 'export type ReactValue = "fallback";',
        },
        () => ({ options: { modules: ['ordinary'], typings: ['types-only'] } }),
      );

      expect((await result.runtime.moduleLoaders.ordinary()).value).toBe('ordinary');
      expect(result.moduleFiles('ordinary')['file:///node_modules/ordinary/types/index.d.ts']).toContain('value');
      expect(result.base['file:///node_modules/types-only/index.d.ts']).toContain('Value');
      expect(result.base['file:///node_modules/@types/react/index.d.ts']).toContain('ReactValue');
      expect(result.base['file:///node_modules/react/package.json']).toBeUndefined();
      expect(result.manifest.allowedModules).not.toContain('types-only');
      expect(result.warnings.join('\n')).not.toContain('"ordinary"');
      expect(result.warnings.join('\n')).not.toContain('"types-only"');
      expectEditorImports(
        { ...result.base, ...result.moduleFiles('ordinary') },
        'import { value } from "ordinary"; import type { Value } from "types-only"; ' +
          'import type { ReactValue } from "react"; const result: Value = value; const reactValue: ReactValue = "fallback";',
      );
    });

    it('uses custom module directories for runtime modules, transitive declarations and declaration-only entries', async () => {
      const result = await buildFixture(
        {
          'vendor/ui/package.json': JSON.stringify({ name: 'ui', main: './index.js', types: './index.d.ts' }),
          'vendor/ui/index.js': 'exports.value = "custom";',
          'vendor/ui/index.d.ts': 'import type { Value } from "types-only"; export declare const value: Value;',
          'vendor/types-only/package.json': JSON.stringify({ name: 'types-only', types: './index.d.ts' }),
          'vendor/types-only/index.d.ts': 'export type Value = "custom";',
        },
        root => ({
          options: { modules: ['ui'], typings: ['types-only'] },
          resolve: { modules: [path.join(root, 'vendor'), 'node_modules'] },
        }),
      );

      expect((await result.runtime.moduleLoaders.ui()).value).toBe('custom');
      expect(result.base['file:///node_modules/types-only/index.d.ts']).toContain('Value');
      expectEditorImports(
        { ...result.base, ...result.moduleFiles('ui') },
        'import { value } from "ui"; const result: "custom" = value;',
      );
    });

    it('supports asynchronous resolver plugins without requiring synchronous filesystem resolution', async () => {
      const result = await buildFixture(
        {
          'packages/ui/package.json': JSON.stringify({
            name: 'workspace-ui',
            main: './lib/index.js',
            types: './dist/index.d.ts',
          }),
          'packages/ui/lib/index.js': 'exports.value = "plugin";',
          'packages/ui/dist/index.d.ts': 'export declare const value: "plugin";',
        },
        root => ({
          options: { modules: { 'public-ui': 'workspace-ui' } },
          resolve: {
            plugins: [
              {
                apply(resolver) {
                  resolver.getHook('resolve').tapAsync('WorkspacePackage', (request, context, callback) => {
                    if (request.request !== 'workspace-ui') {
                      callback();
                      return;
                    }
                    setImmediate(() =>
                      resolver.doResolve(
                        resolver.getHook('resolve'),
                        { ...request, request: path.join(root, 'packages/ui/lib/index.js') },
                        'workspace package',
                        context,
                        callback,
                      ),
                    );
                  });
                },
              },
            ],
          },
        }),
      );

      expect((await result.runtime.moduleLoaders['public-ui']()).value).toBe('plugin');
      expect(result.moduleFiles('public-ui')['file:///node_modules/workspace-ui/dist/index.d.ts']).toContain('value');
      expect(result.manifest.allowedModules).toContain('public-ui');
      expect(result.manifest.allowedModules).not.toContain('workspace-ui');
      expectEditorImports(
        result.moduleFiles('public-ui'),
        'import { value } from "public-ui"; const result: "plugin" = value;',
      );
    });

    it('follows a remapped runtime subpath instead of using the original subpath declarations', async () => {
      const result = await buildFixture(
        {
          'packages/ui/package.json': JSON.stringify({
            name: 'workspace-ui',
            exports: {
              './original': { types: './dist/original.d.ts', default: './lib/original.js' },
              './actual': { types: './dist/actual.d.ts', default: './lib/actual.js' },
            },
          }),
          'packages/ui/lib/original.js': 'export const value = "original";',
          'packages/ui/dist/original.d.ts': 'export declare const value: "original";',
          'packages/ui/lib/actual.js': 'export const value = "actual";',
          'packages/ui/dist/actual.d.ts': 'export declare const value: "actual";',
        },
        root => ({
          options: { modules: ['workspace-ui/original'] },
          resolve: { alias: { 'workspace-ui/original$': path.join(root, 'packages/ui/lib/actual.js') } },
        }),
      );

      expect((await result.runtime.moduleLoaders['workspace-ui/original']()).value).toBe('actual');
      const files = result.moduleFiles('workspace-ui/original');
      expect(files['file:///node_modules/workspace-ui/dist/actual.d.ts']).toContain('"actual"');
      expect(files['file:///node_modules/workspace-ui/dist/original.d.ts']).toBeUndefined();
      expectEditorImports(files, 'import { value } from "workspace-ui/original"; const result: "actual" = value;');
    });

    it('keeps remapped public subpaths working with typesVersions', async () => {
      const result = await buildFixture(
        {
          'packages/ui/package.json': JSON.stringify({
            name: 'workspace-ui',
            typesVersions: { '<99.0.0': { '*': ['legacy/*'] } },
            exports: {
              './actual': { types: './dist/actual.d.ts', default: './lib/actual.js' },
            },
          }),
          'packages/ui/lib/actual.js': 'export const value = "actual";',
          'packages/ui/dist/actual.d.ts': 'export declare const value: "modern";',
          'packages/ui/legacy/dist/actual.d.ts': 'export declare const value: "actual";',
        },
        root => ({
          options: { modules: ['workspace-ui/original'] },
          resolve: { alias: { 'workspace-ui/original$': path.join(root, 'packages/ui/lib/actual.js') } },
        }),
      );

      expect((await result.runtime.moduleLoaders['workspace-ui/original']()).value).toBe('actual');
      expectEditorImports(
        result.moduleFiles('workspace-ui/original'),
        'import { value } from "workspace-ui/original"; const result: "actual" = value;',
      );
    });

    it('uses an explicit typings root for an absolute runtime wrapper without changing its public import', async () => {
      const result = await buildFixture(
        {
          'wrapper.mjs': 'export const value = "wrapped";',
          'packages/ui/package.json': JSON.stringify({ name: 'workspace-ui', types: './dist/index.d.ts' }),
          'packages/ui/dist/index.d.ts': 'export declare const value: "wrapped";',
        },
        root => ({
          options: {
            modules: { 'public-ui': path.join(root, 'wrapper.mjs') },
            typingsRoots: { 'public-ui': '../packages/ui' },
          },
        }),
      );

      expect((await result.runtime.moduleLoaders['public-ui']()).value).toBe('wrapped');
      expect(result.moduleFiles('public-ui')['file:///node_modules/workspace-ui/dist/index.d.ts']).toContain(
        '"wrapped"',
      );
      expectEditorImports(
        result.moduleFiles('public-ui'),
        'import { value } from "public-ui"; const result: "wrapped" = value;',
      );
    });

    it('selects declarations from the same conditional export as the configured runtime', async () => {
      const result = await buildFixture(
        {
          'node_modules/conditional/package.json': JSON.stringify({
            name: 'conditional',
            exports: {
              node: { types: './node.d.ts', default: './node.js' },
              default: { types: './browser.d.ts', default: './browser.js' },
            },
          }),
          'node_modules/conditional/node.js': 'exports.value = "node";',
          'node_modules/conditional/node.d.ts': 'export declare const value: "node";',
          'node_modules/conditional/browser.js': 'exports.value = "browser";',
          'node_modules/conditional/browser.d.ts': 'export declare const value: "browser";',
        },
        () => ({
          options: { modules: ['conditional'] },
          resolve: { conditionNames: ['node', 'default'] },
        }),
      );

      expect((await result.runtime.moduleLoaders.conditional()).value).toBe('node');
      expectEditorImports(
        result.moduleFiles('conditional'),
        'import { value } from "conditional"; const result: "node" = value;',
      );
    });

    it.each<{ name: string; resolve?: webpack.ResolveOptions; expected: string }>([
      { name: 'default browser conditions', expected: 'browser' },
      { name: 'explicit node condition', resolve: { conditionNames: ['node'] }, expected: 'node' },
      {
        name: 'export order rather than condition-list order',
        resolve: { conditionNames: ['browser', 'node'] },
        expected: 'node',
      },
      { name: 'default fallback without named conditions', resolve: { conditionNames: [] }, expected: 'fallback' },
      {
        name: 'effective ESM conditions rather than base conditions',
        resolve: {
          conditionNames: ['node'],
          byDependency: { esm: { conditionNames: ['browser'] } },
        },
        expected: 'browser',
      },
    ])('selects shared-target declarations using $name', async ({ resolve, expected }) => {
      const result = await buildFixture(
        {
          'node_modules/conditional/package.json': JSON.stringify({
            name: 'conditional',
            exports: {
              node: { types: './node.d.ts', default: './shared.js' },
              browser: { types: './browser.d.ts', default: './shared.js' },
              default: { types: './fallback.d.ts', default: './shared.js' },
            },
          }),
          'node_modules/conditional/shared.js': 'exports.value = "shared";',
          ...Object.fromEntries(
            ['node', 'browser', 'fallback'].map(condition => [
              `node_modules/conditional/${condition}.d.ts`,
              `export declare const value: "shared"; export type Condition = "${condition}";`,
            ]),
          ),
        },
        () => ({ options: { modules: ['conditional'] }, resolve }),
      );

      expect((await result.runtime.moduleLoaders.conditional()).value).toBe('shared');
      expect(result.warnings.join('\n')).not.toContain('conditional');
      expectEditorImports(
        result.moduleFiles('conditional'),
        `import { value, type Condition } from "conditional"; const v: "shared" = value; const c: Condition = "${expected}";`,
      );
    });

    it('skips inactive nested conditions before selecting shared-target declarations', async () => {
      const result = await buildFixture(
        {
          'node_modules/conditional/package.json': JSON.stringify({
            name: 'conditional',
            exports: {
              node: { inactive: { types: './inactive.d.ts', default: './shared.js' } },
              default: { types: './browser.d.ts', default: './shared.js' },
            },
          }),
          'node_modules/conditional/shared.js': 'exports.value = "browser";',
          'node_modules/conditional/inactive.d.ts': 'export declare const value: "inactive";',
          'node_modules/conditional/browser.d.ts': 'export declare const value: "browser";',
        },
        () => ({
          options: { modules: ['conditional'] },
          resolve: { conditionNames: ['node'] },
        }),
      );

      expect((await result.runtime.moduleLoaders.conditional()).value).toBe('browser');
      expectEditorImports(
        result.moduleFiles('conditional'),
        'import { value } from "conditional"; const v: "browser" = value;',
      );
    });

    it('uses effective conditions inside types metadata', async () => {
      const result = await buildFixture(
        {
          'node_modules/conditional/package.json': JSON.stringify({
            name: 'conditional',
            exports: {
              types: { node: './node.d.ts', default: './browser.d.ts' },
              default: './shared.js',
            },
          }),
          'node_modules/conditional/shared.js': 'exports.value = "node";',
          'node_modules/conditional/node.d.ts': 'export declare const value: "node";',
          'node_modules/conditional/browser.d.ts': 'export declare const value: "browser";',
        },
        () => ({
          options: { modules: ['conditional'] },
          resolve: { conditionNames: ['node'] },
        }),
      );

      expectEditorImports(
        result.moduleFiles('conditional'),
        'import { value } from "conditional"; const v: "node" = value;',
      );
    });

    it('matches export-array fallbacks after inactive conditions', async () => {
      const result = await buildFixture(
        {
          'node_modules/conditional/package.json': JSON.stringify({
            name: 'conditional',
            exports: {
              node: [
                { inactive: { types: './inactive.d.ts', default: './shared.js' } },
                { types: './node.d.ts', default: './shared.js' },
              ],
              default: { types: './browser.d.ts', default: './shared.js' },
            },
          }),
          'node_modules/conditional/shared.js': 'exports.value = "node";',
          'node_modules/conditional/inactive.d.ts': 'export declare const value: "inactive";',
          'node_modules/conditional/node.d.ts': 'export declare const value: "node";',
          'node_modules/conditional/browser.d.ts': 'export declare const value: "browser";',
        },
        () => ({
          options: { modules: ['conditional'] },
          resolve: { conditionNames: ['node'] },
        }),
      );

      expect((await result.runtime.moduleLoaders.conditional()).value).toBe('node');
      expectEditorImports(
        result.moduleFiles('conditional'),
        'import { value } from "conditional"; const v: "node" = value;',
      );
    });

    it.each<{
      subpath: string;
      versioned: boolean;
      wildcard: boolean;
      extension: 'js' | 'mjs' | 'cjs';
      exactVersion?: boolean;
    }>([
      { subpath: '', versioned: false, wildcard: false, extension: 'js' },
      { subpath: 'button', versioned: false, wildcard: false, extension: 'js' },
      { subpath: 'button', versioned: true, wildcard: false, extension: 'js' },
      { subpath: 'button', versioned: true, wildcard: false, extension: 'js', exactVersion: true },
      { subpath: 'button', versioned: false, wildcard: true, extension: 'js' },
      { subpath: '', versioned: false, wildcard: false, extension: 'mjs' },
      { subpath: '', versioned: false, wildcard: false, extension: 'cjs' },
    ])(
      'resolves adjacent declarations for matched exports ($subpath, .$extension, versioned=$versioned, exact=$exactVersion, wildcard=$wildcard)',
      async ({ subpath, versioned, wildcard, extension, exactVersion }) => {
        const entry = subpath || 'index';
        const target = wildcard ? '*' : entry;
        const declarationExtension = extension === 'mjs' ? 'mts' : extension === 'cjs' ? 'cts' : 'ts';
        const specifier = `conditional${subpath ? `/${subpath}` : ''}`;
        const conditions = { node: `./node/${target}.${extension}`, default: `./browser/${target}.${extension}` };
        const result = await buildFixture(
          {
            'node_modules/conditional/package.json': JSON.stringify({
              name: 'conditional',
              types: './metadata.d.ts',
              ...(versioned && {
                typesVersions: {
                  '<99.0.0': exactVersion
                    ? {
                        [`node/${entry}.d.${declarationExtension}`]: [`legacy/node/${entry}.d.${declarationExtension}`],
                      }
                    : { '*': ['legacy/*'] },
                },
              }),
              exports: subpath ? { [`./${wildcard ? '*' : subpath}`]: conditions } : conditions,
            }),
            [`node_modules/conditional/node/${entry}.${extension}`]:
              extension === 'mjs' ? 'export const value = "node";' : 'exports.value = "node";',
            [`node_modules/conditional/node/${entry}.d.${declarationExtension}`]: `export declare const value: "${
              versioned ? 'modern' : 'node'
            }";`,
            [`node_modules/conditional/legacy/node/${entry}.d.${declarationExtension}`]:
              'export declare const value: "node";',
            [`node_modules/conditional/browser/${entry}.${extension}`]:
              extension === 'mjs' ? 'export const value = "browser";' : 'exports.value = "browser";',
            [`node_modules/conditional/browser/${entry}.d.${declarationExtension}`]:
              'export declare const value: "browser";',
            'node_modules/conditional/metadata.d.ts': 'export declare const value: "metadata";',
          },
          () => ({
            options: { modules: [specifier] },
            resolve: { conditionNames: ['node'] },
          }),
        );

        expect((await result.runtime.moduleLoaders[specifier]()).value).toBe('node');
        expect(result.warnings.join('\n')).not.toContain('conditional');
        expectEditorImports(
          result.moduleFiles(specifier),
          `import { value } from "${specifier}"; const v: "node" = value;`,
        );
      },
    );

    it('falls back to package metadata when a matched export has no adjacent declarations', async () => {
      const result = await buildFixture(
        {
          'node_modules/conditional/package.json': JSON.stringify({
            name: 'conditional',
            types: './dist/index.d.ts',
            exports: { node: './node.js', default: './browser.js' },
          }),
          'node_modules/conditional/node.js': 'exports.value = "node";',
          'node_modules/conditional/browser.js': 'exports.value = "browser";',
          'node_modules/conditional/dist/index.d.ts': 'export declare const value: "node";',
        },
        () => ({
          options: { modules: ['conditional'] },
          resolve: { conditionNames: ['node'] },
        }),
      );

      expect(result.warnings.join('\n')).not.toContain('conditional');
      expectEditorImports(
        result.moduleFiles('conditional'),
        'import { value } from "conditional"; const v: "node" = value;',
      );
    });

    it.each(['main', 'module'])(
      'preserves package declaration metadata for a %s entry without exports',
      async field => {
        const result = await buildFixture(
          {
            'node_modules/metadata/package.json': JSON.stringify({
              name: 'metadata',
              [field]: './runtime.js',
              types: './dist/index.d.ts',
            }),
            'node_modules/metadata/runtime.js': 'exports.value = "metadata";',
            'node_modules/metadata/runtime.d.ts': 'export declare const value: "adjacent";',
            'node_modules/metadata/dist/index.d.ts': 'export declare const value: "metadata";',
          },
          () => ({ options: { modules: ['metadata'] } }),
        );

        expect((await result.runtime.moduleLoaders.metadata()).value).toBe('metadata');
        expectEditorImports(
          result.moduleFiles('metadata'),
          'import { value } from "metadata"; const v: "metadata" = value;',
        );
      },
    );

    it('prefers the requested export when root and subpath declarations share a runtime target', async () => {
      const result = await buildFixture(
        {
          'node_modules/ui/package.json': JSON.stringify({
            name: 'ui',
            exports: {
              '.': { types: './dist/root.d.ts', default: './index.js' },
              './button': { types: './dist/button.d.ts', default: './index.js' },
            },
          }),
          'node_modules/ui/index.js': 'exports.root = "root"; exports.button = "button";',
          'node_modules/ui/dist/root.d.ts': 'export declare const root: "root";',
          'node_modules/ui/dist/button.d.ts': 'export declare const button: "button";',
        },
        () => ({ options: { modules: ['ui', 'ui/button'] } }),
      );

      expect((await result.runtime.moduleLoaders['ui/button']()).button).toBe('button');
      expectEditorImports(
        { ...result.moduleFiles('ui'), ...result.moduleFiles('ui/button') },
        'import { root } from "ui"; import { button } from "ui/button"; ' +
          'const rootValue: "root" = root; const buttonValue: "button" = button;',
      );
    });

    it.each([false, true])(
      'prefers exact exports over overlapping wildcards regardless of key order (reversed=%s)',
      async reversed => {
        const entries = [
          ['./*', { types: './dist/wildcard.d.ts', default: './lib/*.js' }],
          ['./button', { types: './dist/exact.d.ts', default: './lib/button.js' }],
        ];
        const result = await buildFixture(
          {
            'node_modules/overlap/package.json': JSON.stringify({
              name: 'overlap',
              exports: Object.fromEntries(reversed ? entries.reverse() : entries),
            }),
            'node_modules/overlap/lib/button.js': 'exports.value = "runtime";',
            'node_modules/overlap/dist/wildcard.d.ts':
              'export declare const value: "runtime"; export type Selection = "wildcard";',
            'node_modules/overlap/dist/exact.d.ts':
              'export declare const value: "runtime"; export type Selection = "exact";',
          },
          () => ({ options: { modules: ['overlap/button'] } }),
        );

        expect((await result.runtime.moduleLoaders['overlap/button']()).value).toBe('runtime');
        expectEditorImports(
          result.moduleFiles('overlap/button'),
          'import { value, type Selection } from "overlap/button"; ' +
            'const v: "runtime" = value; const selection: Selection = "exact";',
        );
      },
    );

    it.each(
      [
        {
          name: 'longer prefix',
          subpath: 'controls/button',
          broad: ['./*', './lib/*.js'],
          specific: ['./controls/*', './lib/controls/*.js'],
        },
        {
          name: 'longer suffix',
          subpath: 'controls/button.js',
          broad: ['./controls/*', './lib/controls/*'],
          specific: ['./controls/*.js', './lib/controls/*.js'],
        },
        {
          name: 'prefix before suffix',
          subpath: 'controls/button.js',
          broad: ['./*.js', './lib/*.js'],
          specific: ['./controls/*', './lib/controls/*'],
        },
      ].flatMap(fixture => [false, true].map(reversed => ({ ...fixture, reversed }))),
    )('honors wildcard specificity: $name (reversed=$reversed)', async ({ subpath, broad, specific, reversed }) => {
      const entries = [
        [broad[0], { types: './dist/broad.d.ts', default: broad[1] }],
        [specific[0], { types: './dist/specific.d.ts', default: specific[1] }],
      ];
      const specifier = `overlap/${subpath}`;
      const result = await buildFixture(
        {
          'node_modules/overlap/package.json': JSON.stringify({
            name: 'overlap',
            exports: Object.fromEntries(reversed ? entries.reverse() : entries),
          }),
          'node_modules/overlap/lib/controls/button.js': 'exports.value = "runtime";',
          'node_modules/overlap/dist/broad.d.ts':
            'export declare const value: "runtime"; export type Selection = "broad";',
          'node_modules/overlap/dist/specific.d.ts':
            'export declare const value: "runtime"; export type Selection = "specific";',
        },
        () => ({ options: { modules: [specifier] } }),
      );

      expect((await result.runtime.moduleLoaders[specifier]()).value).toBe('runtime');
      expectEditorImports(
        result.moduleFiles(specifier),
        `import { value, type Selection } from "${specifier}"; ` +
          'const v: "runtime" = value; const selection: Selection = "specific";',
      );
    });

    it('substitutes requested wildcard captures when exports share a static runtime target', async () => {
      const result = await buildFixture(
        {
          'node_modules/overlap/package.json': JSON.stringify({
            name: 'overlap',
            exports: {
              './*': { types: './dist/broad.d.ts', default: './shared.js' },
              './controls/*': { types: './dist/*.d.ts', default: './shared.js' },
            },
          }),
          'node_modules/overlap/shared.js': 'exports.value = "runtime";',
          'node_modules/overlap/dist/broad.d.ts':
            'export declare const value: "runtime"; export type Selection = "broad";',
          'node_modules/overlap/dist/button.d.ts':
            'export declare const value: "runtime"; export type Selection = "button";',
        },
        () => ({ options: { modules: ['overlap/controls/button'] } }),
      );

      expectEditorImports(
        result.moduleFiles('overlap/controls/button'),
        'import { value, type Selection } from "overlap/controls/button"; ' +
          'const v: "runtime" = value; const selection: Selection = "button";',
      );
    });

    it.each([
      ['mts', 'export declare const value: "actual";', 'import { value } from "public-ui"; const v: "actual" = value;'],
      ['cts', 'export declare const value: "actual";', 'import { value } from "public-ui"; const v: "actual" = value;'],
      [
        'mts',
        'declare const value: "actual"; export default value;',
        'import value from "public-ui"; const v: "actual" = value;',
      ],
      [
        'cts',
        'declare const entry: { value: "actual" }; export = entry;',
        'import entry = require("public-ui"); const v: "actual" = entry.value;',
      ],
    ])('resolves public aliases to .d.%s declarations in the editor (%s)', async (extension, declaration, source) => {
      const result = await buildFixture(
        {
          'node_modules/actual/package.json': JSON.stringify({
            name: 'actual',
            exports: { '.': { types: `./dist/index.d.${extension}`, default: './index.js' } },
          }),
          'node_modules/actual/index.js': 'exports.value = "actual";',
          [`node_modules/actual/dist/index.d.${extension}`]: declaration,
        },
        () => ({ options: { modules: { 'public-ui': 'actual' } } }),
      );

      expect((await result.runtime.moduleLoaders['public-ui']()).value).toBe('actual');
      expectEditorImports(result.moduleFiles('public-ui'), source);
    });

    it('preserves global-only declarations through virtual entries', async () => {
      const result = await buildFixture(
        {
          'node_modules/global-types/package.json': JSON.stringify({ name: 'global-types', types: './index.d.ts' }),
          'node_modules/global-types/index.d.ts': 'declare interface SharedGlobal { version: "global"; }',
        },
        () => ({ options: { modules: [], typings: ['global-types'] } }),
      );

      expectEditorImports(result.base, 'import "global-types"; const value: SharedGlobal = { version: "global" };');
    });

    it.each([
      ['conditional', 'conditional/button'],
      ['conditional/button', 'conditional'],
    ])('preserves physical declarations for root and subpath collisions (%s first)', async (...modules) => {
      const rootDeclarations = 'export declare const rootShared: "root";';
      const buttonDeclarations = 'export declare const buttonShared: "button";';
      const result = await buildFixture(
        {
          'node_modules/conditional/package.json': JSON.stringify({
            name: 'conditional',
            types: './index.d.ts',
            exports: {
              '.': {
                node: { types: './node.d.ts', default: './node.js' },
                default: { types: './index.d.ts', default: './browser.js' },
              },
              './button': {
                node: { types: './node-button.d.ts', default: './button.js' },
                default: { types: './button.d.ts', default: './browser.js' },
              },
            },
          }),
          'node_modules/conditional/node.js': 'exports.rootShared = "root"; exports.selected = "node";',
          'node_modules/conditional/node.d.ts': 'export * from "./index"; export declare const selected: "node";',
          'node_modules/conditional/index.d.ts': rootDeclarations,
          'node_modules/conditional/button.js': 'exports.buttonShared = "button"; exports.selected = "node-button";',
          'node_modules/conditional/node-button.d.ts':
            'export * from "./button"; export declare const selected: "node-button";',
          'node_modules/conditional/button.d.ts': buttonDeclarations,
          'node_modules/conditional/browser.js': 'exports.selected = "browser";',
        },
        () => ({ options: { modules }, resolve: { conditionNames: ['node', 'default'] } }),
      );

      const files = { ...result.moduleFiles('conditional'), ...result.moduleFiles('conditional/button') };
      expect(files['file:///node_modules/conditional/index.d.ts']).toBe(rootDeclarations);
      expect(files['file:///node_modules/conditional/button.d.ts']).toBe(buttonDeclarations);
      expect(result.warnings.join('\n')).not.toContain('conditional');
      expectEditorImports(
        files,
        'import { rootShared, selected } from "conditional"; ' +
          'import { buttonShared, selected as buttonSelected } from "conditional/button"; ' +
          'const rootValue: "root" = rootShared; const rootSelected: "node" = selected; ' +
          'const buttonValue: "button" = buttonShared; const selectedButton: "node-button" = buttonSelected;',
      );
    });

    it('uses wildcard runtime export metadata for a configured package subpath', async () => {
      const result = await buildFixture(
        {
          'node_modules/wildcard/package.json': JSON.stringify({
            name: 'wildcard',
            exports: { './*': { types: './dist/*.d.ts', default: './lib/*.js' } },
          }),
          'node_modules/wildcard/lib/button.js': 'exports.value = "wildcard";',
          'node_modules/wildcard/dist/button.d.ts': 'export declare const value: "wildcard";',
        },
        () => ({ options: { modules: ['wildcard/button'] } }),
      );

      expect((await result.runtime.moduleLoaders['wildcard/button']()).value).toBe('wildcard');
      expectEditorImports(
        result.moduleFiles('wildcard/button'),
        'import { value } from "wildcard/button"; const result: "wildcard" = value;',
      );
    });

    it('applies Monaco typesVersions to declaration-only packages resolved by webpack', async () => {
      const result = await buildFixture(
        {
          'node_modules/types-only/package.json': JSON.stringify({
            name: 'types-only',
            types: './index.d.ts',
            typesVersions: { '<99.0.0': { '*': ['legacy/*'] } },
          }),
          'node_modules/types-only/index.d.ts': 'export type Value = "modern";',
          'node_modules/types-only/legacy/index.d.ts': 'export type Value = "legacy";',
        },
        () => ({ options: { modules: [], typings: ['types-only'] } }),
      );

      expect(result.base['file:///node_modules/types-only/index.d.ts']).toBeUndefined();
      expect(result.base['file:///node_modules/types-only/legacy/index.d.ts']).toContain('"legacy"');
      expectEditorImports(result.base, 'import type { Value } from "types-only"; const value: Value = "legacy";');
    });

    it('accepts explicit package roots for declaration-only entries without making them runtime modules', async () => {
      const result = await buildFixture(
        {
          'packages/types/package.json': JSON.stringify({ name: 'physical-types', types: './dist/index.d.ts' }),
          'packages/types/dist/index.d.ts': 'export type Value = "root";',
        },
        () => ({
          options: {
            modules: [],
            typings: ['public-types'],
            typingsRoots: { 'public-types': '../packages/types' },
          },
        }),
      );

      expect(result.base['file:///node_modules/physical-types/dist/index.d.ts']).toContain('"root"');
      expect(result.manifest.allowedModules).not.toContain('public-types');
      expectEditorImports(result.base, 'import type { Value } from "public-types"; const value: Value = "root";');
    });
  });

  it('splits declarations into always-loaded React typings and per-module additions', async () => {
    const typings = await collectConfiguredTypings(
      { modules: { compression: 'lz-string', react: 'react' } },
      { configDir: path.resolve(__dirname, '..') },
      '4.5.5',
    );
    const baseFiles = Object.keys(typings.base);

    expect(typings.missing).toEqual([]);
    expect(baseFiles.some(file => file.startsWith('file:///node_modules/@types/react/'))).toBe(true);
    expect(typings.modules.react).toEqual({ files: {}, usesShared: false });
    const compression = typings.modules.compression.files;
    expect(compression['file:///playground-typings/compression/root.d.ts']).toContain('lz-string');
    expect(Object.keys(compression).some(file => file.includes('/lz-string/'))).toBe(true);
    expect(Object.keys(compression).filter(file => baseFiles.includes(file))).toEqual([]);
  });

  it('moves declarations needed by several modules into a shared file', async () => {
    const typings = await collectConfiguredTypings(
      { modules: { first: 'lz-string', second: 'lz-string', react: 'react' } },
      { configDir: path.resolve(__dirname, '..') },
      '4.5.5',
    );

    expect(Object.keys(typings.shared).some(file => file.includes('/lz-string/'))).toBe(true);
    expect(typings.modules.first.usesShared).toBe(true);
    expect(Object.keys(typings.modules.first.files)).toEqual([
      'file:///playground-typings/first/root.d.ts',
      'file:///node_modules/first/package.json',
    ]);
    expect(typings.modules.react.usesShared).toBe(false);
  });
});

describe('PlaygroundRuntimeManifestPlugin', () => {
  type Typings = Awaited<ReturnType<typeof collectConfiguredTypings>>;

  it.each([false, true])(
    'supports extracted eager/lazy CSS and emitted fonts without changing native assets (inlineStyles: %s)',
    async inlineStyles => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playground-css-manifest-'));
      fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ private: true, sideEffects: false }));
      fs.writeFileSync(
        path.join(root, 'entry.js'),
        'import "./vendor.css"; import "./eager.css"; import("./lazy.js");',
      );
      fs.writeFileSync(path.join(root, 'lazy.js'), 'import "./lazy.css"; export const value = 1;');
      fs.writeFileSync(path.join(root, 'vendor.css'), '.cascade { text-decoration-line: overline; }');
      fs.writeFileSync(
        path.join(root, 'eager.css'),
        '@font-face { font-family: Fixture; src: url("./fixture.woff2"); } .cascade { text-decoration-line: underline; }',
      );
      fs.writeFileSync(path.join(root, 'lazy.css'), '.lazy { font-family: Fixture; }');
      fs.writeFileSync(path.join(root, 'fixture.woff2'), Buffer.from('emitted font'));
      const compiler = webpack({
        mode: 'production',
        devtool: false,
        context: root,
        entry: { [ENTRY_NAME]: './entry.js' },
        output: {
          path: path.join(root, 'out'),
          publicPath: 'auto',
          filename: '[name].[contenthash].js',
          assetModuleFilename: 'assets/[name].[contenthash][ext]',
        },
        optimization: {
          minimize: false,
          splitChunks: {
            cacheGroups: {
              vendor: {
                name: 'vendor',
                type: 'css/mini-extract',
                test: /[\\/]vendor\.css$/,
                chunks: 'all',
                enforce: true,
              },
            },
          },
        },
        module: {
          rules: [
            { test: /\.css$/, sideEffects: true, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.woff2$/, type: 'asset/resource' },
          ],
        },
        resolveLoader: { modules: [path.resolve(__dirname, '../../../../node_modules')] },
        plugins: [
          new MiniCssExtractPlugin({ filename: 'styles/[name].[contenthash].css' }),
          new PlaygroundRuntimeManifestPlugin({ modules: {}, inlineStyles }, () => ({
            base: {},
            shared: {},
            modules: {},
            sources: [],
            missing: [],
          })),
        ],
      });

      try {
        const stats = await new Promise<webpack.Stats>((resolve, reject) => {
          compiler.run((error, result) => (error || !result ? reject(error) : resolve(result)));
        });
        expect(stats.toString('errors-only')).toBe('');
        const manifest = JSON.parse(fs.readFileSync(path.join(root, 'out/playground/runtime/manifest.json'), 'utf8'));
        const emittedCss = stats.compilation.getAssets().filter(asset => asset.name.endsWith('.css'));
        const emittedSources = emittedCss.map(asset => fs.readFileSync(path.join(root, 'out', asset.name), 'utf8'));
        expect(emittedCss).toHaveLength(3);
        const eagerStyles = stats.compilation.entrypoints
          .get(ENTRY_NAME)!
          .getFiles()
          .filter(file => file.endsWith('.css'));
        expect(eagerStyles).toHaveLength(2);
        expect(eagerStyles[0]).toContain('vendor.');
        expect(eagerStyles[1]).toContain(ENTRY_NAME);
        expect(emittedSources.some(source => source.includes('.woff2'))).toBe(true);
        expect(emittedSources.every(source => !source.includes('data:font/'))).toBe(true);
        if (inlineStyles) {
          expect(manifest.styles).toEqual([]);
          expect(
            manifest.inlineStyles.slice(0, eagerStyles.length).map((style: { href: string }) => style.href),
          ).toEqual(eagerStyles);
          expect(manifest.inlineStyles.map((style: { href: string }) => style.href).sort()).toEqual(
            emittedCss.map(asset => asset.name).sort(),
          );
          expect(JSON.stringify(manifest.inlineStyles)).toContain(
            `data:font/woff2;base64,${Buffer.from('emitted font').toString('base64')}`,
          );
        } else {
          expect(manifest.styles).toEqual(eagerStyles);
          expect(manifest.inlineStyles).toBeUndefined();
        }
      } finally {
        await new Promise<void>((resolve, reject) => {
          compiler.close(error => (error ? reject(error) : resolve()));
        });
        fs.rmSync(root, { recursive: true, force: true });
      }
    },
  );

  const setup = () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playground-manifest-'));
    const entry = path.join(root, 'entry.js');
    const declaration = path.join(root, 'module.d.ts');
    fs.writeFileSync(entry, 'export const value = 1;');
    fs.writeFileSync(declaration, 'export declare const version: 1;');
    // Watchers treat files written just before watching starts as changed; age the fixtures.
    const past = new Date(Date.now() - 60_000);
    [entry, declaration].forEach(file => fs.utimesSync(file, past, past));
    const collect = jest.fn(
      (): Typings => ({
        base: { 'file:///node_modules/module/index.d.ts': fs.readFileSync(declaration, 'utf8') },
        shared: {},
        modules: {},
        sources: [declaration],
        missing: ['@types/react-dom'],
      }),
    );
    const compiler = webpack({
      mode: 'development',
      devtool: false,
      context: root,
      entry: { [ENTRY_NAME]: entry },
      output: { path: path.join(root, 'out') },
      plugins: [new PlaygroundRuntimeManifestPlugin({ modules: {} }, collect)],
    });
    const readTypings = () => {
      const manifest = JSON.parse(fs.readFileSync(path.join(root, 'out/playground/runtime/manifest.json'), 'utf8'));
      return JSON.parse(fs.readFileSync(path.join(root, 'out', manifest.typings), 'utf8'));
    };
    const cleanup = async () => {
      await new Promise<void>((resolve, reject) => {
        compiler.close(error => (error ? reject(error) : resolve()));
      });
      fs.rmSync(root, { recursive: true, force: true });
    };
    return { compiler, collect, entry, declaration, readTypings, cleanup };
  };

  it('reports missing typings as a warning and still emits the manifest', async () => {
    const { compiler, readTypings, cleanup } = setup();
    try {
      const stats = await new Promise<webpack.Stats>((resolve, reject) => {
        compiler.run((error, result) => (error || !result ? reject(error) : resolve(result)));
      });

      expect(stats.hasErrors()).toBe(false);
      expect(stats.compilation.warnings.map(warning => warning.message)).toEqual([
        expect.stringContaining('Playground typings could not resolve: "@types/react-dom"'),
      ]);
      expect(readTypings()['file:///node_modules/module/index.d.ts']).toContain('version: 1');
    } finally {
      await cleanup();
    }
  });

  it('recollects typings only when a watched declaration source changes', async () => {
    const { compiler, collect, entry, declaration, readTypings, cleanup } = setup();
    const builds: Array<() => void> = [];
    const nextBuild = () =>
      new Promise<void>(resolve => {
        builds.push(resolve);
      });
    let watching: ReturnType<typeof compiler.watch> | undefined;
    try {
      let build = nextBuild();
      watching = compiler.watch({ aggregateTimeout: 10 }, error => {
        if (error) {
          throw error;
        }
        builds.shift()?.();
      });
      await build;
      expect(collect).toHaveBeenCalledTimes(1);

      build = nextBuild();
      fs.writeFileSync(entry, 'export const value = 2;');
      await build;
      expect(collect).toHaveBeenCalledTimes(1);

      build = nextBuild();
      fs.writeFileSync(declaration, 'export declare const version: 2;');
      await build;
      expect(collect).toHaveBeenCalledTimes(2);
      expect(readTypings()['file:///node_modules/module/index.d.ts']).toContain('version: 2');
    } finally {
      await new Promise<void>(resolve => {
        if (watching) {
          watching.close(() => resolve());
        } else {
          resolve();
        }
      });
      await cleanup();
    }
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
  it.each([false, true])('accepts package lists with lazy modules set to %s', lazyModules => {
    expect(
      buildRuntimeEntrySource(
        { modules: ['@fluentui/react-components', '@fluentui/react-icons'], setup: '/abs/setup.tsx' },
        lazyModules,
      ),
    ).toBe(
      buildRuntimeEntrySource(
        {
          modules: {
            '@fluentui/react-components': '@fluentui/react-components',
            '@fluentui/react-icons': '@fluentui/react-icons',
          },
          setup: '/abs/setup.tsx',
        },
        lazyModules,
      ),
    );
  });

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
      '"icons": () => import(/* webpackChunkName: "playground-module-0" */ "@fluentui\\u002Freact-icons")',
    );
    expect(source).toContain(
      '"button": () => import(/* webpackChunkName: "playground-module-1" */ "@fluentui\\u002Freact-headless-components-preview\\u002Fbutton")',
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
      '"@fluentui\\u002Freact-components": () => import(/* webpackMode: "eager" */ "@fluentui\\u002Freact-components")',
    );
    expect(source).toContain(
      '"@fluentui\\u002Freact-icons": () => import(/* webpackMode: "eager" */ "@fluentui\\u002Freact-icons")',
    );
    expect(source).toContain('const allowedModules = Object.freeze(Object.keys(moduleLoaders));');
    expect(source).toContain('allowedModules,');
    expect(source).not.toContain('import * as __pg_mod_');
  });

  it('escapes configured values so they cannot break out of the generated source', () => {
    const source = buildRuntimeEntrySource(
      { modules: { 'evil*/</script>\u2028': 'pkg"*/\n' }, setup: '/abs/setup.tsx' },
      true,
    );

    expect(source).toContain(
      '"evil*\\u002F\\u003C\\u002Fscript\\u003E\\u2028": () => import(/* webpackChunkName: "playground-module-0" */ "pkg\\"*\\u002F\\n")',
    );
    expect(source).toContain('import * as setupModule from "\\u002Fabs\\u002Fsetup.tsx";');
    expect(source).not.toMatch(/[\u2028\u2029]/);
  });
});
