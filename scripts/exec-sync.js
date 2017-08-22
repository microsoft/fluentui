const path = require('path');
const execSync = require('child_process').execSync;
const chalk = require('chalk');

const SEPARATOR = process.platform === 'win32' ? ';' : ':',
  env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

function myExecSync(cmd, displayName) {
  let returnValue = 0;
  let start = new Date().getTime();

  console.log(
    `${
    chalk.white('[') + chalk.gray(new Date().toLocaleTimeString({ hour12: false })) + chalk.white('] Starting:')
    } ${
    chalk.cyan(displayName || cmd)
    }`);

  try {
    const output = execSync(cmd, {
      cwd: process.cwd(),
      env: env,
      stdio: 'inherit'
    });
  } catch (ex) {
    returnValue = ex.status;
  }

  console.log(
    `${
    chalk.white('[') + chalk.gray(new Date().toLocaleTimeString({ hour12: false })) + chalk.white('] Ending:')
    } ${
    chalk.white('(') + (returnValue !== 0 ? chalk.red('Error') : chalk.green('Pass')) + chalk.white(') ') +
    chalk.cyan(displayName || cmd) +
    chalk.white(' (') + chalk.yellow(formatTime(new Date().getTime() - start)) + chalk.white(')')
    }`);

  if (returnValue !== 0) {
    console.error(`The task "${chalk.cyan(displayName || cmd)}" failed.`);
    process.exit(returnValue);
  }

  return returnValue;
}

function formatTime(milliseconds) {
  if (milliseconds >= 1000) {
    return (milliseconds / 1000) + 's';
  } else {
    return milliseconds + 'ms';
  }
}

module.exports = myExecSync;
