const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');

const BUNDLE_NAME = 'example-data';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricExampleData'
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/example-data/src': path.join(__dirname, 'src'),
      '@uifabric/example-data/lib': path.join(__dirname, 'lib'),
      '@uifabric/example-data': path.join(__dirname, 'lib')
    }
  }
});
