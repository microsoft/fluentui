// @ts-check
const js = require('@eslint/js');
const { fixupConfigRules } = require('@eslint/compat');
const { FlatCompat } = require('@eslint/eslintrc');
const fluentPlugin = require('@fluentui/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    files: ['bin/*.js', 'scripts/*.js'],
    ...fixupConfigRules(compat.extends('plugin:es/restrict-to-es2017'))[0],
  },
  {
    files: ['bin/*.js', 'src/loadSite.ts'],
    rules: {
      'no-console': 'off',
      'no-restricted-globals': 'off',
    },
  },
];
