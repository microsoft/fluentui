// // @ts-check
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const path = require('path');
// const custom = require('@fluentui/scripts/storybook/webpack.config');

const rootConfig = require('../../../.storybook/main');

module.exports = {
  ...rootConfig,
  stories: ['../src/**/*.stories.@(ts|tsx)'],
};
