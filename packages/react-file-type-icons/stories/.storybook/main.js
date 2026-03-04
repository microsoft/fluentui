const rootMain = require('../../../../.storybook/main');
const path = require('path');

module.exports = {
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  /**
   * @param {import('webpack').Configuration} config
   * @param {any} options
   */
  webpackFinal: (config, options) => {
    const localConfig = /** @type {import('webpack').Configuration} */ (rootMain.webpackFinal(config, options));

    localConfig.resolve = localConfig.resolve || {};
    localConfig.resolve.alias = {
      ...(localConfig.resolve.alias || {}),
      '@fluentui/react-file-type-icons$': path.resolve(__dirname, '../../src/index.ts'),
      '@fluentui/set-version': path.resolve(__dirname, './mocks/set-version.js'),
    };

    return localConfig;
  },
};
