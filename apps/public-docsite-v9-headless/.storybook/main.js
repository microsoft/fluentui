const headlessMain = require('../../../packages/react-components/react-headless-components-preview/stories/.storybook/main');

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
});
