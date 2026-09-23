const rootMain = require('../../../../../.storybook/main');
const {
  registerModernComponentImportTransform,
  registerModernFullSourceTransform,
  storySourceDirectories,
} = require('../config/modernStorybook');

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: storySourceDirectories.map(directory => ({
    directory,
    files: '**/@(index.stories.@(ts|tsx)|*.mdx)',
  })),
  addons: registerModernFullSourceTransform(rootMain.addons),
  webpackFinal: async (config, options) => {
    const localConfig = { ...(await rootMain.webpackFinal(config, options)) };

    registerModernComponentImportTransform(localConfig, storySourceDirectories);

    return localConfig;
  },
});
