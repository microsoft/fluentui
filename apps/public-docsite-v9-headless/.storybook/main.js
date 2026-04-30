const path = require('path');

const rootMain = require('../../../.storybook/main');
const {
  createCssModuleRule,
  patchRules,
  STORIES_PACKAGE_ROOT,
} = require('../../../packages/react-components/react-headless-components-preview/stories/.storybook/css-modules-webpack');

const repoRoot = path.resolve(__dirname, '../../..');
const tokensDir = path.resolve(repoRoot, 'theme');

const cssModuleRule = createCssModuleRule({ tokensDir, headlessStoriesDir: STORIES_PACKAGE_ROOT });

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [
    ...rootMain.stories,
    // docsite stories
    '../src/**/*.mdx',
    '../src/**/index.stories.@(ts|tsx)',
    // headless package stories
    '../../../packages/react-components/react-headless-components-preview/stories/src/**/index.stories.@(ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [...rootMain.addons],
  build: {
    previewUrl: process.env.DEPLOY_PATH,
  },
  webpackFinal: (config, options) => {
    const localConfig = /** @type config */ ({ ...rootMain.webpackFinal(config, options) });

    localConfig.module = localConfig.module || { rules: [] };
    const rules = patchRules([...(localConfig.module.rules || [])]);
    localConfig.module.rules = [cssModuleRule, ...rules];

    return localConfig;
  },
});
