import type { PresetConfig } from './types';

type WebpackFinalFn = NonNullable<import('@storybook/core-common').StorybookConfig['webpackFinal']>;
export type WebpackFinalConfig = Parameters<WebpackFinalFn>[0];
export type WebpackFinalOptions = Parameters<WebpackFinalFn>[1];

export function webpack(config: WebpackFinalConfig, options: WebpackFinalOptions) {
  const addonPresetConfig = getAddonOptions(options);

  registerRules({ config, rules: [createRule(addonPresetConfig)] });

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

function createRule(config: Required<PresetConfig>): import('webpack').RuleSetRule {
  const { babelLoaderOptionsUpdater, importMappings, webpackRule } = config;

  const plugin = [require.resolve(PLUGIN_PATH), importMappings];

  return {
    test: /\.stories\.(jsx?$|tsx?$)/,
    ...webpackRule,
    /**
     * why the usage of 'post' ? - we need to run this loader after all storybook webpack rules/loaders have been executed.
     * while we can use Array.prototype.unshift to "override" the indexes this approach is more declarative without additional hacks.
     */
    enforce: 'post',
    use: {
      loader: 'babel-loader',
      options: babelLoaderOptionsUpdater({
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
