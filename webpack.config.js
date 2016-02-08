'use strict';

let webpack = require('webpack');
let path = require('path');

module.exports = {
  context: path.join(__dirname, '/lib'),

  entry: {
    'office-ui-fabric-react': './index.js',
    'demo-app': './demo/index.js'
  },

  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
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

  plugins: []
};

