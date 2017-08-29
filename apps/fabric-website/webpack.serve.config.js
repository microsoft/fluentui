/**
 * TODO Remove this plugin when merging back into master as it greatly slows down
 * build times. This is mainly so that we can serve up the entry point to our devx
 * testing site
 */
let WriteFilePlugin = require('write-file-webpack-plugin');
let path = require('path');
let resources = require('../../scripts/tasks/webpack-resources');

const PACKAGE_NAME = require('./package.json').name;

module.exports = resources.createServeConfig({
  entry: './src/root.tsx',

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/',
    filename: 'fabric-website.js'
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
