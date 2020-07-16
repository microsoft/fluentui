// @ts-check
const configHelpers = require('@fluentui/eslint-plugin/src/utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:@fluentui/eslint-plugin/react--legacy'],
  root: true,
  overrides: [
    // This rule requires type info, so only enable for TS files under src
    // (and turn off while running lint-staged due to excessive cost)
    ...configHelpers.getTypeInfoRuleOverrides({
      '@fluentui/deprecated-keyboard-event-props': 'error',
    }),
  ],
};
