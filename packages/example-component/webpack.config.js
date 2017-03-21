let path = require('path');
let WebpackNotifierPlugin = require('webpack-notifier');

const PACKAGE_NAME = require('./package.json').name;

module.exports = {
  entry: './src/examples.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      [PACKAGE_NAME]: path.join(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js']
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    inline: true
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "load-themed-styles-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              minimize: true
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
            loader: "sass-loader" // compiles sass to CSS
          }
        ]
      }
    ]
  },

  plugins: [
    new WebpackNotifierPlugin()
  ]
}
