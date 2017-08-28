const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const BUNDLE_NAME = 'experiments';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(
  BUNDLE_NAME,
  isProduction,
  {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'Fabric',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: `[name]${isProduction ? '.min' : ''}.js`
    },

    externals: [
      { 'react': 'React' },
      { 'react-dom': 'ReactDOM' }
    ]
  }
);
