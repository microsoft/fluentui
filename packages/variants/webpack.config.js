const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');
const webpack = resources.webpack;

const BUNDLE_NAME = 'variants';

module.exports = resources.createConfig(BUNDLE_NAME, true, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'Variants'
  }
});
