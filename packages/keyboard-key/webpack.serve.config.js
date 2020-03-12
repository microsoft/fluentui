const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');
const webpack = resources.webpack;

const PACKAGE_NAME = require('./package.json').name;

module.exports = resources.createServeConfig({
  entry: './src/demo/index.tsx',

  output: {
    filename: 'demo-app.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      '@uifabric/keyboard-key/src': path.join(__dirname, 'src'),
      '@uifabric/keyboard-key/lib': path.join(__dirname, 'lib'),
      '@uifabric/keyboard-key': path.join(__dirname, 'lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
