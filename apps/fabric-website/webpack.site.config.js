'use strict';

/** Note: this require may need to be fixed to point to the build that exports the gulp-core-build-webpack instance. */
let webpackTaskResources = require('@microsoft/web-library-build').webpack.resources;
let webpack = webpackTaskResources.webpack;
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let isProduction = process.argv.indexOf('--production') > -1;
let isDogfood = process.argv.indexOf('--dogfood') > -1;
let path = require('path');
const version = require('./package.json').version;

let publicPath = 'https://static2.sharepointonline.com/files/fabric/fabric-website/dist/';

if (isDogfood) {
  publicPath = 'https://static2df.sharepointonline.com/files/fabric/fabric-website/dist/';
} else if (!isProduction) {
  publicPath = "/dist/";
}

// Create an array of configs, prepopulated with a debug (non-minified) build.
let configs = [
  createConfig(false, publicPath)
];

// Create a production config if applicable.
if (isProduction) {
  configs.push(createConfig(true, publicPath));
}

// Helper to create the config.
function createConfig(isProduction, publicPath) {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let minFileNamePart = isProduction ? '.min' : '';
  let webpackConfig = {

    entry: {
      'fabric-sitev5': './lib/root.js'
    },

    output: {
      path: path.join(__dirname, '/dist'),
      publicPath: publicPath,
      filename: `[name]${minFileNamePart}.js`,
      chunkFilename: `fabric-sitev5-${version}-[name]${minFileNamePart}.js`
    },

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

    resolve: {
      alias: {
        'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
        'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib')
      },
      extensions: ['', '.js']
    },

    module: {
      noParse: [/autoit.js/],
      loaders: [
        { test: /\.json$/, loader: 'json', enforce: 'pre' }
      ]
    },

    plugins: []
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