let path = require('path');
let webpack = require('webpack');
let WebpackNotifierPlugin = require('webpack-notifier');

const PACKAGE_NAME = require('./package.json').name;

module.exports = {
  entry: './src/demo/index.tsx',

  output: {
    filename: 'demo-app.js',
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      'experiments/src': path.join(__dirname, 'src'),
      'experiments/lib': path.join(__dirname, 'src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    },
    extensions: ['.ts', '.tsx', '.js']
  },

  devtool: 'source-map',

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
    new WebpackNotifierPlugin()
  ]
}
