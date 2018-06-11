const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

module.exports = resources.createConfig('ssr-tests', false, {
  entry: './test/test.js',

  output: {
    filename: 'ssr-tests.js'
  },

  target: 'node',

  node: {
    fs: 'empty'
  },

  resolve: {
    alias: {
      'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
      '@uifabric/demo/src': path.join(__dirname, 'node_modules/@uifabric/demo/src'),
      '@uifabric/demo/lib': path.join(__dirname, 'node_modules/@uifabric/demo/lib'),
      '@uifabric/styling/lib': path.join(__dirname, '../../packages/styling/lib'),
      'Props.ts.js': 'Props'
    }
  },

  plugins: [
    new resources.webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
