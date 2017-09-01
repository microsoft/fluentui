const path = require('path');
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const { logStatus } = require('./logging');

const SEPARATOR = process.platform === 'win32' ? ';' : ':',
  env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

function myExecSync(cmd, displayName, cwd = process.cwd()) {
  let returnValue = 0;
  let start = new Date().getTime();

  logStatus(chalk.gray('Executing: ') + chalk.cyan(displayName || cmd));

  const output = execSync(cmd, {
    cwd,
    env: env,
    stdio: 'inherit'
  });
}

module.exports = myExecSync;
