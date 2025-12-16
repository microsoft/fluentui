// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');
const tseslint = require('typescript-eslint');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    files: ['template/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      // the rule can't understand that the actual list of deps is in template.json
      'import/no-extraneous-dependencies': 'off',
      // valid in some template files - don't wanna spam consumer with inline eslint-disabled pragmas
      '@typescript-eslint/triple-slash-reference': 'off',
      // Disable type-aware rules since template files are not in tsconfig
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@fluentui/ban-context-export': 'off',
    },
  },
];
