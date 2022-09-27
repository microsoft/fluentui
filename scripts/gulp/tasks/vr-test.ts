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
  const handlePromiseExit = (promise: Promise<void>) =>
    promise
      .then(() => {
        cb();
        process.exit(0);
      })
      .catch(err => {
        cb(err);
        process.exit(1);
      });

  const envVariables = getEnvVariables('SCREENER_API_KEY', 'BUILD_SOURCEBRANCHNAME', 'DEPLOYURL');

  const screenerConfig = getConfig({
    screenerApiKey: envVariables.SCREENER_API_KEY,
    sourceBranchName: envVariables.BUILD_SOURCEBRANCHNAME,
    deployUrl: envVariables.DEPLOYURL,
  });

  if (process.env.IS_ARTIFACT_PRESENT === 'true') {
    const screenerStates = require(paths.docsDist('screenerStates.json'));
    screenerConfig.states = screenerStates;
  }

  handlePromiseExit(screenerRunner(screenerConfig));
});

function getEnvVariables<T extends string[]>(...values: T) {
  return values.reduce((acc, value) => {
    const envVarValue = process.env[value];
    if (!envVarValue) {
      throw new Error(`Env variable: ${value} is not defined`);
    }

    acc[value as T[number]] = envVarValue;

    return acc;
  }, {} as Record<T[number], string>);
}
