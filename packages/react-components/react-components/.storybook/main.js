const { getPackageStoriesGlob } = require('@fluentui/scripts/storybook');

const rootMain = require('../../../../.storybook/main');

module.exports = /** @type {Omit<import('../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/index.stories.@(ts|tsx)',
    ...getPackageStoriesGlob({ packageName: '@fluentui/react-components', callerPath: __dirname }),
  ],
  staticDirs: ['../public'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    // add your own webpack tweaks if needed

    return localConfig;
  },
});
