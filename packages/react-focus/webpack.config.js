const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');

const BUNDLE_NAME = 'react-focus';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: './lib/index.js',
  },

  output: {
    libraryTarget: 'var',
    library: 'FluentUIReactFocus',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  resolve: {
    alias: {
      '@fluentui/react-focus/src': path.join(__dirname, 'src'),
      '@fluentui/react-focus/lib': path.join(__dirname, 'lib'),
      '@fluentui/react-focus': path.join(__dirname, 'lib'),
    },
  },
});
