// @ts-check

const {
  getPackageStoriesGlob,
  createPathAliasesConfig,
  registerTsPaths,
  rules,
  registerRules,
} = require('@fluentui/scripts-storybook');

const rootMain = require('../../../.storybook/main');

const { tsConfigAllPath } = createPathAliasesConfig();

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    ...getPackageStoriesGlob({ packageName: '@fluentui/react-components', callerPath: __dirname }),
    '../../../packages/react-components/react-migration-v0-v9/stories/**/@(index.stories.@(ts|tsx)|*.stories.mdx)',
    '../../../packages/react-components/react-migration-v8-v9/stories/**/@(index.stories.@(ts|tsx)|*.stories.mdx)',
    '../../../packages/react-components/react-datepicker-compat/stories/**/@(index.stories.@(ts|tsx)|*.stories.mdx)',
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
