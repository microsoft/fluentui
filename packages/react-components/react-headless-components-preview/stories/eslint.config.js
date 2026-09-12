// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {},
  },
  {
    files: ['**/Concepts/Positioning/PositioningEngine.stories.tsx'],
    rules: {
      /**
       * The shared story config steers imports to the `@fluentui/react-components` barrel, which is
       * right for v9 stories. This story documents supplying a positioning engine to the headless
       * library, whose premise is not depending on the v9 suite — pointing consumers at the barrel
       * would pull in every component to obtain one hook. It imports `@fluentui/react-positioning`
       * directly so the code shown in the docs is the code a consumer should actually write.
       */
      '@fluentui/no-restricted-imports': 'off',
    },
  },
];
