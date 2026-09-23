// @ts-check
import fluentPlugin from '@fluentui/eslint-plugin';
import { defineConfig } from 'eslint/config';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig(
  fluentPlugin.configs['flat/react'],
  { ignores: ['.source/**', '.react-router/**', '.fumadocs-typescript/**', '.impeccable/**', 'dist/**'] },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      'import/no-extraneous-dependencies': ['error', { packageDir: ['.', '../..'] }],
    },
  },
  {
    files: ['*.config.{js,ts}', 'mdx-plugins/**/*.ts', 'vite-plugins/**/*.ts', 'src/routes.ts'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { packageDir: ['.', '../..'], devDependencies: true }],
    },
  },
  {
    files: ['src/**/*.server.{ts,tsx}', 'src/entry.server.tsx'],
    rules: { 'compat/compat': 'off' },
  },
);
