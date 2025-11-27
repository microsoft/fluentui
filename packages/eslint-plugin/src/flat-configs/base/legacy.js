// @ts-check
const core = require('../core');
const { getNamingConventionRule } = require('../../utils/configHelpers');
const { defineConfig } = require('eslint/config');

/** @type { import("eslint").Linter.Config } */
module.exports = defineConfig(
  core,
  {
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
