/**
 * NOTE: This config file is for when you want to build and serve the website
 * for the purpose of testing your local changes with the UHF.
 * Using this will considerably slow down the build and serve process
 * but will allow you to access the output file on your local machine.
 */

const path = require('path');
const PACKAGE_NAME = require('./package.json').name;
const resources = require('../../scripts/tasks/webpack-resources');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HOST_NAME = require('os').hostname();
const version = require('./package.json').version;
const isProduction = process.argv.indexOf('--production') > -1;
const minFileNamePart = isProduction ? '.min' : '';
const entryPointFilename = 'fabric-sitev5';

module.exports = resources.createServeConfig({
  entry: './src/root.tsx',
  output: {
    filename: entryPointFilename + '.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    chunkFilename: `${entryPointFilename}-${version}-[name]${minFileNamePart}.js`
  },

  devServer: {
    host: HOST_NAME,
    disableHostCheck: true
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
  },

  plugins: [
    new WriteFilePlugin()
  ]

});