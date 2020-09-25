const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');

module.exports = resources.createConfig('ssr-tests', false, {
  entry: './test/test.js',

  output: {
    filename: 'ssr-tests.js',
  },

  target: 'node',

  node: {
    fs: 'empty',
  },

  resolve: {
    alias: getResolveAlias(true /*useLib*/),
  },

  plugins: [
    new resources.webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
