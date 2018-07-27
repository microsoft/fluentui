const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const BUNDLE_NAME = 'dashboard';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricDashboardGridLayout'
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  resolve: {
    alias: {
      '@uifabric/dashboard/src': path.join(__dirname, 'src'),
      '@uifabric/dashboard/lib': path.join(__dirname, 'lib'),
      '@uifabric/dashboard': path.join(__dirname, 'lib')
    }
  }
});
