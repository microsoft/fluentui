const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'react-cards';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'FabricReactCards'
    },

    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

    resolve: {
      alias: {
        '@uifabric/react-cards/src': path.join(__dirname, 'src'),
        '@uifabric/react-cards/lib': path.join(__dirname, 'lib'),
        '@uifabric/react-cards': path.join(__dirname, 'lib')
      }
    }
  }),
  require('./webpack.serve.config')
];
