const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const isProduction = process.argv.indexOf('--production') > -1;
const PACKAGE_NAME = 'perf-test';

module.exports = resources.createServeConfig({
  entry: './src/index.app.tsx',
  output: {
    filename: 'perf-test.js'
  },
  mode: 'production',
  resolve: {
    alias: {
      '@uifabric/experiments/src': path.resolve(__dirname, '../../packages/experiments/src'),
      '@uifabric/experiments/lib': path.resolve(__dirname, '../../packages/experiments/src'),
      '@uifabric/experiments': path.resolve(__dirname, '../../packages/experiments/src'),
      'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src')
    }
  }
});
