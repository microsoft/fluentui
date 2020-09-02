const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'fluent-theme';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js',
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricFluentTheme',
  },

  resolve: {
    alias: {
      '@uifabric/fluent-theme/src': path.join(__dirname, 'src'),
      '@uifabric/fluent-theme/lib': path.join(__dirname, 'lib'),
      '@uifabric/fluent-theme': path.join(__dirname, 'lib'),
    },
  },
});
