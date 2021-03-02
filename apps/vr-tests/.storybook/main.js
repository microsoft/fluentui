// your app's webpack.config.js
const custom = require('@fluentui/scripts/storybook/webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: (config) => custom(config),
  addons: ['@storybook/addon-actions'],
};
