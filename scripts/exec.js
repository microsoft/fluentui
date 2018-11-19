const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');
const stream = require('stream');
const { logStatus } = require('./logging');

const SEPARATOR = process.platform === 'win32' ? ';' : ':',
  env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

module.exports = function(cmd, displayName, cwd = process.cwd(), opts = {}) {
  logStatus(chalk.gray('Executing: ') + chalk.cyan(displayName || cmd));

  const execOptions = {
    cwd,
    env: env,
    encoding: 'utf8'
  };

  return new Promise((resolve, reject) => {
    const child = exec(
      cmd,
      execOptions,
      (error, stdout, stderr) =>
        error
          ? reject({
              error,
              stdout: stdout,
              stderr: stderr
            })
          : resolve({
              stdout: stdout,
              stderr: stderr
            })
    );

    if (opts.stdout) {
      child.stdout.pipe(opts.stdout);
    }
    if (opts.stderr) {
      child.stderr.pipe(opts.stderr);
    }
  });
};
