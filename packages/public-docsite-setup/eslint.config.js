const js = require('@eslint/js');
const { fixupConfigRules } = require('@eslint/compat');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  ...compat.extends('plugin:@fluentui/eslint-plugin/react--legacy'),
  {
    files: ['bin/*.js', 'scripts/*.js'],
    rules: {
      ...fixupConfigRules(compat.extends('plugin:es/restrict-to-es2017')).rules,
    },
  },
  {
    files: ['bin/*.js', 'src/loadSite.ts'],
    rules: {
      'no-console': 'off',
      'no-restricted-globals': 'off',
    },
  },
];
