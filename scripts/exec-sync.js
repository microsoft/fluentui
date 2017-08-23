const path = require('path');
const execSync = require('child_process').execSync;
const chalk = require('chalk');

const SEPARATOR = process.platform === 'win32' ? ';' : ':',
  env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

function myExecSync(cmd, displayName) {
  let returnValue = 0;
  let start = new Date().getTime();

  const output = execSync(cmd, {
    cwd: process.cwd(),
    env: env,
    stdio: 'inherit'
  });
}

module.exports = myExecSync;
