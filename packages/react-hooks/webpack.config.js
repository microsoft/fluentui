const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'react-hooks';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricReactHooks'
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/react-hooks/src': path.join(__dirname, 'src'),
      '@uifabric/react-hooks/lib': path.join(__dirname, 'lib'),
      '@uifabric/react-hooks': path.join(__dirname, 'lib')
    }
  }
});
