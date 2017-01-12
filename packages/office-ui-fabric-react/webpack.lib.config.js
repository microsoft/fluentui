'use strict';

/** Note: this require may need to be fixed to point to the build that exports the gulp-core-build-webpack instance. */
let build = require('@microsoft/web-library-build');
let webpackTaskResources = build.webpack.resources;
let webpack = webpackTaskResources.webpack;
let path = require('path');
let buildConfig = build.getConfig();
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BUNDLE_NAME = 'office-ui-fabric-react';

// Create an array of configs, prepopulated with a debug (non-minified) build.
let configs = [
  createConfig(false)
];

// Create a production config if applicable.
if (process.argv.indexOf('--production') > -1) {
  configs.push(createConfig(true));
}

// Helper to create the config.
function createConfig(isProduction) {
  let webpackConfig = {
    context: buildConfig.libFolder,

    entry: {
      [BUNDLE_NAME]: './index.js',
    },

    output: {
      libraryTarget: 'var',
      library: 'Fabric',
      path: path.join(__dirname, buildConfig.distFolder),
      filename: `[name]${isProduction ? '.min' : ''}.js`
    },

    devtool: 'source-map',

    devServer: {
      stats: 'none'
    },

    resolve: {
      root: path.resolve('./node_modules')
    },

    externals: [
      {
        'react': 'React',
      },
      {
        'react-dom': 'ReactDOM'
      }
    ],

    module: {
      loaders: [
      ]
    },

    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: BUNDLE_NAME + '.stats.html',
        openAnalyzer: false
      })
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

  return webpackConfig;
}

module.exports = configs;