const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const BUNDLE_NAME = 'tsx-editor';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'FabricTsxEditor'
  },

  externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['typescript']
    })
  ],

  resolve: {
    alias: {
      '@uifabric/tsx-editor/src': path.join(__dirname, 'src'),
      '@uifabric/tsx-editor/lib': path.join(__dirname, 'lib'),
      '@uifabric/tsx-editor': path.join(__dirname, 'lib')
    }
  }
});
