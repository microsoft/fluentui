const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const PACKAGE_NAME = require('./package.json').name;

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: PACKAGE_NAME + '.js',
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
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
