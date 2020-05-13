const custom = require('@uifabric/build/storybook/webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: config => {
    return custom({ config });
  },
  addons: ['@storybook/addon-a11y/register', 'storybook-addon-performance/register'],
};
