// your app's webpack.config.js
const custom = require('@fluentui/scripts/storybook/webpack.config');

module.exports = {
  webpackFinal: config => custom(config),
};
