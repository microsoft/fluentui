// @ts-check
const path = require('path');
const child_process = require('child_process');
const chalk = require('chalk').default;
const { logStatus } = require('./logging');

const SEPARATOR = process.platform === 'win32' ? ';' : ':';

/**
 * Execute a command synchronously.
 *
 * @param {string} cmd  Command to execute
 * @param {string} [displayName] Display name for the command
 * @param {string} [cwd] Working directory in which to run the command
 */
function execSync(cmd, displayName, cwd = process.cwd()) {
  // delay copying the env so that mods to the process.env are captured
  const env = Object.assign({}, process.env);
  env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

  logStatus(chalk.gray('Executing: ') + chalk.cyan(displayName || cmd));

  child_process.execSync(cmd, {
    cwd,
    env,
    stdio: 'inherit'
  });
}

module.exports = execSync;
