// @ts-check
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import eslintJs from '@eslint/js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...tseslint.configs.recommended[1].rules,
      'import/no-extraneous-dependencies': ['error', { packageDir: ['.', '../..'] }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
