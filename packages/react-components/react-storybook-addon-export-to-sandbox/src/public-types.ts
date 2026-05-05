/**
 * NOTE:
 * Don't import anything from source code in this file !!
 *
 * only pure API definitions of addon are allowed to live here, that are used both internal and for external storybook `Parameter` type extensions
 */

export interface SandboxContext {
  provider: 'codesandbox-cloud' | 'codesandbox-browser' | 'stackblitz-cloud';
  bundler: 'vite' | 'cra';
  storyExportToken: string;
  storyFile: string;
  dependencies: Record<string, string>;
  requiredDependencies: Record<string, string>;
  optionalDependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

interface ParametersConfig {
  optionalDependencies?: Record<string, string>;
  requiredDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  provider: 'codesandbox-cloud' | 'codesandbox-browser' | 'stackblitz-cloud';
  bundler: 'vite' | 'cra';
  transformFiles?: (files: Record<string, string>, ctx: SandboxContext) => Record<string, string>;
}

export interface ParametersExtension {
  exportToSandbox?: ParametersConfig;
}

export interface PresetConfig {
  importMappings: import('@fluentui/babel-preset-storybook-full-source').BabelPluginOptions['importMappings'];
  webpackRule?: import('webpack').RuleSetRule;
  babelLoaderOptionsUpdater?: (value: import('@babel/core').TransformOptions) => typeof value;
  /**
   * When `true` (or a config object), enables CSS module auto-detection in the babel plugin:
   *  - Preserves `*.module.css` imports (rewriting paths to `./styles/<basename>`)
   *  - Auto-detects CSS module files on disk and injects `Story.parameters.cssModuleSources.cssModules`
   *  - If `tokensFilePath` is provided, reads the file and injects `Story.parameters.cssModuleSources.tokensSource`
   *
   * @default false
   */
  cssModules?: import('@fluentui/babel-preset-storybook-full-source').BabelPluginOptions['cssModules'];
}
