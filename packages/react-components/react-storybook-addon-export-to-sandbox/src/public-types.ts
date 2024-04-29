/**
 * NOTE:
 * Don't import anything from source code in this file !!
 *
 * only pure API definitions of addon are allowed to live here, that are used both internal and for external storybook `Parameter` type extensions
 */
interface ParametersConfig {
  optionalDependencies?: Record<string, string>;
  requiredDependencies?: Record<string, string>;
  provider: 'codesandbox-cloud' | 'codesandbox-browser' | 'stackblitz-cloud';
  bundler: 'vite' | 'cra';
}

export interface ParametersExtension {
  exportToSandbox?: ParametersConfig;
}

export interface PresetConfig {
  importMappings: import('@fluentui/babel-preset-storybook-full-source').BabelPluginOptions;
  webpackRule?: import('webpack').RuleSetRule;
  babelLoaderOptionsUpdater?: (value: import('@babel/core').TransformOptions) => typeof value;
}
