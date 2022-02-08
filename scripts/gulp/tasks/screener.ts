import { task, series } from 'gulp';
import { argv } from 'yargs';

import config from '../../config';
import { getChangedPackages } from '../../monorepo';
import { screenerRunner, cancelScreenerRun } from '../../screener/screener.runner';

const { paths } = config;

// ----------------------------------------
// Visual
// ----------------------------------------

task('screener:runner', cb => {
  // screener-runner doesn't allow to pass custom options
  if (argv.filter) process.env.SCREENER_FILTER = argv.filter as string;

  const changedPackages = getChangedPackages();
  const screenerConfigPath = paths.base('scripts/screener/screener.config.js');

  // kill the server when done
  const handlePromiseExit = promise =>
    promise
      .then(() => {
        cb();
        process.exit(0);
      })
      .catch(err => {
        cb(err);
        process.exit(1);
      });

  const screenerConfig = require(screenerConfigPath);

  if (changedPackages.has('@fluentui/docs')) {
    handlePromiseExit(screenerRunner(screenerConfig));
  } else {
    handlePromiseExit(cancelScreenerRun(screenerConfig, 'skipped'));
  }
});

// ----------------------------------------
// Default
// ----------------------------------------

task('screener:build', series('build:docs'));
