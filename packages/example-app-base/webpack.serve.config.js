const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/index.demo.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo-app.js',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
});
