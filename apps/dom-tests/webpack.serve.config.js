const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig(
  {
    entry: './src/index.tsx',
    output: {
      filename: 'dom-tests.js',
    },
    mode: 'development',
  },
  'dist',
);
