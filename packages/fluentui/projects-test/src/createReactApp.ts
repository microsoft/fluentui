import config from '@fluentui/scripts/config';
import fs from 'fs-extra';
import path from 'path';

import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
  prepareTempDirs,
  log,
  shEcho,
  performBrowserTest,
  prepareCreateReactApp,
} from '@fluentui/scripts/projects-test';

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

  const tempPaths = prepareTempDirs('project-cra-');
  logger(`✔️ Temporary directories created under ${tempPaths.root}`);

  logger('STEP 1. Create test React project with TSX scripts..');

  await prepareCreateReactApp(tempPaths, 'typescript');
  const testAppPath = config.paths.withRootAt(tempPaths.testApp);

  // TODO: remove once babel issue is fixed (tracked by https://github.com/microsoft/fluentui/issues/21546)
  logger('Add resolution to work around @babel/core issue');
  const packageJson = fs.readJSONSync(testAppPath('package.json'));
  packageJson.resolutions = { '@babel/core': '7.16.12' };
  fs.writeJSONSync(testAppPath('package.json'), packageJson, { spaces: 2 });
  await shEcho('yarn', testAppPath());

  logger(`Test React project is successfully created: ${testAppPath()}`);

  logger('STEP 2. Add Fluent UI dependency to test project..');

  const packedPackages = await packProjectPackages(logger, config.paths.packages(), ['@fluentui/react-northstar']);
  await addResolutionPathsForProjectPackages(testAppPath());

  await shEcho(`yarn add ${packedPackages['@fluentui/react-northstar']}`, testAppPath());
  logger(`✔️ Fluent UI packages were added to dependencies`);

  logger("STEP 3. Reference Fluent UI components in test project's App.tsx");
  fs.copyFileSync(scaffoldPath('App.tsx'), testAppPath('src', 'App.tsx'));

  logger('STEP 4. Build test project..');
  await shEcho(`yarn build`, testAppPath());

  logger('STEP 5. Load the test app in the browser');
  await performBrowserTest(testAppPath('build'));
  logger(`✔️ Browser test was passed`);
}
