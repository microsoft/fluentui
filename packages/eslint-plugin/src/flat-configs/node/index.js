// @ts-check
const baseConfig = require('../base');
const { defineConfig } = require('eslint/config');

/** @type {import('eslint').Linter.Config[]} */
module.exports = defineConfig([
  {
    files: ['**/*.{ts,js}'],
    extends: [baseConfig],
    rules: {
      'no-console': 'off',
    },
  },
]);
