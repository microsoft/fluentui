// @ts-check
const baseLegacyConfig = require('../base/legacy');
const reactConfig = require('../react/config');
const configHelpers = require('../../utils/configHelpers');
const tseslint = require('typescript-eslint');
const { reactLegacy: restrictedGlobals } = require('../../utils/restricted-globals');

/** @type {import('typescript-eslint').ConfigArray} */
module.exports = tseslint.config(
  {
    extends: [baseLegacyConfig, reactConfig],
    rules: {
      'jsdoc/check-tag-names': 'off',
      '@griffel/no-shorthands': 'off',
      'no-restricted-globals': restrictedGlobals,
    },
  },
  {
    // Test overrides
    files: [...configHelpers.testFiles, '**/*.stories.tsx'],
    rules: {
      'no-restricted-globals': 'off',
      'react/jsx-no-bind': 'off',
    },
  },
);
