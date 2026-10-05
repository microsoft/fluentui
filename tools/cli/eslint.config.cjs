// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');
const nodeConfig = fluentPlugin.configs['flat/node'];

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    ignores: ['src/**/__fixtures__/**'],
  },
  ...(Array.isArray(nodeConfig) ? nodeConfig : [nodeConfig]),
];
