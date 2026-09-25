import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

import type { PresetConfig } from './public-types';

type WebpackFinalFn = NonNullable<import('@storybook/react-webpack5').StorybookConfig['webpackFinal']>;
type WebpackFinalConfig = Parameters<WebpackFinalFn>[0];
type WebpackFinalOptions = Parameters<WebpackFinalFn>[1];
type CollectTypingsResult = {
  files: Record<string, string>;
  sources: string[];
  missing: string[];
};
type HtmlAssetsData = {
  assets: {
    js: string[];
    css: string[];
  };
};
type EntrypointFiles = {
  getFiles(): string[];
};
export type HtmlWebpackPluginConstructor = {
  getHooks(compilation: import('webpack').Compilation): {
    beforeAssetTagGeneration: {
      tap(name: string, callback: (data: HtmlAssetsData) => HtmlAssetsData): void;
    };
  };
};

export const ENTRY_NAME = 'playground-runtime';
export const REGISTER_CALLBACK = '__FLUENTUI_PLAYGROUND_REGISTER_V1__';
const STALE_RUNTIME_ENTRY_MS = 24 * 60 * 60 * 1000;

const addonFilePattern = /react-storybook-addon-playground[\\/][a-z\\/]+\.[jt]s$/;
const defaultOptions: PresetConfig = {
  modules: {},
};

const { collectTypings, getMonacoTypeScriptVersion: readMonacoTypeScriptVersion } =
  require('../tools/collect-typings') as {
    collectTypings(options: {
      packageRoot: string;
      entries: string[];
      typescriptVersion: string;
    }): CollectTypingsResult;
    getMonacoTypeScriptVersion(): string;
  };

/**
 * Storybook preset hook: emits a separate Webpack entry for the playground runtime (configured modules + setup),
 * collects Monaco typings for those modules, and writes `playground/runtime/manifest.json`.
 */
export function webpackFinal(config: WebpackFinalConfig, options: WebpackFinalOptions): WebpackFinalConfig {
  const addonOptions = getAddonOptions(options);
  const runtimeEntry = writeRuntimeEntry(
    addonOptions,
    options.configDir ?? process.cwd(),
    options.configType === 'PRODUCTION',
  );
  const typings = collectConfiguredTypings(addonOptions, options);
  const originalEntry = config.entry;

  config.entry = async (): Promise<import('webpack').EntryObject> => {
    const entry = typeof originalEntry === 'function' ? await originalEntry() : originalEntry;
    const normalizedEntry: import('webpack').EntryObject =
      !entry || typeof entry === 'string' || Array.isArray(entry) ? { main: entry ?? [] } : entry;

    return {
      ...normalizedEntry,
      [ENTRY_NAME]: runtimeEntry,
    };
  };

  config.plugins = config.plugins ?? [];
  config.plugins.push(new ExcludeRuntimeEntryFromHtmlPlugin());
  config.plugins.push(new PlaygroundRuntimeManifestPlugin(addonOptions, typings));

  return config;
}

/**
 * Storybook injects every Webpack entry into `iframe.html` by default. The playground runtime must only load inside
 * the sandboxed preview iframe.
 */
class ExcludeRuntimeEntryFromHtmlPlugin {
  public apply(compiler: import('webpack').Compiler): void {
    const pluginName = 'ExcludePlaygroundRuntimeFromHtmlPlugin';
    const htmlPluginConstructors = findHtmlWebpackPluginConstructors(compiler.options.plugins);

    compiler.hooks.compilation.tap(pluginName, compilation => {
      if (htmlPluginConstructors.length === 0) {
        compilation.warnings.push(
          new compiler.webpack.WebpackError(
            'Playground: HtmlWebpackPlugin was not found, so the playground runtime entry may be injected into ' +
              'Storybook pages. Please report this with your Storybook and html-webpack-plugin versions.',
          ),
        );
        return;
      }

      htmlPluginConstructors.forEach(htmlPluginConstructor => {
        htmlPluginConstructor.getHooks(compilation).beforeAssetTagGeneration.tap(pluginName, data => {
          return filterRuntimeEntryAssets(compilation.entrypoints, data);
        });
      });
    });
  }
}

/**
 * Finds the constructors of HtmlWebpackPlugin instances by their static `getHooks` API rather than only by class name,
 * which can differ when the plugin is bundled, subclassed or wrapped.
 */
export function findHtmlWebpackPluginConstructors(plugins: ReadonlyArray<unknown>): HtmlWebpackPluginConstructor[] {
  const constructors = new Set<HtmlWebpackPluginConstructor>();
  for (const plugin of plugins) {
    const constructor = (plugin as { constructor?: Partial<HtmlWebpackPluginConstructor> & { name?: string } } | null)
      ?.constructor;
    if (
      typeof constructor?.getHooks === 'function' &&
      (/HtmlWebpackPlugin/.test(constructor.name ?? '') || 'userOptions' in (plugin as object))
    ) {
      constructors.add(constructor as HtmlWebpackPluginConstructor);
    }
  }

  return Array.from(constructors);
}

export function filterRuntimeEntryAssets(
  entrypoints: ReadonlyMap<string, EntrypointFiles>,
  data: HtmlAssetsData,
): HtmlAssetsData {
  const runtimeFiles = new Set(entrypoints.get(ENTRY_NAME)?.getFiles() ?? []);
  const otherEntryFiles = new Set(
    Array.from(entrypoints.entries()).flatMap(([name, entrypoint]) =>
      name === ENTRY_NAME ? [] : entrypoint.getFiles(),
    ),
  );
  const exclusiveRuntimeFiles = Array.from(runtimeFiles).filter(file => !otherEntryFiles.has(file));

  data.assets.js = data.assets.js.filter(asset => !matchesAnyAsset(asset, exclusiveRuntimeFiles));
  data.assets.css = data.assets.css.filter(asset => !matchesAnyAsset(asset, exclusiveRuntimeFiles));

  return data;
}

function matchesAnyAsset(assetUrl: string, assetFiles: string[]): boolean {
  const normalizedUrl = assetUrl.split(/[?#]/, 1)[0].replace(/\\/g, '/');

  return assetFiles.some(file => {
    const normalizedFile = file.replace(/\\/g, '/');
    return normalizedUrl === normalizedFile || normalizedUrl.endsWith(`/${normalizedFile}`);
  });
}

/**
 * Storybook merges an addon's registration options into the options of its preset hooks. Older Storybook versions
 * only expose them through `presetsList`, which is used as a fallback.
 */
export function getAddonOptions(options: WebpackFinalOptions): PresetConfig {
  const direct = options as WebpackFinalOptions & Partial<PresetConfig>;
  if (direct.modules && typeof direct.modules === 'object') {
    return { ...defaultOptions, modules: direct.modules, setup: direct.setup, typings: direct.typings };
  }

  const presetRegistration = options.presetsList?.find(preset => isPlaygroundAddonFile(preset.name));
  const addonOptions = presetRegistration?.options ?? {};

  return { ...defaultOptions, ...addonOptions };
}

export function isPlaygroundAddonFile(filePath: string): boolean {
  return addonFilePattern.test(filePath);
}

function getDefaultSetupPath(): string {
  // Compiled next to this file (`lib-commonjs/webpack.js` → `lib-commonjs/defaultSetup.js`)
  return require.resolve('./defaultSetup');
}

/**
 * Builds the playground runtime entry source.
 *
 * Production loads configured modules on demand so large packages (such as icons) do not execute on every run.
 * Development uses eager import() chunks: evaluation is still deferred until requested, but Webpack does not
 * create lazy-compilation proxies that need the separate-origin development server.
 */
export function buildRuntimeEntrySource(options: PresetConfig, lazyModules = false): string {
  const modules = Object.entries(options.modules);
  const setupPath = options.setup ?? getDefaultSetupPath();
  const moduleLoaders = modules
    .map(
      ([publicName, request], index) =>
        `${JSON.stringify(publicName)}: () => ${
          lazyModules
            ? `import(/* webpackChunkName: "playground-module-${index}" */ ${JSON.stringify(request)})`
            : `import(/* webpackMode: "eager" */ ${JSON.stringify(request)})`
        }`,
    )
    .join(',\n  ');

  return `
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactJsxRuntime from 'react/jsx-runtime';
import * as setupModule from ${JSON.stringify(setupPath)};
// This entry is \`.mjs\`: a default import of a CommonJS setup (such as the compiled default setup) would yield
// \`module.exports\` rather than its \`default\` export.
const setupExports = setupModule.default;
const setup = setupExports && setupExports.__esModule ? setupExports.default : setupExports;
const moduleLoaders = {
  react: () => Promise.resolve(React),
  'react/jsx-runtime': () => Promise.resolve(ReactJsxRuntime),
  'react-dom': () => Promise.resolve(ReactDOM),
  'react-dom/client': () => Promise.resolve(ReactDOMClient),
  ${moduleLoaders}
};
const allowedModules = Object.freeze(Object.keys(moduleLoaders));

const register = globalThis[${JSON.stringify(REGISTER_CALLBACK)}];
if (typeof register === 'function') {
  register({
    React,
    allowedModules,
    createRoot: ReactDOMClient.createRoot,
    moduleLoaders,
    setup,
  });
}
`.trimStart();
}

/**
 * Directory for the generated runtime entry: `node_modules/.cache` next to the Storybook config (like other build
 * caches), scoped by config directory so several Storybooks can share one `node_modules`.
 */
export function getRuntimeEntryDirectory(configDir: string): string {
  const scope = crypto.createHash('sha256').update(path.resolve(configDir)).digest('hex').slice(0, 8);
  for (let directory = path.resolve(configDir); ; directory = path.dirname(directory)) {
    const nodeModules = path.join(directory, 'node_modules');
    if (fs.existsSync(nodeModules)) {
      return path.join(nodeModules, '.cache', 'fluentui-playground-runtime', scope);
    }
    if (path.dirname(directory) === directory) {
      return path.join(configDir, '.cache', 'fluentui-playground-runtime');
    }
  }
}

function writeRuntimeEntry(options: PresetConfig, configDir: string, lazyModules: boolean): string {
  const source = buildRuntimeEntrySource(options, lazyModules);
  const hash = crypto.createHash('sha256').update(source).digest('hex').slice(0, 12);
  const directory = getRuntimeEntryDirectory(configDir);
  const fileName = `runtime-${hash}.mjs`;
  const filePath = path.join(directory, fileName);

  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filePath, source, 'utf8');
  // Entries left by earlier option sets. Only old files are removed: a concurrent dev server or build of the same
  // Storybook may still reference its own recent entry.
  const staleBefore = Date.now() - STALE_RUNTIME_ENTRY_MS;
  for (const staleFile of fs.readdirSync(directory)) {
    const stalePath = path.join(directory, staleFile);
    if (/^runtime-[\da-f]+\.mjs$/.test(staleFile) && staleFile !== fileName) {
      try {
        if (fs.statSync(stalePath).mtimeMs < staleBefore) {
          fs.rmSync(stalePath, { force: true });
        }
      } catch {
        // Another process removed it first.
      }
    }
  }

  return filePath;
}

export type ConfiguredTypings = {
  /** React typings plus `typings` addon option entries: always loaded. */
  base: Record<string, string>;
  /** Declarations needed by several configured modules, loaded with any of them. */
  shared: Record<string, string>;
  /** Per configured module (public name), its declarations beyond `base` and `shared`: loaded when code imports it. */
  modules: Record<string, { files: Record<string, string>; usesShared: boolean }>;
  sources: string[];
  missing: string[];
};

export function collectConfiguredTypings(
  options: PresetConfig,
  storybookOptions: Pick<WebpackFinalOptions, 'configDir'>,
  typescriptVersion = getMonacoTypeScriptVersion(),
): ConfiguredTypings {
  const packageRoot = storybookOptions.configDir ?? process.cwd();
  const base = collectTypings({
    packageRoot,
    entries: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', ...(options.typings ?? [])],
    typescriptVersion,
  });
  const sources = new Set(base.sources);
  const missing = new Set(base.missing);
  const collected: Record<string, Record<string, string>> = {};
  const usage = new Map<string, number>();

  for (const [publicName, request] of Object.entries(options.modules)) {
    const result = collectTypings({ packageRoot, entries: [request], typescriptVersion });
    const files: Record<string, string> = {};
    result.sources.forEach(source => sources.add(source));
    result.missing.forEach(value => missing.add(value));
    for (const [filePath, content] of Object.entries(result.files)) {
      if (!(filePath in base.files)) {
        files[filePath] = content;
        usage.set(filePath, (usage.get(filePath) ?? 0) + 1);
      }
    }

    if (publicName !== request) {
      files[`file:///node_modules/${publicName}/index.d.ts`] = `export * from ${JSON.stringify(
        request,
      )};\nexport { default } from ${JSON.stringify(request)};`;
      files[`file:///node_modules/${publicName}/package.json`] = JSON.stringify({
        name: publicName,
        types: './index.d.ts',
      });
    }

    collected[publicName] = files;
  }

  const shared: Record<string, string> = {};
  const modules: ConfiguredTypings['modules'] = {};
  for (const [publicName, files] of Object.entries(collected)) {
    const own: Record<string, string> = {};
    let usesShared = false;
    for (const [filePath, content] of Object.entries(files)) {
      if ((usage.get(filePath) ?? 0) > 1) {
        shared[filePath] = content;
        usesShared = true;
      } else {
        own[filePath] = content;
      }
    }
    modules[publicName] = { files: own, usesShared };
  }

  return { base: base.files, shared, modules, sources: Array.from(sources), missing: Array.from(missing) };
}

/**
 * The playground shell build records the TypeScript version of its bundled Monaco, so published installs do not need
 * `monaco-editor`. Monorepo development falls back to reading the installed `monaco-editor`.
 */
export function getMonacoTypeScriptVersion(
  metadataPath = path.join(__dirname, '..', 'dist', 'playground', 'playground-shell.json'),
): string {
  try {
    const { typescriptVersion } = JSON.parse(fs.readFileSync(metadataPath, 'utf8')) as { typescriptVersion?: unknown };
    if (typeof typescriptVersion === 'string' && /^\d+\.\d+\.\d+$/.test(typescriptVersion)) {
      return typescriptVersion;
    }
  } catch {
    // Not built yet: fall through.
  }

  return readMonacoTypeScriptVersion();
}

class PlaygroundRuntimeManifestPlugin {
  public constructor(private readonly options: PresetConfig, private readonly typings: ConfiguredTypings) {}

  public apply(compiler: import('webpack').Compiler): void {
    const pluginName = 'PlaygroundRuntimeManifestPlugin';
    const { Compilation, sources } = compiler.webpack;

    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      this.typings.sources.forEach(source => compilation.fileDependencies.add(source));

      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        () => {
          if (this.typings.missing.length > 0) {
            compilation.errors.push(
              new Error(
                `Playground typings could not resolve: ${this.typings.missing
                  .map(value => JSON.stringify(value))
                  .join(', ')}`,
              ),
            );
            return;
          }

          const entrypoint = compilation.entrypoints.get(ENTRY_NAME);
          if (!entrypoint) {
            compilation.errors.push(new Error(`Playground runtime entry "${ENTRY_NAME}" was not emitted.`));
            return;
          }

          const files = entrypoint.getFiles();
          const scripts = files.filter(file => /\.m?js($|\?)/.test(file) && !file.includes('.hot-update.'));
          const styles = files.filter(file => /\.css($|\?)/.test(file) && !file.includes('.hot-update.'));
          const emitTypings = (declarations: Record<string, string>) => {
            const json = JSON.stringify(declarations);
            const hash = crypto.createHash('sha256').update(json).digest('hex').slice(0, 12);
            const file = `playground/runtime/typings.${hash}.json`;
            compilation.emitAsset(file, new sources.RawSource(json));
            return file;
          };
          const typingsFile = emitTypings(this.typings.base);
          const sharedFile = Object.keys(this.typings.shared).length > 0 ? emitTypings(this.typings.shared) : null;
          const moduleTypings = Object.fromEntries(
            Object.entries(this.typings.modules).map(([publicName, { files: declarations, usesShared }]) => [
              publicName,
              [...(usesShared && sharedFile ? [sharedFile] : []), emitTypings(declarations)],
            ]),
          );
          const buildId = crypto
            .createHash('sha256')
            .update(JSON.stringify({ scripts, styles, modules: this.options.modules, typingsFile, moduleTypings }))
            .digest('hex')
            .slice(0, 12);

          compilation.emitAsset(
            'playground/runtime/manifest.json',
            new sources.RawSource(
              JSON.stringify(
                {
                  scripts,
                  styles,
                  typings: typingsFile,
                  moduleTypings,
                  allowedModules: [
                    'react',
                    'react/jsx-runtime',
                    'react-dom',
                    'react-dom/client',
                    ...Object.keys(this.options.modules),
                  ],
                  buildId,
                },
                null,
                2,
              ),
            ),
          );
        },
      );
    });
  }
}
