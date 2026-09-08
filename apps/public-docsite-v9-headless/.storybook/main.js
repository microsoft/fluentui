const headlessMain = require('../../../packages/react-components/react-headless-components-preview/stories/.storybook/main');
const { registerRules, rules } = require('@fluentui/scripts-storybook');

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...headlessMain,
  stories: [
    ...headlessMain.stories,
    // headless package stories
    '../../../packages/react-components/react-headless-components-preview/stories/src/**/index.stories.@(ts|tsx)',
  ],
  staticDirs: ['../public'],
  build: {
    previewUrl: process.env.DEPLOY_PATH,
  },
  webpackFinal: (config, options) => {
    const localConfig = /** @type config */ ({ ...headlessMain.webpackFinal(config, options) });

    if (process.env.REACT_COMPILER) {
      registerRules({ rules: rules.reactCompilerRule, config: localConfig });
    }

    return localConfig;
  },
});
