// @ts-check
const tseslint = require('typescript-eslint');
const baseLegacy = require('../base/legacy');

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
module.exports = tseslint.config({
  files: ['**/*.{ts,js}'],
  extends: [baseLegacy],
  rules: {},
});
