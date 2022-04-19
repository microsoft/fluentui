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
} from '@fluentui/scripts/projects-test';

export async function nextjs() {
  const logger = log('test:projects:nextjs');

  const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/nextjs'));
  const tempPaths = prepareTempDirs('project-nextjs-');
  logger(`✔️ Temporary directories created under ${tempPaths.root}`);

  logger('STEP 1. Add dependencies to test project');
  const dependencies = ['next', 'react@17', 'react-dom@17'].join(' ');
  await shEcho(`yarn add ${dependencies}`, tempPaths.testApp);
  logger(`✔️ Dependencies were installed`);

  logger('STEP 2. Add Fluent UI dependency to test project');

  const packedPackages = await packProjectPackages(logger, config.paths.packages(), ['@fluentui/react-northstar']);
  await addResolutionPathsForProjectPackages(tempPaths.testApp);

  await shEcho(`yarn add ${packedPackages['@fluentui/react-northstar']}`, tempPaths.testApp);
  logger(`✔️ Fluent UI packages were added to dependencies`);

  logger('STEP 3. Copy scaffold files to test project');
  fs.mkdirSync(path.resolve(tempPaths.testApp, 'pages'));
  fs.copyFileSync(scaffoldPath('index.js'), path.resolve(tempPaths.testApp, 'pages', 'index.js'));
  logger(`✔️ Source and bundler's config were created`);

  logger('STEP 4. Build test project');
  await shEcho(`yarn next build`, tempPaths.testApp);
  await shEcho(`yarn next export`, tempPaths.testApp);
  logger(`✔️ Example project was successfully built: ${tempPaths.testApp}`);

  logger('STEP 5. Load the test app in the browser');
  await performBrowserTest(path.resolve(tempPaths.testApp, 'out'));
  logger(`✔️ Browser test was passed`);
}
