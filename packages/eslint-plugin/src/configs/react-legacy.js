// @ts-check
const configHelpers = require('../utils/configHelpers');
const path = require('path');
const { reactLegacy: restrictedGlobals } = require('./restricted-globals');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'base-legacy'), path.join(__dirname, 'react-config')],

  rules: {
    'jsdoc/check-tag-names': 'off',
    '@griffel/no-shorthands': 'off',
    'no-restricted-globals': restrictedGlobals,
  },
  overrides: [
    {
      // Test overrides
      files: [...configHelpers.testFiles, '**/*.stories.tsx'],
      rules: {
        'no-restricted-globals': 'off',
        'react/jsx-no-bind': 'off',
      },
    },
  ],
};
