// @ts-check
const path = require('path');
const child_process = require('child_process');
const chalk = require('chalk');
const { logStatus } = require('./logging');

const SEPARATOR = process.platform === 'win32' ? ';' : ':';

/**
 * @deprecated Use `child_process.execSync` directly.
 * Execute a command synchronously.
 *
 * @param {string} cmd  Command to execute
 * @param {string} [displayName] Display name for the command
 * @param {string} [cwd] Working directory in which to run the command
 */
function execSync(cmd, displayName, cwd = process.cwd()) {
  logStatus(chalk.gray('Executing: ') + chalk.cyan(displayName || cmd));

  child_process.execSync(cmd, {
    cwd,
    env: {
      ...process.env,
      // Make sure we read "path" case-insensitively (i.e., for Windows Powershell)
      PATH: path.resolve('./node_modules/.bin') + SEPARATOR + process.env.PATH,
    },
    stdio: 'inherit',
  });
}

module.exports = execSync;
