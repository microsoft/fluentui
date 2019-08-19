const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'mdl2-theme';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricMdl2Theme'
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/mdl2-theme/src': path.join(__dirname, 'src'),
      '@uifabric/mdl2-theme/lib': path.join(__dirname, 'lib'),
      '@uifabric/mdl2-theme': path.join(__dirname, 'lib')
    }
  }
});
