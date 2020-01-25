const custom = require('@uifabric/build/config/storybook/webpack.config');

module.exports = {
  webpackFinal: config => {
    return custom({ config });
  },
  addons: ['@storybook/addon-a11y/register']
};
