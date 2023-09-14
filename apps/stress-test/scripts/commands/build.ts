import * as yargs from 'yargs';
import { CLIBuildOptions } from '../utils/types';

import { exec } from 'child_process';
import { promisify } from 'util';
import configureYargs from '../utils/configureYargs.js';
import webpack from 'webpack';
import webpackConfig from '../../webpack/webpack.config.js';
import { buildDefaultFixtures } from '../utils/fixtures.js';

const execAsync = promisify(exec);

const command = 'build';

const run: (argv: CLIBuildOptions) => Promise<void> = async argv => {
  if (argv.buildDeps) {
    const deps = ['@fluentui/web-components'];
    console.log('Building dependencies', deps.join(', '));
    const cmd = `lage build --to ${deps.join(' ')} ${argv.verbose ? '--verbose' : ''}`;
    console.log(`Run: ${cmd}`);
    await execAsync(cmd);
    console.log(`Finished building dependencies!`);
  }

  return new Promise((resolve, reject) => {
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
        }
        return reject();
      }

      if (stats) {
        console.log(
          stats.toString({
            colors: true, // Shows colors in the console
          }),
        );
      }

      resolve();
    });
  });
};

const api: yargs.CommandModule = {
  command,
  describe: 'Builds the application.',
  builder: y => {
    return configureYargs(command, y);
  },
  handler: argv => {
    const args: CLIBuildOptions = {
      griffelMode: argv.griffelMode as CLIBuildOptions['griffelMode'],
      mode: argv.mode as CLIBuildOptions['mode'],
      verbose: argv.verbose as boolean,
      buildDeps: argv.buildDeps as boolean,
    };

    buildDefaultFixtures();

    run(args).then(() => {
      console.log('Build complete!');
    });
  },
};

export default api;
