let path = require('path');
let nodeExternals = require('webpack-node-externals');
let webpack = require('webpack');

module.exports = {
  entry: './test/test.js',

  output: {
    filename: 'dist/ssr-tests.js',
  },

  target: 'node',

  externals: [
    //  nodeExternals()
    "vertx"
  ],

  node: {
    fs: 'empty'
  },

  resolve: {
    alias: {
      'office-ui-fabric-react/src': path.join(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.join(__dirname, '../../packages/office-ui-fabric-react/lib'),
      'Props.ts.js': 'Props'
    },
    extensions: ['.js', '.tsx']
  },

  devtool: 'source-map',

  devServer: {
    inline: true,
    port: 4321
  },

  module: {
    loaders: [
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ]
}
