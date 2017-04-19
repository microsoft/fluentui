const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const DefinePlugin = require('webpack').DefinePlugin;

const PACKAGE_NAME = require('./package.json').name;

module.exports = {
  entry: './src/index.demo.tsx',

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
    new WebpackNotifierPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
