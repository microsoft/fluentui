
let path = require('path');
let webpack = require('webpack');
let WebpackNotifierPlugin = require('webpack-notifier');
const PACKAGE_NAME = require('./package.json').name;

let resources = require('../../scripts/tasks/webpack-resources');
const devServerConfig = {
  inline: true,
  port: 4321
};

const outputConfig = {
  filename: 'fabric-sitev5.js'
}

module.exports = resources.createServeConfig({
  entry: './src/root.tsx',

  output: outputConfig,

  devServer: devServerConfig,

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

