// @ts-check
const baseConfig = require('../base');
const tseslint = require('typescript-eslint');

/** @type {import('typescript-eslint').ConfigArray} */
module.exports = tseslint.config({
  files: ['**/*.{ts,js}'],
  extends: [baseConfig],
  rules: {
    'no-console': 'off',
  },
});
