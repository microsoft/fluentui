// @ts-check
const { getNamingConventionRule } = require('@uifabric/build/eslint/ruleHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    ...getNamingConventionRule(false /* prefixWithI */),
  },
};
