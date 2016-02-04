'use strict';

let webpack = require('webpack');

module.exports = {
  context: __dirname + '/lib',

  entry: {
    app: './demo/index.js'
  },

  output: {
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    filename: "demo.bundle.js"
  },

  devServer: {
    stats: 'none'
  },

  externals: [
    {
      'react': {
        umd: 'react'
      }
    },
    {
      'react-dom': {
        umd: 'react-dom'
      }
    },
    {
      'office-ui-fabric-react': {
        umd: 'office-ui-fabric-react'
      }
    }
  ]

};
