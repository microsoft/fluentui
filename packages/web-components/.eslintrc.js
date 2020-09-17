module.exports = {
  extends: ['@microsoft/eslint-config-fast-dna', 'prettier'],
  rules: {
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
  },
};
