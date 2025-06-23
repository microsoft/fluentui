// @ts-check
const baseLegacyConfig = require('../base/legacy');
const { defineConfig } = require('eslint/config');

/** @type {import('eslint').Linter.Config[]} */
module.exports = defineConfig({
  files: ['**/*.{ts,js}'],
  extends: [baseLegacyConfig],
  rules: {},
});
