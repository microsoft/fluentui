// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      // This package is specifically for providing icon context, so it's allowed to export it
      '@fluentui/ban-context-export': 'off',
    },
  },
];
