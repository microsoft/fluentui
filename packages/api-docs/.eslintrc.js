// @ts-check
const { getNodePackageRules } = require('@uifabric/build/eslint/ruleHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    ...getNodePackageRules(),
  },
};
