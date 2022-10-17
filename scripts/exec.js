// @ts-check
const child_process = require('child_process');
const chalk = require('chalk');
const { logStatus } = require('./logging');

/**
 * @deprecated Use `child_process.exec` directly.
 * Execute a command.
 *
 * @typedef {{
 *   stdout?: string | Buffer;
 *   stderr?: string | Buffer;
 *   err?: import("child_process").ExecException
 * }} ExecResult
 *
 * @param {string} cmd Command to execute
 * @param {string} [displayName] Display name for the command
 * @param {string} [cwd] Working directory in which to run the command
 * @param {{ stdout?: any; stderr?: any; }} [opts] Pipe stdout/stderr somewhere. Can pass `process` global.
 * @returns {Promise<ExecResult>}
 */
function exec(cmd, displayName, cwd = process.cwd(), opts = {}) {
  logStatus(chalk.gray('Executing: ') + chalk.cyan(displayName || cmd));

  const execOptions = {
    cwd,
    encoding: 'utf8',
  };

  return new Promise((resolve, reject) => {
    const child = child_process.exec(cmd, execOptions, (error, stdout, stderr) =>
      error
        ? reject({
            error,
            stdout: stdout,
            stderr: stderr,
          })
        : resolve({
            stdout: stdout,
            stderr: stderr,
          }),
    );

    if (opts.stdout) {
      child.stdout.pipe(opts.stdout);
    }
    if (opts.stderr) {
      child.stderr.pipe(opts.stderr);
    }
  });
}

module.exports = exec;
