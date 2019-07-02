const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const webpack = resources.webpack;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const PACKAGE_NAME = require('./package.json').name;

module.exports = resources.createServeConfig({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  entry: './src/demo/index.tsx',

  output: {
    filename: 'demo-app.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['typescript']
    }),
    new BundleAnalyzerPlugin()
  ],

  resolve: {
    alias: {
      '@uifabric/tsx-editor/src': path.join(__dirname, 'src'),
      '@uifabric/tsx-editor/lib': path.join(__dirname, 'lib'),
      '@uifabric/tsx-editor': path.join(__dirname, 'lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
