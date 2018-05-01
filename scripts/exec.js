const path = require('path');
const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);
const chalk = require('chalk');
const { logStatus } = require('./logging');

const SEPARATOR = process.platform === 'win32' ? ';' : ':',
  env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

module.exports = function (cmd, displayName, cwd = process.cwd()) {
  logStatus(chalk.gray('Executing: ') + chalk.cyan(displayName || cmd));

  const execOptions = {
    cwd,
    env: env,
  };

  return exec(
    cmd,
    execOptions
  );
}
