const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'date-time';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'FabricDateTime'
    },

    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

    resolve: {
      alias: {
        '@uifabric/date-time/src': path.join(__dirname, 'src'),
        '@uifabric/date-time/lib': path.join(__dirname, 'lib'),
        '@uifabric/date-time': path.join(__dirname, 'lib')
      }
    }
  }),
  require('./webpack.serve.config')
];
