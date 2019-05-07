// @ts-check

const { argv } = require('just-task');
const { webpackTask } = require('just-scripts');
const path = require('path');
const fs = require('fs');

exports.webpack = webpackTask();
exports.webpackDevServer = async function() {
  const fp = require('find-free-port');
  const webpackConfigFilePath = argv().webpackConfig || 'webpack.serve.config.js';
  const configPath = path.resolve(process.cwd(), webpackConfigFilePath);
  const port = await fp(4322, 4400);

  if (fs.existsSync(configPath)) {
    const webpackDevServerPath = path.resolve(__dirname, '../node_modules/webpack-dev-server/bin/webpack-dev-server.js');
    const execSync = require('../exec-sync');

    execSync(`node ${webpackDevServerPath} --config ${configPath} --port ${port} --open`);
  }
};
