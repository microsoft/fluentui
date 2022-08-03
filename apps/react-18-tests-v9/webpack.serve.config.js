const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const path = require('path');

module.exports = resources.createServeConfig(
  {
    entry: ['react-app-polyfill/ie11', './src/index.tsx'],
    output: {
      filename: 'react-18-tests-v9.js',
    },

    resolve: {
      alias: {
        ...getResolveAlias(),
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    },
  },
  'dist',
);
