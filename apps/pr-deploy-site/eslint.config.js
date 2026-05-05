// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');
const sdl = require('@microsoft/eslint-plugin-sdl');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node'],
  ...sdl.configs.recommended,
  {
    files: ['**/pr-deploy-site.js'],
    rules: {
      curly: 'off',
      'no-var': 'off',
      'vars-on-top': 'off',
      'prefer-arrow-callback': 'off',
      'no-restricted-globals': 'off',
    },
  },
];
