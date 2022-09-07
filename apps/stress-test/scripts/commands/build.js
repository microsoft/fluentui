const { exec } = require('child_process');
const { promisify } = require('util');
const configureYargs = require('../utils/configureYargs');
const webpack = require('webpack');
const webpackConfig = require('../../webpack/webpack.config');

const execAsync = promisify(exec);

/**
 * @typedef {Object} CLIBuildOptions
 * @property {string} griffelMode
 * @property {string} mode
 * @property {boolean} verbose
 * @property {boolean} buildDeps
 */

const command = 'build';

/**
 * @param {CLIBuildOptions} argv
 * @returns {Promise}
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
        }
        return reject();
      }

      console.log(
        stats.toString({
          colors: true, // Shows colors in the console
        }),
      );

      resolve();
    });
  });
};

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
