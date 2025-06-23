// @ts-check
const tseslint = require('typescript-eslint');
const base = require('../base/index');

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
module.exports = tseslint.config({
  files: ['**/*.{ts,js}'],
  extends: [base],
  rules: {
    'no-console': 'off',
  },
});
