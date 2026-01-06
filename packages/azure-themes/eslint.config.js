// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [...fluentPlugin.configs['flat/react-legacy']];
