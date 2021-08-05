const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');

module.exports = resources.createServeConfig(
  {
    entry: ['react-app-polyfill/ie11', './src/index.tsx'],
    output: {
      filename: 'theming-designer.js',
    },

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },

    resolve: {
      alias: getResolveAlias(),
    },
  },
  'dist',
);
