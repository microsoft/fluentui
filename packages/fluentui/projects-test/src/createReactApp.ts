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
  logger(`Test React project is successfully created: ${testAppPath()}`);

  logger('STEP 2. Add Fluent UI dependency to test project..');

  const packedPackages = await packProjectPackages(logger, config.paths.packages(), ['@fluentui/react-northstar']);
  await addResolutionPathsForProjectPackages(testAppPath());

  /**
   * This is a temporary quick-fix solution. Remove once issue with mini-css-extract-plugin
   * is resolved @see https://github.com/facebook/create-react-app/issues/11930
   */
  const parsedJSON = JSON.parse(fs.readFileSync(`${tempPaths.testApp}/package.json`, 'utf-8'));
  parsedJSON.resolutions['mini-css-extract-plugin'] = '2.4.5';
  fs.writeFileSync(`${tempPaths.testApp}/package.json`, JSON.stringify(parsedJSON));

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
