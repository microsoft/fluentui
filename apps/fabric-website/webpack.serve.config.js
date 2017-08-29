/**
 * TODO Remove this plugin when merging back into master as it greatly slows down
 * build times. This is mainly so that we can serve up the entry point to our devx
 * testing site
 */
let WriteFilePlugin = require('write-file-webpack-plugin');
let path = require('path');
let webpack = require('webpack');
let WebpackNotifierPlugin = require('webpack-notifier');
const HOST_NAME = require('os').hostname();

const PACKAGE_NAME = require('./package.json').name;

module.exports = {
  entry: './src/root.tsx',

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/',
    filename: 'fabric-website.js'
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    },
    extensions: ['.ts', '.tsx', '.js']
  },

  devtool: 'source-map',

  devServer: {
    inline: true,
    port: 4321,
    host: HOST_NAME
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
      },
      {
        test: /\.scss$/,
        enforce: 'pre',
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: "load-themed-styles-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              minimize: false
            }
          },
          {
            loader: 'postcss-loader',

            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: "sass-loader",
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new WebpackNotifierPlugin(),
    new WriteFilePlugin()
  ]
}
