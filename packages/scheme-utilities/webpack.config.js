const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'scheme-utilities';

module.exports = resources.createConfig(BUNDLE_NAME, true, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js',
  },

  output: {
    libraryTarget: 'var',
    library: 'FluentUISchemeUtilities',
  },
});
