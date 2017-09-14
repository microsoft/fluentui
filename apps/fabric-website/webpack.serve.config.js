let path = require('path');
let resources = require('../../scripts/tasks/webpack-resources');

const PACKAGE_NAME = require('./package.json').name;

module.exports = resources.createServeConfig({
  entry: './src/root.tsx',

  output: {
    filename: 'fabric-website.js',
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }

});
