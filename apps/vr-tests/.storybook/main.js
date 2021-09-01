// your app's webpack.config.js
const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const custom = require('@fluentui/scripts/storybook/webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  babel: {},
  typescript: {
    // disable react-docgen-typescript (totally not needed here, slows things down a lot)
    reactDocgen: false,
  },
  webpackFinal: config => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../../../tsconfig.base.json'),
    });

    if (config.resolve) {
      config.resolve.plugins
        ? config.resolve.plugins.push(tsPaths)
        : (config.resolve.plugins = [tsPaths]);
    }

    config.module.rules.unshift({
      test: /\.(ts|tsx)$/,
      use: [{ loader: '@fluentui/make-styles-webpack-loader' }],
    });

    return custom(config);
  },
  addons: ['@storybook/addon-actions'],
};
