'use strict';

/** Note: this require may need to be fixed to point to the build that exports the gulp-core-build-webpack instance. */
let build = require('@microsoft/web-library-build');
let webpackTaskResources = build.webpack.resources;
let webpack = webpackTaskResources.webpack;
let path = require('path');
let buildConfig = build.getConfig();
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BUNDLE_NAME = 'merge-styles';

let webpackConfig = {

  entry: {
    [BUNDLE_NAME]: './lib/index.js'
  },

  output: {
    libraryTarget: 'var',
    library: 'MergeStyles',
    path: path.join(__dirname, buildConfig.distFolder),
    publicPath: '/dist/',
    filename: `[name].min.js`
  },

  devtool: 'source-map',

  externals: [
    {
      'tslib': {
        commonjs: 'tslib',
        amd: 'tslib'
      }
    }
  ],

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: BUNDLE_NAME + '.stats.html',
      openAnalyzer: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};


module.exports = webpackConfig;
