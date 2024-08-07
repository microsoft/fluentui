const path = require('path');
const { registerTsPaths, registerRules, rules } = require('@fluentui/scripts-storybook');

const rootMain = require('../../../../../.storybook/main');

const tsConfigAllPath = path.join(__dirname, '../../../../../tsconfig.base.all.json');

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
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
