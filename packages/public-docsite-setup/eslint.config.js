const es = require('eslint-plugin-es');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  ...compat.extends('plugin:@fluentui/eslint-plugin/react--legacy'),
  {
    files: ['bin/*.js', 'src/loadSite.ts'],

    rules: {
      'no-console': 'off',
      'no-restricted-globals': 'off',
    },
  },
  ...compat.extends('plugin:es/restrict-to-es2017').map(config => ({
    ...config,
    files: ['bin/*.js', 'scripts/*.js'],
  })),
  {
    files: ['bin/*.js', 'scripts/*.js'],

    plugins: {
      es,
    },
  },
];

