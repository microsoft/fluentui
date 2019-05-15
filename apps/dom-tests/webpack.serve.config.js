const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const isProduction = process.argv.indexOf('--production') > -1;
const PACKAGE_NAME = 'dom-tests';

module.exports = resources.createServeConfig({
  entry: './src/index.tsx',
  output: {
    filename: 'dom-tests.js'
  },
  mode: 'development'
});
