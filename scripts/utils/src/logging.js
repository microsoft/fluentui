const chalk = require('chalk');

const isProduction = process.argv.indexOf('--production') > -1;
const isVerbose = process.argv.indexOf('--verbose') > -1;

/**
 *
 * @param {string} packageName
 * @param {string} task
 */
exports.logStartTask = (packageName, task) => {
  console.log(`${getTimePrefix(packageName)} Starting: ${chalk.cyan(task)}`);
};

/**
 *
 * @param {string} packageName
 * @param {string} task
 * @param {number} startTime
 * @param {string} errorMessage
 */
exports.logEndTask = (packageName, task, startTime, errorMessage) => {
  console.log(
    `${getTimePrefix(packageName)} ${getPassFail(errorMessage === undefined)}: ${chalk.cyan(task)} (${getDuration(
      startTime,
    )})${errorMessage ? chalk.white(': ') + chalk.red(errorMessage) : ''}`,
  );
};

/**
 *
 * @param {unknown} taskStatus
 */
exports.logStatus = taskStatus => {
  if (isProduction || isVerbose) {
    console.log('  ' + taskStatus);
  }
};

/**
 *
 * @param {string} packageName
 * @param {boolean} passed
 * @param {number} startTime
 */
exports.logEndBuild = (packageName, passed, startTime) => {
  console.log();
  console.log(
    `${
      chalk.grey('============') +
      chalk.white('[ ') +
      chalk.cyan(packageName) +
      chalk.white(' ]') +
      chalk.grey('=') +
      chalk.white('[ ') +
      getPassFail(passed) +
      chalk.white(' ]') +
      chalk.grey('=') +
      chalk.white('[ ') +
      getDuration(startTime) +
      chalk.white(' ]') +
      chalk.grey('============')
    }
  `,
  );
};

/**
 *
 * @param {number} startTime
 * @returns
 */
function getDuration(startTime) {
  const duration = new Date().getTime() - startTime;

  return chalk.yellow(formatTime(duration));
}

/**
 *
 * @param {boolean} passed
 * @returns
 */
function getPassFail(passed) {
  return passed ? chalk.green('Pass') : chalk.red('Error');
}

/**
 *
 * @param {string} packageName
 * @returns
 */
function getTimePrefix(packageName) {
  return `[${chalk.magenta(packageName)} ${chalk.gray(new Date().toLocaleTimeString([], { hour12: false }))}]`;
}

/**
 *
 * @param {number} milliseconds
 * @returns
 */
function formatTime(milliseconds) {
  if (milliseconds >= 1000) {
    return milliseconds / 1000 + 's';
  } else {
    return milliseconds + 'ms';
  }
}
