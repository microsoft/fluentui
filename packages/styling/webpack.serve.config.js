let path = require('path');
let WebpackNotifierPlugin = require('webpack-notifier');

const PACKAGE_NAME = require('./package.json').name;

module.exports = {
  entry: './src/demoIndex.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js',
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
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
    new WebpackNotifierPlugin()
  ]
}
