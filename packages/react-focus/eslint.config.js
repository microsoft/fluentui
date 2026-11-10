// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');
const configHelpers = require('@fluentui/eslint-plugin/src/utils/configHelpers');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@fluentui/deprecated-keyboard-event-props': 'error',
    },
  },
];
