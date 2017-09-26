const chalk = require('chalk');

const isProduction = process.argv.indexOf('--production') > -1;
const isVerbose = process.argv.indexOf('--verbose') > -1;

module.exports.logStartTask = (packageName, task) => {
  console.log(
    `${
    getTimePrefix(packageName)
    } Starting: ${
    chalk.cyan(task)
    }`);
};

module.exports.logEndTask = (packageName, task, startTime, errorMessage) => {
  console.log(
    `${
    getTimePrefix(packageName)
    } ${
    getPassFail(errorMessage === undefined)
    }: ${
    chalk.cyan(task)
    } (${
    getDuration(startTime)
    })${
    errorMessage ? (chalk.white(': ') + chalk.red(errorMessage)) : ''
    }`);
}

module.exports.logStatus = (taskStatus) => {
  if (isProduction || isVerbose) {
    console.log('  ' + taskStatus);
  }
}

module.exports.logEndBuild = (packageName, passed, startTime) => {
  console.log();
  console.log(
    `${
    chalk.grey('============') + chalk.white('[ ') + chalk.cyan(packageName) + chalk.white(' ]') +
    chalk.grey('=') + chalk.white('[ ') + getPassFail(passed) + chalk.white(' ]') +
    chalk.grey('=') + chalk.white('[ ') + getDuration(startTime) + chalk.white(' ]') +
    chalk.grey('============')
    }
  `);
}

function getDuration(startTime) {
  let duration = new Date().getTime() - startTime;

  return chalk.yellow(formatTime(duration));
}
function getPassFail(passed) {
  return passed ? chalk.green('Pass') : chalk.red('Error');
}

function getTimePrefix(packageName) {
  return `[${chalk.magenta(packageName)} ${
    chalk.gray(new Date().toLocaleTimeString({ hour12: false }))
    }]`;
}

function formatTime(milliseconds) {
  if (milliseconds >= 1000) {
    return (milliseconds / 1000) + 's';
  } else {
    return milliseconds + 'ms';
  }
}
