import { task, series } from 'gulp';
import { argv } from 'yargs';

import sh from '../sh';
import config from '../../config';

const { paths } = config;

// ----------------------------------------
// Visual
// ----------------------------------------

task('screener:runner', cb => {
  // screener-runner doesn't allow to pass custom options
  if (argv.filter) process.env.SCREENER_FILTER = argv.filter as string;

  // kill the server when done
  sh(`screener-runner --conf ${paths.base('scripts/screener/screener.config.js')}`)
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

task('screener', series('screener:runner'));
