const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');

module.exports = resources.createServeConfig({
  output: {
    filename: 'demo-app.js',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  resolve: {
    alias: {
      ...getResolveAlias(),
      '@fluentui/examples$': path.join(__dirname, '../../packages/examples/src'),
      '@fluentui/examples/lib': path.join(__dirname, '../../packages/examples/src'),
      '@fluentui/examples/src': path.join(__dirname, '../../packages/examples/src'),
    },
  },
});
