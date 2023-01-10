const { resources } = require('@fluentui/scripts-webpack');

module.exports = resources.createServeConfig({
  entry: ['react-app-polyfill/ie11', './src/index.demo.tsx'],

  output: {
    filename: 'demo-app.js',
  },
});
