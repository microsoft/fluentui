const chalk = require('chalk');

module.exports.logStartTask = (task) => {
  console.log(
    `${
    chalk.white('[') + chalk.gray(new Date().toLocaleTimeString({ hour12: false })) + chalk.white('] Starting:')
    } ${
    chalk.cyan(task)
    }`);
};

module.exports.logEndTask = (task, startTime, errorMessage) => {
  console.log(
    `${
    getTimePrefix()
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
  console.log('  ' + taskStatus);
}

module.exports.logEndBuild = (packageName, passed, startTime) => {
  console.log();
  console.log(
    `${
    getTimePrefix()
    } ${
    chalk.grey('===') + chalk.white('[ ') + chalk.cyan(packageName) + chalk.white(' ]') +
    chalk.grey('=') + chalk.white('[ ') + getPassFail(passed) + chalk.white(' ]') +
    chalk.grey('=') + chalk.white('[ ') + getDuration(startTime) + chalk.white(' ]') +
    chalk.grey('===')
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

function getTimePrefix() {
  return `[${
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
