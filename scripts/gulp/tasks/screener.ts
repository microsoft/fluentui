import { task, series } from 'gulp';
import { argv } from 'yargs';

import config from '../../config';
import { getAffectedPackages, getAllPackageInfo } from '../../monorepo';
import { screenerRunner, cancelScreenerRun } from '../../screener/screener.runner';

const { paths } = config;

// ----------------------------------------
// Visual
// ----------------------------------------

task('screener:runner', cb => {
  // screener-runner doesn't allow to pass custom options
  if (argv.filter) process.env.SCREENER_FILTER = argv.filter as string;

  const docsPackageName = '@fluentui/docs';

  const changedPackages = getAffectedPackages();
  const packageInfos = getAllPackageInfo();
  if (Object.values(packageInfos).every(packageInfo => packageInfo.packageJson.name !== docsPackageName)) {
    throw new Error(`package ${docsPackageName} does not exist in the repo`);
  }

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
  const isPrBuild = process.env.BUILD_SOURCEBRANCH && process.env.BUILD_SOURCEBRANCH.includes('refs/pull');

  if (!changedPackages.has(docsPackageName) && isPrBuild) {
    handlePromiseExit(cancelScreenerRun(screenerConfig, 'skipped'));
  } else {
    handlePromiseExit(screenerRunner(screenerConfig));
  }
});

// ----------------------------------------
// Default
// ----------------------------------------

task('screener:build', series('build:docs'));
