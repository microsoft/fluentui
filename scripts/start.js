const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');

const configPath = path.resolve(process.cwd(), 'webpack.serve.config.js');

if (fs.existsSync(configPath)) {
  const webpackDevServerPath = path.resolve(__dirname, './node_modules/webpack-dev-server/bin/webpack-dev-server.js');
  const execSync = require('./exec-sync');

  execSync(`node ${webpackDevServerPath} --config ${configPath} --open`);
}
