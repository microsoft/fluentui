'use strict';

let webpack = require('webpack');
let path = require('path');
let WebpackNotifierPlugin = require('webpack-notifier');
let isProduction = process.argv.indexOf('--production') > -1;

let webpackConfig = {
  context: path.join(__dirname, '/lib'),

  entry: {
    'office-ui-fabric-react': './index.js',
    'demo-app': './demo/index.js'
  },

  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, '/dist'),
    filename: `[name]${ isProduction ? '.min' : '' }.js`
  },

  devtool: 'source-map',

  devServer: {
    stats: 'none'
  },

  externals: [
    {
      'react': {
        amd: 'react',
        commonjs: 'react'
      }
    },
    {
      'react-dom': {
        amd: 'react-dom',
        commonjs: 'react-dom'
      }
    },
    {
      'office-ui-fabric-react': {
        amd: 'office-ui-fabric-react',
        commonjs: 'office-ui-fabric-react'
      }
    }
  ],

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ]
  },

  plugins: [
      new WebpackNotifierPlugin()
  ]
};

if (isProduction) {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  }));
}

module.exports = webpackConfig;