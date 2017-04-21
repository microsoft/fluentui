let path = require('path');
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
      'office-ui-fabric-react/src': path.join(__dirname, 'src'),
      'office-ui-fabric-react/lib': path.join(__dirname, 'src'),
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
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.scss$/,
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
    new WebpackNotifierPlugin()
  ]
}
