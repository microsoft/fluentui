const rootMain = require('../../../.storybook/main');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };
    localConfig.plugins?.push(new VanillaExtractPlugin());
    // add your own webpack tweaks if needed

    return localConfig;
  },
});
