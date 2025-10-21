const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

const config = createConfig({
  moduleNameMapper: {
    'react-syntax-highlighter/dist/esm/(.*)$': 'react-syntax-highlighter/dist/cjs/$1',
    // have to manually add this one because monaco-editor intentionally doesn't have a `main`
    '@fluentui/monaco-editor/lib/(.*)$': '@fluentui/monaco-editor/lib-commonjs/$1',
  },
});

module.exports = config;
