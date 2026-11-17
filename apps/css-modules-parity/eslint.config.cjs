// @ts-check

const { defineConfig } = require('eslint/config');
const rootConfig = require('../../eslint.config.js');

module.exports = defineConfig([
  ...rootConfig,
  {
    // Test infrastructure of the Griffel buckets prototype, bundled only into the Cypress app.
    files: ['griffel-buckets/**'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
  {
    // Node-run repository checks (`node --test`), not bundled into the Cypress app.
    files: ['checks/**'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
]);
