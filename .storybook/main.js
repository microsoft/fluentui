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

    return config;
  },
});
