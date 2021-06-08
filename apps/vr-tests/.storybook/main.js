// your app's webpack.config.js
const custom = require('@fluentui/scripts/storybook/webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  babel: {},
  typescript: {
    // disable react-docgen-typescript (totally not needed here, slows things down a lot)
    reactDocgen: false,
  },
  webpackFinal: config => custom(config),
  addons: ['@storybook/addon-actions'],
};
