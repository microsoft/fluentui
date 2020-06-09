// @ts-check
const { isLintStaged, tsFiles } = require('@uifabric/build/eslint/constants');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {},
  overrides: [
    {
      // This rule requires type info, so only enable for TS files under src
      // (and turn off while running lint-staged due to excessive cost)
      files: [...tsFiles],
      plugins: ['@fluentui'],
      rules: {
        '@fluentui/deprecated-keyboard-event-props': isLintStaged ? 'off' : 'error',
      },
    },
  ],
};
