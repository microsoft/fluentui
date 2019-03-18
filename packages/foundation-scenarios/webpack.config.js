const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'foundation-scenarios';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'FabricFoundationScenarios'
    },

    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

    resolve: {
      alias: {
        '@uifabric/foundation-scenarios/src': path.join(__dirname, 'src'),
        '@uifabric/foundation-scenarios/lib': path.join(__dirname, 'lib'),
        '@uifabric/foundation-scenarios': path.join(__dirname, 'lib')
      }
    }
  }),
  require('./webpack.serve.config')
];
