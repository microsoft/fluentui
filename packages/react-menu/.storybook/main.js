const rootMain = require('../../../.storybook/main');

const testGlob = '../src/stories/!(*.internal).stories.@(ts|tsx)';

module.exports = /** @type {Pick<import('../../../.storybook/main').StorybookConfig,'addons'|'stories'|'webpackFinal'>} */ ({
  stories: [...rootMain.stories, '../src/**/*.stories.mdx', testGlob],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    return localConfig;
  },
});
