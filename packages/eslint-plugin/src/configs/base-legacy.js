// @ts-check

const path = require('path');

const { getNamingConventionRule } = require('../utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'core')],
  rules: {
    /**
     * `@typescript-eslint`plugin eslint rules
     * @see https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
     */
    ...getNamingConventionRule({ prefixInterface: true }),
  },
  overrides: [],
};
