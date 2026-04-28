// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {},
  },
  {
    // Storybook-only utilities consumed by `*.stories.tsx`. They live alongside
    // stories (not in a published package), pull React/Storybook from the
    // workspace, and run only in the docs preview — so the same relaxations
    // we apply to story files apply here.
    files: ['src/_helpers/**/*.{ts,tsx}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
];
