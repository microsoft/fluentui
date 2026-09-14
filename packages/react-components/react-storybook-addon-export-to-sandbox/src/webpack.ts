import type { PresetConfig } from './types';

type WebpackFinalFn = NonNullable<import('@storybook/react-webpack5').StorybookConfig['webpackFinal']>;
export type WebpackFinalConfig = Parameters<WebpackFinalFn>[0];
export type WebpackFinalOptions = Parameters<WebpackFinalFn>[1];

export function webpack(config: WebpackFinalConfig, options: WebpackFinalOptions): WebpackFinalConfig {
  const addonPresetConfig = getAddonOptions(options);

  registerRules({
    config: config as import('webpack').Configuration,
    rules: [createBabelLoaderRule(addonPresetConfig)],
  });

  return config;
}

const identity = <T extends unknown>(value: T) => value;
const addonFilePattern = /react-storybook-addon-export-to-sandbox\/[a-z/]+.[jt]s$/;
const defaultOptions = {
  webpackRule: {},
  babelLoaderOptionsUpdater: identity,
  cssModules: false,
};

const PLUGIN_PATH =
  process.env.BABEL_PRESET_FULL_SOURCE_DEV === 'true'
    ? '@fluentui/babel-preset-storybook-full-source/__dev'
    : '@fluentui/babel-preset-storybook-full-source';

function createBabelLoaderRule(config: Required<PresetConfig>): import('webpack').RuleSetRule {
  const { babelLoaderOptionsUpdater, importMappings, webpackRule, cssModules } = config;

  const plugin = [require.resolve(PLUGIN_PATH), { importMappings, cssModules }];

  return {
    test: /\.stories\.(jsx?$|tsx?$)/,
    ...webpackRule,
    /**
     * Run before transpilers so this loader receives the original story source and does not depend on
     * the format of sourcemaps emitted by subsequent loaders.
     */
    enforce: 'pre',
    use: {
      loader: require.resolve('babel-loader'),
      options: babelLoaderOptionsUpdater({
        parserOpts: { plugins: ['typescript', 'jsx'] },
        plugins: [plugin],
      }),
    },
  };
}

/**
 *
 * register custom Webpack Rules to webpack config
 */
function registerRules(options: { rules: import('webpack').RuleSetRule[]; config: import('webpack').Configuration }) {
  const { config, rules } = options;
  config.module = config.module ?? {};
  config.module.rules = config.module.rules ?? [];
  config.module.rules.push(...rules);

  return config;
}

function getAddonOptions(options: WebpackFinalOptions): Required<PresetConfig> {
  const presetRegistration = options.presetsList?.find(preset => {
    return addonFilePattern.test(preset.name);
  });

  const addonOptions = presetRegistration?.options ?? {};

  return { ...defaultOptions, ...addonOptions };
}
