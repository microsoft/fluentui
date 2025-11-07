const path = require('node:path');
const { resources } = require('@fluentui/scripts-webpack');

module.exports = resources.createServeConfig({
  entry: ['react-app-polyfill/ie11', './src/index.demo.tsx'],

  output: {
    filename: 'demo-app.js',
  },
  resolve: {
    alias: {
      // react-monaco-editor dynamically loads @types/react via proprietary webpack require.ensure,
      // this doesn't work starting @types/react@17.0.48 as the types package introduced Export Maps
      '@types/react/index.d.ts': path.resolve(__dirname, '../../node_modules/@types/react/index.d.ts'),
    },
  },
});
