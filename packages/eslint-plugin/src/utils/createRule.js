const { ESLintUtils } = require('@typescript-eslint/experimental-utils');

module.exports = ESLintUtils.RuleCreator(
  name => `https://github.com/microsoft/fluentui/blob/master/packages/eslint-plugin/README.md#${name}`,
);
