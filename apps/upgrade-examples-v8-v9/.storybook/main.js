const rootMain = require('../../../.storybook/main');
const custom = require('../../../scripts/storybook/webpack.config');

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript' | 'features' | 'previewHead'>} */ ({
  stories: ['../src/**/*.stories.tsx'],
  core: rootMain.core,
  typescript: {
    // disable react-docgen-typescript (totally not needed here, slows things down a lot) - for v8
    reactDocgen: false,
  },
  webpackFinal: (config, options) => {
    const localConfigV9 = /** @type typeof config */ ({ ...rootMain.webpackFinal(config, options) });
    const localConfig = custom(localConfigV9);

    return localConfig;
  },
  addons: ['@storybook/addon-actions'],
});
