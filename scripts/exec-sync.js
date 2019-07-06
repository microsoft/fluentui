// @ts-check
const path = require('path');
const child_process = require('child_process');
const chalk = require('chalk').default;
const { logStatus } = require('./logging');

const SEPARATOR = process.platform === 'win32' ? ';' : ':';
const env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

/**
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
    env: env,
    stdio: 'inherit'
  });
}

module.exports = execSync;
