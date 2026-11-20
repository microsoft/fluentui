// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

const generatedSelfImports = ['@fluentui/public-docsite/lib', '@fluentui/public-docsite/lib-*'];

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    files: ['e2e/**/*.ts', 'playwright.config.ts'],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './tsconfig.e2e.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['src/**/*.test.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './tsconfig.spec.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: generatedSelfImports,
              message: 'Import this app through relative source paths, not its generated output.',
            },
          ],
        },
      ],
      'no-restricted-modules': ['error', { patterns: generatedSelfImports }],
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-webpack-loader-syntax': 'off', // ok in this project
      'prefer-const': 'off',
      'react/jsx-no-bind': 'off',
      'no-restricted-globals': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
