// @ts-check
const tseslint = require('typescript-eslint');
const core = require('../core');
const { getNamingConventionRule } = require('../../utils/configHelpers');

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
module.exports = tseslint.config(
  {
    extends: [core],
    rules: {
      /**
       * `@typescript-eslint`plugin eslint rules
       * @see https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
       */
      ...getNamingConventionRule({ prefixInterface: true }),
    },
  },
  {
    files: ['**/src/index.{ts,tsx,js}'],
    rules: {
      // TODO: propagate to `error` once all packages barrel files have been fixed
      '@rnx-kit/no-export-all': ['warn', { expand: 'all' }],
    },
  },
);
