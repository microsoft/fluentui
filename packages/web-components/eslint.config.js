// @ts-check
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';
import eslintJs from '@eslint/js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['dist', 'coverage', '.storybook'],
  },
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
      playwright: playwright,
    },
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
    },
    settings: {
      react: {
        version: 'latest',
      },
    },
    rules: {
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'no-undef': 'off',
      'no-console': 'off',
      'no-extra-boolean-cast': 'off',
      'no-prototype-builtins': 'off',
      'no-fallthrough': 'off',
      'no-unexpected-multiline': 'off',
      'no-useless-escape': 'off',
      'import/order': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'comma-dangle': 'off',
      'prefer-const': ['error', { destructuring: 'all' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'warn',
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
      ...playwright.configs['flat/recommended'].rules,
    },
  },
];
