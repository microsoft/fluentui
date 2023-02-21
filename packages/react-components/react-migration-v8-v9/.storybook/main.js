const { registerTsPaths, createPathAliasesConfig, registerRules, rules } = require('@fluentui/scripts-storybook');
const rootMain = require('../../../../.storybook/main');

const { tsConfigAllPath } = createPathAliasesConfig();

module.exports = /** @type {Omit<import('../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = /** @type config */ ({ ...rootMain.webpackFinal(config, options) });

    // add your own webpack tweaks if needed

    registerTsPaths({ config: localConfig, configFile: tsConfigAllPath });
    registerRules({ config: localConfig, rules: [rules.scssRule] });

    return localConfig;
  },
});
