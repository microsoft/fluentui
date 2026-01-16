// @ts-check
const base = require('../base');
const { defineConfig } = require('eslint/config');

/** @type { import("eslint").Linter.Config } */
module.exports = defineConfig(base, {
  files: ['**/*.{ts,js}'],
  rules: {
    'no-console': 'off',
  },
});
