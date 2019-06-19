const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const isProduction = process.argv.indexOf('--production') > -1;
const PACKAGE_NAME = 'perf-test';

module.exports = resources.createServeConfig({
  entry: './src/index.tsx',
  mode: 'production',
  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true
  },
  output: {
    filename: 'perf-test.js'
  },
  // TODO: decide whether to leave these aliases in. if in, minified results show up, like ~Tg
  // if taken out, "unknown" shows up. one or the other may make processing easier.
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
