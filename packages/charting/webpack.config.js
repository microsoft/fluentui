const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'charting';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'FabricCharting'
    },

    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

    resolve: {
      alias: {
        '@uifabric/charting/src': path.join(__dirname, 'src'),
        '@uifabric/charting/lib': path.join(__dirname, 'lib'),
        '@uifabric/charting': path.join(__dirname, 'lib')
      }
    }
  }),
  require('./webpack.serve.config')
];
