// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    files: ['src/**/*.{ts,tsx,jsx,js}'],
    rules: {
      '@fluentui/no-global-react': 'warn',
      '@nx/workspace-no-restricted-globals': 'warn',
      '@rnx-kit/no-export-all': 'warn',
      'array-callback-return': 'warn',
      eqeqeq: 'warn',
      'import/no-extraneous-dependencies': 'warn',
      'jsdoc/check-tag-names': 'warn',
      'no-restricted-syntax': 'warn',
      'object-shorthand': 'warn',
      'prefer-const': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-bind': 'warn',
      'prefer-exponentiation-operator': 'off',
      'no-unsafe-optional-chaining': 'off',
      'no-promise-executor-return': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // react-compiler plugin is only registered for ts/tsx files in flat/react
      'react-compiler/react-compiler': 'warn',
      '@typescript-eslint/naming-convention': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
    },
  },
];
