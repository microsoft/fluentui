const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const PACKAGE_NAME = require('./package.json').name;

module.exports = {
  entry: {
    [PACKAGE_NAME]: './src/index.tsx'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[id].js'
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    // 'glamor': { commonjs: 'glamor' },
    // 'prop-types': { commonjs: 'prop-types' },
    // '@uifabric/styling/lib/index': { commonjs: '@uifabric/styling' },
    // '@uifabric/utilities/lib/index': { commonjs: '@uifabric/utilities' },
    // 'tslib': { commonjs: 'tslib' },
    // '@microsoft/load-themed-styles': { commonjs: '@microsoft/load-themed-styles' },
  },

  resolve: {
    alias: {},
    extensions: ['.ts', '.tsx', '.js']
  },

  devServer: {
    inline: true,
    port: 4321
  },

  module: {
    loaders: [
      {
        test: [/\.tsx?$/],
        loader: 'ts-loader',
        exclude: [
          /node_modules/,
          /\.scss.ts$/
        ]
      }
    ]
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors',
    //   minChunks: module => isExternal(module)
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: PACKAGE_NAME + '.stats.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: PACKAGE_NAME + '.stats.json'
    }),
  ]
}

function isExternal(module) {
  let context = module.context;

  if (typeof context !== 'string') {
    return false;
  }

  return (
    context.indexOf('node_modules') !== -1 ||
    context.indexOf('packages/styling') !== -1 ||
    context.indexOf('packages/utilities') !== -1
  );
}