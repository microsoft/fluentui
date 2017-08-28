const path = require('path');
// const nodeExternals = require('webpack-node-externals');
const resources = require('../../scripts/tasks/webpack-resources');

module.exports = resources.createConfig(
  'ssr-tests',
  false,
  {
    entry: './test/test.js',

    output: {
      filename: 'ssr-tests.js',
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

    plugins: [
      new resources.webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    ]
  });

console.log(module.exports[0].resolve.extensions)