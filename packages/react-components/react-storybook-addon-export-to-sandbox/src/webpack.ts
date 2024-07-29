import type { PresetConfig } from './types';

type WebpackFinalFn = NonNullable<import('@storybook/react-webpack5').StorybookConfig['webpackFinal']>;
export type WebpackFinalConfig = Parameters<WebpackFinalFn>[0];
export type WebpackFinalOptions = Parameters<WebpackFinalFn>[1];

export function webpack(config: WebpackFinalConfig, options: WebpackFinalOptions) {
  const addonPresetConfig = getAddonOptions(options);

  registerRules({ config, rules: [createBabelLoaderRule(addonPresetConfig), createStorybookSourceLoaderRule()] });

  return config;
}

const identity = <T extends unknown>(value: T) => value;
const addonFilePattern = /react-storybook-addon-export-to-sandbox\/[a-z/]+.[jt]s$/;
const defaultOptions = {
  webpackRule: {},
  babelLoaderOptionsUpdater: identity,
};

const PLUGIN_PATH =
  process.env.NODE_ENV !== 'production'
    ? '@fluentui/babel-preset-storybook-full-source/__dev'
    : '@fluentui/babel-preset-storybook-full-source';

function createBabelLoaderRule(config: Required<PresetConfig>): import('webpack').RuleSetRule {
  const { babelLoaderOptionsUpdater, importMappings, webpackRule } = config;

  const plugin = [require.resolve(PLUGIN_PATH), importMappings];

  return {
    test: /\.stories\.(jsx?$|tsx?$)/,
    ...webpackRule,
    /**
     * why the usage of 'post' ? - we need to run this loader after all storybook webpack rules/loaders have been executed.
     * while we can use Array.prototype.unshift to "override" the indexes this approach is more declarative without additional hacks.
     */
    // enforce: 'post',
    use: {
      loader: 'babel-loader',
      options: babelLoaderOptionsUpdater({
        plugins: [plugin],
      }),
    },
  };
}

/**
 * Storybook Source Loader is used to extract the source code from the stories by the babel plugin,
 * and it was removed in Storybook 7. So we need to add it manually.
 *
 * https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#dropped-source-loader--storiesof-static-snippets
 */
function createStorybookSourceLoaderRule(): import('webpack').RuleSetRule {
  return {
    test: /\.stories\.[tj]sx?$/,
    use: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {},
      },
    ],
    // enforce: 'pre',
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
  config.module.rules.unshift(...rules);

  return config;
}

function getAddonOptions(options: WebpackFinalOptions): Required<PresetConfig> {
  const presetRegistration = options.presetsList?.find(preset => {
    return addonFilePattern.test(preset.name);
  });

  const addonOptions = presetRegistration?.options ?? {};

  return { ...defaultOptions, ...addonOptions };
}
