const rootMain = require('../../../.storybook/main');

module.exports = /** @type {Omit<import('../../../.storybook/main').StorybookConfig,'typescript'>} */ ({
  stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    return localConfig;
  },
  babel: async config => {
    const localConfig = rootMain.babel(config);

    return localConfig;
  },
});
