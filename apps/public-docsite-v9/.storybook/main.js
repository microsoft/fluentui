const path = require('path');
const { getPackageStoriesGlob, registerTsPaths, rules, registerRules } = require('@fluentui/scripts-storybook');

const rootMain = require('../../../.storybook/main');

const tsConfigAllPath = path.join(__dirname, '../../../tsconfig.base.all.json');

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    ...getPackageStoriesGlob({ packageName: '@fluentui/react-components', callerPath: __dirname }),
    ...getPackageStoriesGlob({
      packageName: '@fluentui/public-docsite-v9',
      callerPath: __dirname,
      excludeStoriesInsertionFromPackages: ['@fluentui/react-storybook-addon', '@fluentui/theme-designer'],
    }),
  ],
  staticDirs: ['../public'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = /** @type config */ ({ ...rootMain.webpackFinal(config, options) });

    // add your own webpack tweaks if needed
    registerTsPaths({ configFile: tsConfigAllPath, config: localConfig });
    registerRules({ rules: [rules.scssRule], config: localConfig });

    return localConfig;
  },
});
