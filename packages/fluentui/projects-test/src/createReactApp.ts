import config from '@uifabric/build/config';
import sh from '@uifabric/build/gulp/sh';
import fs from 'fs-extra';
import path from 'path';
import portfinder from 'portfinder';

import { addResolutionPathsForProjectPackages, packProjectPackages } from './packPackages';
import { createTempDir, log } from './utils';
import { performBrowserTest } from './performBrowserTest';

async function prepareApp(tmpDirectory: string, appName: string): Promise<string> {
  const atDirectorySubpath = config.paths.withRootAt(tmpDirectory);

  // we need this temp sibling project to install create-react-app util without polluting
  // global state, as well as the scope of test project
  const tempUtilProjectPath = atDirectorySubpath('util');
  const appProjectPath = atDirectorySubpath(appName);

  fs.mkdirSync(tempUtilProjectPath);

  try {
    // restoring bits of create-react-app inside util project
    await sh('yarn add create-react-app', tempUtilProjectPath);

    // create test project with util's create-react-app
    fs.mkdirSync(appProjectPath);
    await sh(`yarn create-react-app ${appProjectPath} --template typescript`, tempUtilProjectPath);
  } finally {
    // remove temp util directory
    fs.removeSync(tempUtilProjectPath);
  }

  return appProjectPath;
}

/**
 * Tests the following scenario:
 *  - Create a new react test app
 *  - Add Fluent UI as a app's dependency
 *  - Update the App.tsx to include some project imports
 *  - Try and run a build
 */
export async function createReactApp() {
  const logger = log('test:projects:cra-ts');
  const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/cra'));

  const tmpDirectory = createTempDir('project-cra-');
  logger(`✔️ Temporary directory was created: ${tmpDirectory}`);
  logger('STEP 1. Create test React project with TSX scripts..');

  const testAppPath = config.paths.withRootAt(await prepareApp(tmpDirectory, 'test-app'));
  logger(`Test React project is successfully created: ${testAppPath()}`);
  logger('STEP 2. Add Fluent UI dependency to test project..');

  const packedPackages = await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(testAppPath());

  await sh(`yarn add ${packedPackages['@fluentui/react-northstar']}`, testAppPath());
  logger(`✔️ Fluent UI packages were added to dependencies`);

  logger("STEP 3. Reference Fluent UI components in test project's App.tsx");
  fs.copyFileSync(scaffoldPath('App.tsx'), testAppPath('src', 'App.tsx'));

  logger('STEP 4. Build test project..');
  await sh(`yarn build`, testAppPath());

  await performBrowserTest(testAppPath('build'), await portfinder.getPortPromise());
  logger(`✔️ Browser test was passed`);
}
