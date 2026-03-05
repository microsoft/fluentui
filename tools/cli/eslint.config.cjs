// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');
const nodeConfig = fluentPlugin.configs['flat/node'];

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    ignores: ['src/commands/migrate/v8-to-v9/__tests__/fixtures/**'],
  },
  ...(Array.isArray(nodeConfig) ? nodeConfig : [nodeConfig]),
];
