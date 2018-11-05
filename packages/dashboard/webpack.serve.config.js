const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');
const webpack = resources.webpack;

const PACKAGE_NAME = require('./package.json').name;

module.exports = resources.createServeConfig({
  entry: './src/demo/index.tsx',

  output: {
    filename: 'demo-app.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        enforce: 'pre',
        use: [
          {
            loader: '@microsoft/loader-load-themed-styles' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              minimize: false
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      '@uifabric/dashboard/src': path.join(__dirname, 'src'),
      '@uifabric/dashboard/lib': path.join(__dirname, 'src'),
      '@uifabric/dashboard': path.join(__dirname, 'lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
