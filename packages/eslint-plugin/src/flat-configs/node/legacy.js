// @ts-check
const legacy = require('../base/legacy');
const tseslint = require('typescript-eslint');

/** @type {import('typescript-eslint').ConfigArray} */
module.exports = tseslint.config(legacy, {
  files: ['**/*.{ts,js}'],
  rules: {},
});
