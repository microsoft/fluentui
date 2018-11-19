const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const BUNDLE_NAME = 'foundation';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricFoundation'
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/foundation/src': path.join(__dirname, 'src'),
      '@uifabric/foundation/lib': path.join(__dirname, 'lib'),
      '@uifabric/foundation': path.join(__dirname, 'lib')
    }
  }
});
