// @ts-check
const tseslint = require('typescript-eslint');
const baseLegacy = require('../base/legacy');
const reactConfig = require('../react/config');
const configHelpers = require('../../utils/configHelpers');
const { reactLegacy: restrictedGlobals } = require('../../utils/restricted-globals');

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
module.exports = tseslint.config(
  {
    extends: [baseLegacy, reactConfig],
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
