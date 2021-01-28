// Webpack configuration file for running a live demo of the app.
// Unfortunately due to the complexity of configuring webpack, this package does not have a
// standalone webpack config demo currently.

// @ts-check
const resources = require('@fluentui/scripts/webpack/webpack-resources');
const getResolveAlias = require('@fluentui/scripts/webpack/getResolveAlias');

module.exports = resources.createServeConfig(
  {
    entry: './src/index.tsx',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    output: {
      filename: 'todo-app.js',
    },
    resolve: {
      alias: getResolveAlias(),
    },
  },
  'dist',
);
