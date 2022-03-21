const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: ['react-app-polyfill/ie11', './src/index.demo.tsx'],

  output: {
    filename: 'demo-app.js',
  },
});
