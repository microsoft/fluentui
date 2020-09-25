const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');

module.exports = resources.createServeConfig({
  entry: './src/index.app.tsx',
  output: {
    filename: 'perf-test.js',
  },
  mode: 'production',
  resolve: {
    alias: getResolveAlias(),
  },
});
