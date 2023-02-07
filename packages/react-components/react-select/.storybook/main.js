const rootMain = require('../../../../.storybook/main');

module.exports = /** @type {Omit<import('../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../stories/**/*.stories.mdx', '../stories/**/index.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    // add your own webpack tweaks if needed

    return localConfig;
  },
});
