const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'experiments';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

const alias = {
  '@uifabric/experiments/src': path.join(__dirname, 'src'),
  '@uifabric/experiments/lib': path.join(__dirname, 'lib'),
  '@uifabric/experiments': path.join(__dirname, 'lib'),
  '@uifabric/fluent-theme$': path.join(__dirname, '../../packages/fluent-theme/src'),
  '@uifabric/theme-samples$': path.join(__dirname, '../../packages/theme-samples/src')
};

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },
    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],
    resolve: {
      alias
    },
    output: {
      libraryTarget: 'var',
      library: 'FabricExperiments'
    }
  }),
  require('./webpack.serve.config')
];
