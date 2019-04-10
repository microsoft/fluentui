const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const isProduction = process.argv.indexOf('--production') > -1;
const PACKAGE_NAME = 'perf-test';

module.exports = resources.createServeConfig({
  entry: './src/index.tsx',
  output: {
    filename: 'perf-test.js'
  },
  mode: 'production'
});
