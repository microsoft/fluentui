const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');
const { logStatus } = require('./logging');

const SEPARATOR = process.platform === 'win32' ? ';' : ':',
  env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

module.exports = function (cmd, displayName, cwd = process.cwd()) {
  logStatus(chalk.gray('Executing: ') + chalk.cyan(displayName || cmd));

  return new Promise((resolve, reject) => {
    const resolveOnExit0 = (exitCode) => exitCode === 0 ? resolve() : reject();

    exec(cmd, {
      cwd,
      env: env,
      stdio: 'inherit'
    })
      .on("close", resolveOnExit0);
  });
}
