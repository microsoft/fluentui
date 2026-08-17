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

export interface CssModuleEntry {
  name: string;
  source: string;
}

/** CSS module sources injected per-story at build time by the babel plugin. */
export interface CssModuleSources {
  cssModules?: CssModuleEntry[];
  tokensSource?: string;
}

/**
 * Everything needed to scaffold and open a sandbox for one example.
 *
 * This type is intentionally free of Storybook: any host that can supply an example's
 * source and configuration can drive the export.
 */
export interface Data {
  provider: 'codesandbox-cloud' | 'codesandbox-browser' | 'stackblitz-cloud';
  bundler: 'vite' | 'cra';
  /** Standalone, import-rewritten source for the example. */
  storyFile: string;
  /**
   * Name of the story's exported binding, used to re-export it as the sandbox entry.
   *
   * Inside Storybook this is recovered from `originalStoryFn.name` because users can
   * override `storyName`. Other hosts know the export name statically and pass it directly.
   */
  storyExportToken: string;
  dependencies: Record<string, string>;
  title: string;
  description: string;
  requiredDependencies: Record<string, string>;
  optionalDependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  transformFiles?: (files: Record<string, string>, ctx: SandboxContext) => Record<string, string>;
  cssModuleSources?: CssModuleSources;
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
  /**
   * Adds an "Open in new tab" button to each story in the Docs view.
   * Opens the story's iframe URL directly in a new browser tab, outside of the Storybook shell.
   *
   * @default true
   */
  openInNewTab?: boolean;
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
