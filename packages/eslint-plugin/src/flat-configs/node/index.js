// @ts-check
const base = require('../base');
const tseslint = require('typescript-eslint');

/** @type {import('typescript-eslint').ConfigArray} */

module.exports = tseslint.config(base, {
  files: ['**/*.{ts,js}'],
  rules: {
    'no-console': 'off',
  },
});
