import path from 'path';

import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
  prepareTempDirs,
  log,
  shEcho,
  performBrowserTest,
  prepareCreateReactApp,
  generateFiles,
} from '@fluentui/scripts-projects-test';

/**
 * Tests the following scenario:
 *  - Create a new react test app
 *  - Add Fluent UI as a app's dependency
 *  - Update the App.tsx to include some project imports
 *  - Try and run a build
 */
export async function createReactApp() {
  const logger = log('test:projects:cra-ts');
  const scaffoldPathRoot = path.resolve(__dirname, '../assets/cra');

  const tempPaths = prepareTempDirs('project-cra-');
  logger(`✔️ Temporary directories created under ${tempPaths.root}`);

  logger('STEP 1. Create test React project with TSX scripts..');

  await prepareCreateReactApp(tempPaths, 'typescript');
  const testAppPathRoot = tempPaths.testApp;
  logger(`Test React project is successfully created: ${testAppPathRoot}`);

  logger('STEP 2. Add Fluent UI dependency to test project..');

  const packedPackages = await packProjectPackages(logger, '@fluentui/react-northstar');
  await addResolutionPathsForProjectPackages(testAppPathRoot);

  await shEcho(`yarn add ${packedPackages['@fluentui/react-northstar']}`, testAppPathRoot);
  logger(`✔️ Fluent UI packages were added to dependencies`);

  logger("STEP 3. Reference Fluent UI components in test project's App.tsx");
  generateFiles(scaffoldPathRoot, testAppPathRoot);

  logger('STEP 4. Build test project..');
  await shEcho(`yarn build`, testAppPathRoot);

  logger('STEP 5. Load the test app in the browser');
  await performBrowserTest(path.resolve(testAppPathRoot, 'build'));
  logger(`✔️ Browser test was passed`);
}
