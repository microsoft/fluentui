
let path = require('path');
let webpack = require('webpack');
let WebpackNotifierPlugin = require('webpack-notifier');
const PACKAGE_NAME = require('./package.json').name;

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new WebpackNotifierPlugin(),
];

const devServerConfig = {
  inline: true,
  port: 4321
};

const outputConfig = {
  filename: 'fabric-site.js'
}

module.exports = {
  entry: './src/root.tsx',

  output: outputConfig,

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

  devServer: devServerConfig,
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

  plugins: plugins
}
