const custom = require('@uifabric/build/storybook/webpack.config');

module.exports = {
  webpackFinal: config => {
    return custom({ config });
  },
  addons: ['@storybook/addon-a11y/register'],
  addons: ['storybook-addon-performance/register'],
};
