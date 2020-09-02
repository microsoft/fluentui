const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'react-compose';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js',
  },

  output: {
    libraryTarget: 'var',
    library: 'FluentCompose',
  },

  externals: [{ react: 'React' }],
});
