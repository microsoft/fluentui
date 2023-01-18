const { createStorybookWebpackConfig } = require('@fluentui/scripts-webpack');

module.exports = /** @type {import('../../../.storybook/main').StorybookBaseConfig} */ ({
  stories: ['../src/**/*.stories.tsx'],
  core: {
    builder: 'webpack5',
    disableTelemetry: true,
  },
  babel: {},
  typescript: {
    // disable react-docgen-typescript (totally not needed here, slows things down a lot)
    reactDocgen: false,
  },
  webpackFinal: config => {
    return createStorybookWebpackConfig(config);
  },
  addons: ['@storybook/addon-actions'],
});
