import { task, series } from 'gulp';
import { argv } from 'yargs';

import config from '../../config';
import { getAffectedPackages, getAllPackageInfo, getNthCommit } from '../../monorepo';
import { screenerRunner, cancelScreenerRun } from '../../screener/screener.runner';

const { paths } = config;

// ----------------------------------------
// Visual
// ----------------------------------------

task('screener:runner', cb => {
  // screener-runner doesn't allow to pass custom options
  if (argv.filter) process.env.SCREENER_FILTER = argv.filter as string;

  const docsPackageName = '@fluentui/docs';

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
  let affectedPackages = new Set<string>();
  const isPrBuild = process.env.BUILD_SOURCEBRANCH && process.env.BUILD_SOURCEBRANCH.includes('refs/pull');

  if (isPrBuild) {
    affectedPackages = getAffectedPackages();
  } else {
    // master CI build,
    const previousMasterCommit = getNthCommit();
    affectedPackages = getAffectedPackages(previousMasterCommit);
  }

  debugAffectedGraph(affectedPackages);

  if (!affectedPackages.has(docsPackageName)) {
    handlePromiseExit(cancelScreenerRun(screenerConfig, 'skipped'));
  } else {
    handlePromiseExit(screenerRunner(screenerConfig));
  }
});

/**
 * Outputs debug output for the affected packages graph
 * @param affectedPackages  - set of affected packages
 */
function debugAffectedGraph(affectedPackages: Set<string>) {
  console.log('affected package tree');
  console.log(Array.from(affectedPackages.values()));
}

// ----------------------------------------
// Default
// ----------------------------------------

task('screener:build', series('build:docs'));
