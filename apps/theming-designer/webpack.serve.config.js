const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const isProduction = process.argv.indexOf('--production') > -1;
const PACKAGE_NAME = 'theming-designer';

module.exports = resources.createServeConfig({
  entry: './src/index.tsx',
  output: {
    filename: 'theming-designer.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
});
