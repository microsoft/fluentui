const { getResolveAlias, resources } = require('../../scripts/webpack');

module.exports = resources.createServeConfig(
  {
    entry: ['react-app-polyfill/ie11', './src/index.tsx'],
    output: {
      filename: 'theming-designer.js',
    },

    resolve: {
      alias: getResolveAlias(),
    },
  },
  'dist',
);
