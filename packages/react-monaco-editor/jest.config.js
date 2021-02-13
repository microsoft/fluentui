// @ts-check
const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

module.exports = createConfig({
  customConfig: {
    moduleNameMapper: {
      'react-syntax-highlighter/dist/esm/(.*)$': 'react-syntax-highlighter/dist/cjs/$1',
      // have to manually add this one because monaco-editor intentionally doesn't have a `main`
      '@fluentui/monaco-editor/lib/(.*)$': '@fluentui/monaco-editor/lib-commonjs/$1',
    },
  },
});
