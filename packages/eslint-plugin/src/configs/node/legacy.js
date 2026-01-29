// @ts-check
const legacy = require('../base/legacy');
const { defineConfig } = require('eslint/config');

/** @type { import("eslint").Linter.Config } */
module.exports = defineConfig(legacy, {
  files: ['**/*.{ts,js}'],
  rules: {},
});
