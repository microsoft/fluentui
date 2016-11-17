'use strict';

/** Note: this require may need to be fixed to point to the build that exports the gulp-core-build-webpack instance. */
let build = require('@microsoft/web-library-build');
let buildConfig = build.getConfig();
let webpackTaskResources = build.webpack.resources;
let webpack = webpackTaskResources.webpack;

let path = require('path');
var SplitByPathPlugin = require('webpack-split-by-path');

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
  let minFileNamePart = isProduction ? '.min' : '';
  let webpackConfig = {
    context: path.join(__dirname, buildConfig.libFolder),

    entry: {
      'demo-app': './demo/app.js'
    },

    output: {
      path: path.join(__dirname, buildConfig.distFolder),
      filename: `[name]${ minFileNamePart }.js`,
      chunkFilename: `[name]${ minFileNamePart }.js`
    },

    devtool: 'source-map',

    devServer: {
      stats: 'none'
    },

    externals: [
      {
        'react': 'React'
      },
      {
        'react-dom': 'ReactDOM'
      },
    ],

    module: {
      noParse: [/autoit.js/],
      preLoaders: [
        {
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ],
      loaders: [
      ]
    },

    plugins: [
      new SplitByPathPlugin([
        {
          name: 'demo-vendor',
          path: path.join(__dirname, 'node_modules'),
        },
        {
          name: 'demo-components',
          path: path.join(buildConfig.libFolder, 'components')
        }
      ])
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