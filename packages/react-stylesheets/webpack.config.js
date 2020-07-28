const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');

const BUNDLE_NAME = 'react-stylesheets';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js',
  },

  output: {
    libraryTarget: 'var',
    library: 'FluentUIReactStylesheets',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  resolve: {
    alias: {
      '@fluentui/react-stylesheets/src': path.join(__dirname, 'src'),
      '@fluentui/react-stylesheets/lib': path.join(__dirname, 'lib'),
      '@fluentui/react-stylesheets': path.join(__dirname, 'lib'),
    },
  },
});
