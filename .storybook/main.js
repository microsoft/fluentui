const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

/**
 *  @callback StorybookWebpackConfig
 *  @param {import("webpack").Configuration} config
 *  @param {{configType: 'DEVELOPMENT' | 'PRODUCTION'}} options - change the build configuration. 'PRODUCTION' is used when building the static version of storybook.
 *  @returns {import("webpack").Configuration}
 */

/**
 *  @typedef {{check:boolean; checkOptions: Record<string,unknown>; reactDocgen: string | boolean; reactDocgenTypescriptOptions: Record<string,unknown>}} StorybookTsConfig
 */

/**
 * @typedef {{stories: string[] ; addons: string[]; typescript: StorybookTsConfig; babel: (options:Record<string,unknown>)=>Promise<Record<string,unknown>>; webpackFinal: StorybookWebpackConfig}} StorybookConfig
 */

/**
 * @typedef  {{loader: string; options: { [index: string]: any }}} LoaderObjectDef
 */

module.exports = /** @type {Pick<StorybookConfig,'addons' |'stories' |'webpackFinal'>} */ ({
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs/preset',
    'storybook-addon-performance',
  ],
  webpackFinal: config => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.base.json'),
    });

    if (config.resolve) {
      config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : (config.resolve.plugins = [tsPaths]);
    }

    if (config.module && config.module.rules) {
      overrideDefaultBabelLoader(/** @type {import("webpack").RuleSetRule[]} */ (config.module.rules));
    }

    return config;
  },

  core: {
    builder: 'webpack5',
  },
});

/**
 * This is a temporary quick-fix solution. Remove this once we'll came up with robust solution - @see https://github.com/microsoft/fluentui/issues/18775
 *
 * Note: this function mutates rules argument
 *
 * @param {import("webpack").RuleSetRule[]} rules
 */
function overrideDefaultBabelLoader(rules) {
  const customLoaderPath = path.resolve(__dirname, './custom-loader.js');
  const ruleIdx = rules.findIndex(rule => {
    return String(/** @type {import("webpack").RuleSetRule}*/ (rule).test) === '/\\.(mjs|tsx?|jsx?)$/';
  });

  const rule = /** @type {import("webpack").RuleSetRule}*/ (rules[ruleIdx]);

  if (!Array.isArray(rule.use)) {
    throw new Error('storybook webpack rules changed');
  }

  const loaderIdx = rule.use.findIndex(loaderConfig => {
    return /** @type {LoaderObjectDef} */ (loaderConfig).loader.includes('babel-loader');
  });

  const loader = /** @type {LoaderObjectDef}*/ (rule.use[loaderIdx]);

  if (!Object.prototype.hasOwnProperty.call(loader, 'options')) {
    throw new Error('storybook webpack rules changed');
  }

  loader.options.customize = customLoaderPath;
}
