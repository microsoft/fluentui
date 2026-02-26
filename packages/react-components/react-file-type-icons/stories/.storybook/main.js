const rootMain = require('../../../../../.storybook/main');
const path = require('path');

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: async (config, options) => {
    const localConfig = await rootMain.webpackFinal(config, options);

    localConfig.resolve = localConfig.resolve || {};
    localConfig.resolve.alias = {
      ...(localConfig.resolve.alias || {}),
      '@fluentui/set-version$': path.resolve(__dirname, './mocks/set-version.js'),
      '@fluentui/set-version': path.resolve(__dirname, './mocks/set-version.js'),
    };

    return localConfig;
  },
});
