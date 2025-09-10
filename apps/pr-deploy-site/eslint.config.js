const js = require('@eslint/js');
const sdl = require('@microsoft/eslint-plugin-sdl');
const es = require('eslint-plugin-es');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  ...compat.extends('plugin:@fluentui/eslint-plugin/node'),
  ...sdl.configs.recommended,
  {
    files: ['**/pr-deploy-site.js'],
    plugins: {
      es,
    },

    rules: {
      curly: 'off',
      'no-var': 'off',
      'vars-on-top': 'off',
      'prefer-arrow-callback': 'off',
      'no-restricted-globals': 'off',
    },
  },
];
