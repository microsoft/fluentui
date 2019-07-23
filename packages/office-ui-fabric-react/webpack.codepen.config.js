const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/index.bundle.ts',

  output: {
    filename: 'office-ui-fabric-react.js',
    libraryTarget: 'var',
    library: 'Fabric'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      'office-ui-fabric-react$': path.join(__dirname, 'src'),
      'office-ui-fabric-react/src': path.join(__dirname, 'src'),
      'office-ui-fabric-react/lib': path.join(__dirname, 'src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
