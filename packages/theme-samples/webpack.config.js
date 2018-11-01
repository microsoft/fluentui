const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const BUNDLE_NAME = 'theme-samples';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricThemeSamples'
  },

  resolve: {
    alias: {
      '@uifabric/theme-samples/src': path.join(__dirname, 'src'),
      '@uifabric/theme-samples/lib': path.join(__dirname, 'lib'),
      '@uifabric/theme-samples': path.join(__dirname, 'lib')
    }
  }
});
