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
type HtmlWebpackPluginConstructor = {
  getHooks(compilation: import('webpack').Compilation): {
    beforeAssetTagGeneration: {
      tap(name: string, callback: (data: HtmlAssetsData) => HtmlAssetsData): void;
    };
  };
};

export const ENTRY_NAME = 'playground-runtime';
export const REGISTER_CALLBACK = '__FLUENTUI_PLAYGROUND_REGISTER_V1__';

const addonFilePattern = /react-storybook-addon-playground\/[a-z/]+.[jt]s$/;
const defaultOptions: PresetConfig = {
  modules: {},
};

const { collectTypings } = require('../tools/collect-typings') as {
  collectTypings(options: { packageRoot: string; entries: string[]; typescriptVersion: string }): CollectTypingsResult;
};

/**
 * Storybook preset hook: emits a separate Webpack entry for the playground runtime (configured modules + setup),
 * collects Monaco typings for those modules, and writes `playground/runtime/manifest.json`.
 */
export function webpackFinal(config: WebpackFinalConfig, options: WebpackFinalOptions): WebpackFinalConfig {
  const addonOptions = getAddonOptions(options);
  const runtimeEntry = writeRuntimeEntry(addonOptions, options.configDir ?? process.cwd());
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
    const htmlPlugin = compiler.options.plugins.find(
      plugin => plugin && plugin.constructor.name === 'HtmlWebpackPlugin',
    );
    const htmlPluginConstructor = htmlPlugin?.constructor as unknown as HtmlWebpackPluginConstructor | undefined;

    if (!htmlPluginConstructor?.getHooks) {
      return;
    }

    compiler.hooks.compilation.tap(pluginName, compilation => {
      htmlPluginConstructor.getHooks(compilation).beforeAssetTagGeneration.tap(pluginName, data => {
        return filterRuntimeEntryAssets(compilation.entrypoints, data);
      });
    });
  }
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

function getAddonOptions(options: WebpackFinalOptions): PresetConfig {
  const presetRegistration = options.presetsList?.find(preset => addonFilePattern.test(preset.name));
  const addonOptions = presetRegistration?.options ?? {};

  return { ...defaultOptions, ...addonOptions };
}

function getDefaultSetupPath(): string {
  // Compiled next to this file (`lib-commonjs/webpack.js` → `lib-commonjs/defaultSetup.js`)
  return require.resolve('./defaultSetup');
}

/**
 * Builds the playground runtime entry source.
 *
 * Configured modules are **static** imports (not `import()`). Dynamic imports become async chunks that Storybook's
 * webpack lazy-compilation serves from a separate origin — which fails inside `sandbox="allow-scripts"` (opaque
 * origin) iframes. Static imports stay on the entrypoint graph and ship via the manifest `<script>` tags.
 */
export function buildRuntimeEntrySource(options: PresetConfig): string {
  const modules = Object.entries(options.modules);
  const setupPath = options.setup ?? getDefaultSetupPath();
  const moduleImports = modules
    .map(([, request], index) => `import * as __pg_mod_${index} from ${JSON.stringify(request)};`)
    .join('\n');
  const moduleLoaders = modules
    .map(([publicName], index) => `${JSON.stringify(publicName)}: () => Promise.resolve(__pg_mod_${index})`)
    .join(',\n  ');

  return `
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactJsxRuntime from 'react/jsx-runtime';
import setup from ${JSON.stringify(setupPath)};
${moduleImports}

const moduleLoaders = {
  react: () => Promise.resolve(React),
  'react/jsx-runtime': () => Promise.resolve(ReactJsxRuntime),
  'react-dom': () => Promise.resolve(ReactDOM),
  'react-dom/client': () => Promise.resolve(ReactDOMClient),
  ${moduleLoaders}
};

const register = globalThis[${JSON.stringify(REGISTER_CALLBACK)}];
if (typeof register === 'function') {
  register({
    React,
    createRoot: ReactDOMClient.createRoot,
    moduleLoaders,
    setup,
  });
}
`.trimStart();
}

function writeRuntimeEntry(options: PresetConfig, configDir: string): string {
  const source = buildRuntimeEntrySource(options);
  const hash = crypto.createHash('sha256').update(source).digest('hex').slice(0, 12);
  const directory = path.join(configDir, '.cache', 'fluentui-playground-runtime');
  const filePath = path.join(directory, `runtime-${hash}.mjs`);

  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filePath, source, 'utf8');

  return filePath;
}

function collectConfiguredTypings(options: PresetConfig, storybookOptions: WebpackFinalOptions): CollectTypingsResult {
  const entries = [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    ...Object.values(options.modules),
    ...(options.typings ?? []),
  ];
  const packageRoot = storybookOptions.configDir ?? process.cwd();
  const typescriptVersion = getMonacoTypeScriptVersion();
  const result = collectTypings({ packageRoot, entries, typescriptVersion });

  for (const [publicName, request] of Object.entries(options.modules)) {
    if (publicName === request) {
      continue;
    }

    result.files[`file:///node_modules/${publicName}/index.d.ts`] = `export * from ${JSON.stringify(request)};`;
    result.files[`file:///node_modules/${publicName}/package.json`] = JSON.stringify({
      name: publicName,
      types: './index.d.ts',
    });
  }

  return result;
}

function getMonacoTypeScriptVersion(): string {
  const monacoContribution = require.resolve('monaco-editor/esm/vs/language/typescript/monaco.contribution.js');
  const source = fs.readFileSync(monacoContribution, 'utf8');
  const match = source.match(/typescriptVersion\s*=\s*["'](\d+\.\d+\.\d+)["']/);

  if (!match) {
    throw new Error('Unable to detect the TypeScript version bundled with monaco-editor');
  }

  return match[1];
}

class PlaygroundRuntimeManifestPlugin {
  public constructor(private readonly options: PresetConfig, private readonly typings: CollectTypingsResult) {}

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
          const typingsJson = JSON.stringify(this.typings.files);
          const typingsHash = crypto.createHash('sha256').update(typingsJson).digest('hex').slice(0, 12);
          const typingsFile = `playground/runtime/typings.${typingsHash}.json`;
          const buildId = crypto
            .createHash('sha256')
            .update(JSON.stringify({ scripts, styles, modules: this.options.modules, typingsHash }))
            .digest('hex')
            .slice(0, 12);

          compilation.emitAsset(typingsFile, new sources.RawSource(typingsJson));
          compilation.emitAsset(
            'playground/runtime/manifest.json',
            new sources.RawSource(
              JSON.stringify(
                {
                  scripts,
                  styles,
                  typings: typingsFile,
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
