// @ts-check
const baseLegacyConfig = require('../base/legacy');
const tseslint = require('typescript-eslint');

/** @type {import('typescript-eslint').ConfigArray} */
module.exports = tseslint.config({
  files: ['**/*.{ts,js}'],
  extends: [baseLegacyConfig],
  rules: {},
});
