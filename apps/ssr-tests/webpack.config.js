const { getResolveAlias, resources } = require('@fluentui/scripts-webpack');

module.exports = resources.createConfig('ssr-tests', false, {
  entry: './test/test.js',

  output: {
    filename: 'ssr-tests.js',
  },

  target: 'node',

  resolve: {
    alias: getResolveAlias(true /*useLib*/),
  },

  plugins: [
    new resources.webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
