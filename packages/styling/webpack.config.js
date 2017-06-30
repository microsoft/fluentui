const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BUNDLE_NAME = 'fabric.styling';

module.exports = {
  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: BUNDLE_NAME + '.js',
  },

  resolve: {
    alias: {
      '@uifabric/styling': path.join(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.tsx']
  },

  devtool: 'source-map',

  devServer: {
    inline: true,
    port: 4322
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: BUNDLE_NAME + '.stats.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: BUNDLE_NAME + '.stats.json'
    }),
    new webpack.ProvidePlugin({
      __extends: path.join(__dirname, './src', 'extends.ts')
    })
  ]
}
