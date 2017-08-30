const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/index.demo.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js',
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
});
