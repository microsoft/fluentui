/**
 * NOTE: Use this config file is for when you want to build and serve the website
 * for the purpose of testing your local changes with the UHF.
 * Using this will considerably slow down the build and serve process
 * but will allow you to access the output file on your local machine.
 */

let WriteFilePlugin = require('write-file-webpack-plugin');
const HOST_NAME = require('os').hostname();
let serveConfig = require('./webpack.serve.config');
let path = require('path');
const entryPointFilename = 'fabric-sitev5';

// Overwrite the main webpack.site.config properties
serveConfig.entry = {
  [entryPointFilename]: './lib/root.js'
};

serveConfig.plugins.push(new WriteFilePlugin());
serveConfig.devServer.host = HOST_NAME;
serveConfig.devServer.disableHostCheck = true;
serveConfig.output.path = path.join(__dirname, '/dist');
serveConfig.output.publicPath = '/dist/';
serveConfig.output.chunkFilename = `${entryPointFilename}-${version}-[name]${minFileNamePart}.js`;

module.exports = serveConfig;
