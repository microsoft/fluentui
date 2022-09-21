import { task } from 'gulp';
import { argv } from 'yargs';

import config from '../../config';
import { getAllPackageInfo } from '../../monorepo';
import { screenerRunner } from '../../screener/screener.runner';
import getConfig from '../../screener/screener.config';

const { paths } = config;
const docsPackageName = '@fluentui/docs';

// ----------------------------------------
// Visual
// ----------------------------------------

task('screener:runner', cb => {
  // screener-runner doesn't allow to pass custom options
  if (argv.filter) process.env.SCREENER_FILTER = argv.filter as string;

  const packageInfos = getAllPackageInfo();
  if (Object.values(packageInfos).every(packageInfo => packageInfo.packageJson.name !== docsPackageName)) {
    throw new Error(`package ${docsPackageName} does not exist in the repo`);
  }

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

  const screenerConfig = getConfig({
    screenerApiKey: process.env.SCREENER_API_KEY,
    sourceBranchName: process.env.BUILD_SOURCEBRANCHNAME,
    deployUrl: process.env.DEPLOYURL,
  });

  if (process.env.IS_ARTIFACT_PRESENT === 'true') {
    const screenerStates = require(paths.docsDist('screenerStates.json'));
    screenerConfig.states = screenerStates;
  }

  handlePromiseExit(screenerRunner(screenerConfig));
});
