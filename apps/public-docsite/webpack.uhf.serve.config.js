/**
 * NOTE: This config file is for when you want to build and serve the website
 * for the purpose of testing your local changes with the UHF.
 * Using this will considerably slow down the build and serve process
 * but will allow you to access the output file on your local machine.
 */

const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HOST_NAME = require('os').hostname();
const version = require('./package.json').version;
const isProduction = process.argv.indexOf('--production') > -1;
const minFileNamePart = isProduction ? '.min' : '';
const entryPointFilename = 'fabric-sitev5';
const devServer = {
  host: HOST_NAME,
  disableHostCheck: true,
  port: 4324,
};

module.exports = resources.createServeConfig({
  entry: './src/root.tsx',
  output: {
    filename: entryPointFilename + '.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://' + HOST_NAME + ':' + devServer.port + '/dist/',
    chunkFilename: `${entryPointFilename}-${version}-[name]${minFileNamePart}.js`,
  },

  devServer: devServer,

  resolve: {
    alias: getResolveAlias(true /*useLib*/),
  },

  plugins: [new WriteFilePlugin()],
});
