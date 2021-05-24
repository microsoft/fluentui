import { task, series } from 'gulp';
import { argv } from 'yargs';

import config from '../../config';
import { screenerRunner } from '../../screener/screener.runner';

const { paths } = config;

// ----------------------------------------
// Visual
// ----------------------------------------

task('screener:runner', cb => {
  // screener-runner doesn't allow to pass custom options
  if (argv.filter) process.env.SCREENER_FILTER = argv.filter as string;

  // kill the server when done
  screenerRunner(paths.base('scripts/screener/screener.config.js'))
    .then(() => {
      cb();
      process.exit(0);
    })
    .catch(err => {
      cb(err);
      process.exit(1);
    });
});

// ----------------------------------------
// Default
// ----------------------------------------

task('screener:build', series('build:docs:assets:component:info', 'build:docs'));
