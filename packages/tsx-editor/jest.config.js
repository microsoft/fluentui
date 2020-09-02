const { createConfig } = require('@uifabric/build/jest/jest-resources');

const config = createConfig({
  moduleNameMapper: {
    'react-syntax-highlighter/dist/esm/(.*)$': 'react-syntax-highlighter/dist/cjs/$1',
    // have to manually add this one because monaco-editor intentionally doesn't have a `main`
    '@uifabric/monaco-editor/lib/(.*)$': '@uifabric/monaco-editor/lib-commonjs/$1',
  },
});

module.exports = config;
