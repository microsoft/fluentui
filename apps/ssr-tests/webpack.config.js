const path = require('node:path');
const { getResolveAlias, resources } = require('@fluentui/scripts-webpack');

module.exports = resources.createConfig('ssr-tests', false, {
  entry: './test/test.js',

  output: {
    filename: 'ssr-tests.js',
  },

  target: 'node',

  resolve: {
    alias: {
      ...getResolveAlias(true /*useLib*/),
      // react-monaco-editor dynamically loads @types/react via proprietary webpack require.ensure,
      // this doesn't work starting @types/react@17.0.48 as the types package introduced Export Maps
      '@types/react/index.d.ts': path.resolve(__dirname, '../../node_modules/@types/react/index.d.ts'),
    },
  },

  plugins: [
    new resources.webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
