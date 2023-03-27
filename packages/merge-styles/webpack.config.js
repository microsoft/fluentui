const { resources } = require('@fluentui/scripts-webpack');

const BUNDLE_NAME = 'merge-styles';

module.exports = resources.createConfig(BUNDLE_NAME, true, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js',
  },

  output: {
    libraryTarget: 'var',
    library: 'MergeStyles',
  },
});
