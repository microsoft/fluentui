const { exec } = require('child_process');
const { promisify } = require('util');
const configureYargs = require('../utils/configureYargs');
const webpack = require('webpack');
const webpackConfig = require('../../webpack/webpack.config');

const execAsync = promisify(exec);

/**
 * @typedef {Object} CLIBuildOptions
<<<<<<< HEAD
 * @property {import('../../webpack/griffelConfig.js').GriffelMode} griffelMode
 * @property {('development' | 'production' | 'none')} mode
 * @property {boolean} verbose
 * @property {boolean} buildDeps
 */

const command = 'build';

/**
 * @param {CLIBuildOptions} argv
 * @returns {Promise<void>}
=======
 * @property {string} griffelMode
 * @property {string} mode
 * @property {boolean} verbose
 */

const command = 'build';
exports.command = command;
exports.describe = 'Builds the application.';

exports.builder = yargs => {
  configureYargs(command, yargs);
};

/**
 * @param {CLIBuildOptions} argv
 * @returns {Promise}
>>>>>>> a82206debc (stress-test: add build commands)
 */
const run = async argv => {
  if (argv.buildDeps) {
    const deps = ['@fluentui/react', '@fluentui/web-components'];
    console.log('Building dependencies', deps.join(', '));
    const cmd = `lage build --to ${deps.join(' ')} ${argv.verbose ? '--verbose' : ''}`;
    console.log(`Run: ${cmd}`);
    await execAsync(cmd);
    console.log(`Finished building dependencies!`);
  }

  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    const config = webpackConfig(undefined, { griffelMode: argv.griffelMode, mode: argv.mode });
    webpack(config, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        return reject();
      }

      if (stats && stats.hasErrors()) {
        const { errors } = stats.toJson();
        errors &&
          errors.forEach(error => {
            console.error(error.message);
            if (argv.verbose) {
              error.details && console.error(error.details);
              error.stack && console.error(error.stack);
            }
          });

        if (stats.hasWarnings()) {
          const { warnings } = stats.toJson();
          warnings &&
            warnings.forEach(warning => {
              console.warn(warning.message);
              if (argv.verbose) {
                warning.details && console.warn(warning.details);
                warning.stack && console.warn(warning.stack);
              }
            });
=======
    const config = webpackConfig(undefined, argv);
    webpack(config, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (argv.verbose && err.details) {
          console.error(err.details);
        }
        return reject();
      } else if (stats.hasErrors()) {
        const { errors } = stats.toJson();
        errors.forEach(error => {
          console.error(error.message);
          if (argv.verbose) {
            error.details && console.error(error.details);
            error.stack && console.error(error.stack);
          }
        });

        if (stats.hasWarnings()) {
          const { warnings } = stats.toJson();
          warnings.forEach(warning => {
            console.warn(warning.message);
            if (argv.verbose) {
              warning.details && console.warn(warning.details);
              warning.stack && console.warn(warning.stack);
            }
          });
>>>>>>> a82206debc (stress-test: add build commands)
        }
        return reject();
      }

<<<<<<< HEAD
      if (stats) {
        console.log(
          stats.toString({
            colors: true, // Shows colors in the console
          }),
        );
      }
=======
      console.log(
        stats.toString({
          colors: true, // Shows colors in the console
        }),
      );
>>>>>>> a82206debc (stress-test: add build commands)

      resolve();
    });
  });
};

<<<<<<< HEAD
/** @type {import('yargs').CommandModule} */
const api = {
  command,
  describe: 'Builds the application.',
  builder: yargs => {
    configureYargs(command, yargs);
  },
  /**
   * @param {CLIBuildOptions} argv
   */
  handler: argv => {
    run(argv).then(() => {
      console.log('Build complete!');
    });
  },
};

module.exports = api;
=======
/**
 * @param {CLIBuildOptions} argv
 */
exports.handler = argv => {
  run(argv).then(() => {
    console.log('Build complete!');
  });
};
>>>>>>> a82206debc (stress-test: add build commands)
