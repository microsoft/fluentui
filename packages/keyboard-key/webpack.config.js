const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');

const BUNDLE_NAME = 'keyboard-key';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricKeyboardKey'
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/keyboard-key/src': path.join(__dirname, 'src'),
      '@uifabric/keyboard-key/lib': path.join(__dirname, 'lib'),
      '@uifabric/keyboard-key': path.join(__dirname, 'lib')
    }
  }
});
