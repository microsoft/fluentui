const rootMain = require('../../../.storybook/main');
const utils = require('./main.utils');

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    ...utils.getVnextStories(),
  ],
  addons: [
    ...rootMain.addons,
    // Should be re-enabled, see https://github.com/microsoft/fluentui/issues/20896
    // '@fluentui/react-storybook-addon'
  ],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    // add your own webpack tweaks if needed

    return localConfig;
  },
});
