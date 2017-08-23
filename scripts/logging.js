const chalk = require('chalk');

module.exports.logStartTask = (task) => {
  console.log(
    `${
    chalk.white('[') + chalk.gray(new Date().toLocaleTimeString({ hour12: false })) + chalk.white('] Starting:')
    } ${
    chalk.cyan(task)
    }`);
};

module.exports.logEndTask = (task, duration, errorMessage) => {
  console.log(
    `[${
    chalk.gray(new Date().toLocaleTimeString({ hour12: false }))
    }] ${
    (errorMessage === undefined ? chalk.green('Pass') : chalk.red('Error'))
    }: ${
    chalk.cyan(task)
    } (${
    chalk.yellow(formatTime(duration))
    })${
    errorMessage ? (chalk.white(': ') + chalk.red(errorMessage)) : ''
    }`);
}

function formatTime(milliseconds) {
  if (milliseconds >= 1000) {
    return (milliseconds / 1000) + 's';
  } else {
    return milliseconds + 'ms';
  }
}
