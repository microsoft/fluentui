'use strict';

/** Note: this require may need to be fixed to point to the build that exports the gulp-core-build-webpack instance. */
let build = require('@microsoft/web-library-build');
let webpackTaskResources = build.webpack.resources;
let webpack = webpackTaskResources.webpack;
let path = require('path');
let buildConfig = build.getConfig();
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BUNDLE_NAME = 'experiments';
const BUNDLE_TEST = 'fabric-test';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

// Create an array of configs, prepopulated with a debug (non-minified) build.
let configs = [
  createConfig(false)
];

// Create a production config if applicable.
if (IS_PRODUCTION) {
  configs.push(createConfig(true));
}

// Helper to create the config.
function createConfig(isProduction) {
  let webpackConfig = {

    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'Fabric',
      path: path.join(__dirname, buildConfig.distFolder),
      publicPath: '/dist/',
      filename: `[name]${isProduction ? '.min' : ''}.js`
    },

    devtool: 'source-map',

    externals: [
      {
        'react': 'React',
      },
      {
        'react-dom': 'ReactDOM'
      }
    ],

    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: BUNDLE_NAME + '.stats.html',
        openAnalyzer: false
      })
    ]
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
      }));
  }

  return webpackConfig;
}

module.exports = configs;