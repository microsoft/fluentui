const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const isProduction = process.argv.indexOf('--production') > -1;
const PACKAGE_NAME = 'theming-designer';

module.exports = resources.createServeConfig({
  entry: './src/index.tsx',
  output: {
    filename: 'theming-designer.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src')
    }
  }
});
