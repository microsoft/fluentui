const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');
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
      '@uifabric/experiments/src': path.join(__dirname, 'src'),
      '@uifabric/experiments/lib': path.join(__dirname, 'src'),
      '@uifabric/experiments': path.join(__dirname, 'src'),
      '@uifabric/fluent-theme$': path.join(__dirname, '../../packages/fluent-theme/src'),
      '@uifabric/theme-samples$': path.join(__dirname, '../../packages/theme-samples/src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
