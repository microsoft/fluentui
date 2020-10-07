const resources = require('@uifabric/build/webpack/webpack-resources');
const getResolveAlias = require('@uifabric/build/webpack/getResolveAlias');
module.exports = resources.createServeConfig({
  output: {
    filename: 'demo-app.js',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    alias: getResolveAlias(),
  },
});
