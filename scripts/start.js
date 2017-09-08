const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  {
    name: 'webpackConfig',
    alias: 'w',
    type: String
  }
];

const options = commandLineArgs(optionDefinitions);
let webpackConfigFilePath = 'webpack.serve.config.js';

if (options && options.webpackConfig) {
  webpackConfigFilePath = options.webpackConfig;
}

const configPath = path.resolve(process.cwd(), webpackConfigFilePath);

if (fs.existsSync(configPath)) {
  const webpackDevServerPath = path.resolve(__dirname, './node_modules/webpack-dev-server/bin/webpack-dev-server.js');
  const execSync = require('./exec-sync');

  execSync(`node ${webpackDevServerPath} --config ${configPath} --open`);
}
