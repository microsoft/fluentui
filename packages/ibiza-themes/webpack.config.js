const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const BUNDLE_NAME = '@uifabric&#x2F;ibiza-themes';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricIbizaThemes'
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/@uifabric&#x2F;ibiza-themes/src': path.join(__dirname, 'src'),
      '@uifabric/@uifabric&#x2F;ibiza-themes/lib': path.join(__dirname, 'lib'),
      '@uifabric/@uifabric&#x2F;ibiza-themes': path.join(__dirname, 'lib')
    }
  }
});
