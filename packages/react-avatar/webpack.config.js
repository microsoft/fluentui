const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');

const BUNDLE_NAME = 'react-avatar';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js',
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricReactAvatar',
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/react-avatar/src': path.join(__dirname, 'src'),
      '@uifabric/react-avatar/lib': path.join(__dirname, 'lib'),
      '@uifabric/react-avatar': path.join(__dirname, 'lib'),
    },
  },
});
