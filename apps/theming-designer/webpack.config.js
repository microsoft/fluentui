const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'theming-designer';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: ['react-app-polyfill/ie11', './lib/index.js'],
  },

  output: {
    libraryTarget: 'var',
    library: 'Fabric',
  },
});
