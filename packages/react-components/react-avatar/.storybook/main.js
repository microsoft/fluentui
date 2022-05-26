const rootMain = require('../../../../.storybook/main');

module.exports = /** @type {Omit<import('../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    // `.beta` was added so AvatarGroup is not shown in the docsite until it's ready for unstable.
    // Refer to #23216 for more details.
    '../src/**/*.stories.beta.@(ts|tsx)',
  ],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    // add your own webpack tweaks if needed

    return localConfig;
  },
});
