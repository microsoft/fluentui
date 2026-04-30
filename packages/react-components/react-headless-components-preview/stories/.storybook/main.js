const path = require('path');

const rootMain = require('../../../../../.storybook/main');
const { createCssModuleRule, patchRules, STORIES_PACKAGE_ROOT } = require('./css-modules-webpack');

const repoRoot = path.resolve(__dirname, '../../../../..');
const tokensDir = path.resolve(repoRoot, 'theme');

const cssModuleRule = createCssModuleRule({ tokensDir, headlessStoriesDir: STORIES_PACKAGE_ROOT });

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = /** @type {any} */ ({ ...rootMain.webpackFinal(config, options) });

    localConfig.module = localConfig.module || { rules: [] };
    const rules = patchRules([...(localConfig.module.rules || [])]);
    localConfig.module.rules = [cssModuleRule, ...rules];

    return localConfig;
  },
});
