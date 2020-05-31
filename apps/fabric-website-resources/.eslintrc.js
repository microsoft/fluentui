// @ts-check
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    'deprecation/deprecation': 'off',
    'react/forbid-component-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/member-ordering': 'off',
  },
};
