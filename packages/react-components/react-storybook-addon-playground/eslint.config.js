// @ts-check

const { defineConfig } = require('eslint/config');
const fluentPlugin = require('@fluentui/eslint-plugin');
const path = require('node:path');

module.exports = defineConfig([
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
  {
    // Non-component code that runs outside of any React tree:
    // - the Storybook decorator manipulates the docs DOM directly (same as react-storybook-addon-export-to-sandbox)
    // - the playground entry point bootstraps the React root
    files: ['src/decorators/**/*.ts', 'src/playground/main.tsx'],
    rules: {
      '@nx/workspace-no-restricted-globals': 'off',
    },
  },
  {
    // The prebuilt shell's editor/formatter packages are root build-time dependencies, not published dependencies.
    files: ['src/playground/**'],
    ignores: ['**/*.spec.{ts,tsx}', '**/*.test.{ts,tsx}'],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, packageDir: [__dirname, path.resolve(__dirname, '../../..')] },
      ],
    },
  },
]);
