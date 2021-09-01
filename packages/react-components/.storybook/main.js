const rootMain = require('../../../.storybook/main');

const utils = require('./main.utils');

module.exports = /** @type {Pick<import('../../../.storybook/main').StorybookConfig,'addons'|'stories'|'webpackFinal'>} */ ({
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    ...utils.getVnextStories(),
  ],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    return localConfig;
  },
});
