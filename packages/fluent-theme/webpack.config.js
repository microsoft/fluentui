const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');

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
    alias: getResolveAlias(true /*useLib*/),
  },
});
