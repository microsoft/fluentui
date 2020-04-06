const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'azure-themes';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js',
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricAzureThemes',
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/azure-themes/src': path.join(__dirname, 'src'),
      '@uifabric/azure-themes/lib': path.join(__dirname, 'lib'),
      '@uifabric/azure-themes': path.join(__dirname, 'lib'),
    },
  },
});
