module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
  ],
  settings: {
      react: {
          version: 'latest',
      },
  },
  rules: {
      'no-extra-boolean-cast': 'off',
      'no-prototype-builtins': 'off',
      'no-fallthrough': 'off',
      'no-unexpected-multiline': 'off',
      'import/order': 'error',
      'sort-imports': [
          'error',
          {
              ignoreCase: true,
              ignoreDeclarationSort: true,
          },
      ],
      'comma-dangle': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': [
          'error',
          {
              selector: 'default',
              format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
              leadingUnderscore: 'allow',
          },
          {
              selector: 'property',
              format: null, // disable for property names because of our foo__expanded convention for JSS
              // TODO: I think we can come up with a regex that ignores variables with __ in them
          },
          {
              selector: 'variable',
              format: null, // disable for variable names because of our foo__expanded convention for JSS
              // TODO: I think we can come up with a regex that ignores variables with __ in them
          },
      ],
  },
};
