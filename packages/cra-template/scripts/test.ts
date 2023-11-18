import fs from 'fs';
import path from 'path';
import semver from 'semver';

import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
  performBrowserTest,
  prepareTempDirs,
  log,
  shEcho,
  prepareCreateReactApp,
  TempPaths,
} from '@fluentui/scripts-projects-test';

//  eslint-disable-next-line @typescript-eslint/no-explicit-any
function readJson(filePath: string): Record<string, any> {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
// This test is sort of like `packages/fluentui/projects-test/src/createReactApp.ts`, but it uses
// a custom local template rather than making a generic TS project and adding our project as a dep.
// So they share some logic, but can't be completely merged (and this test shouldn't go under
// projects-test because it needs to run under different scoped build conditions).

/**
 * Ensure the template in this branch is requesting the version of @fluentui/react from this branch.
 * This will probably only be an issue if there's a major version bump.
 */
function verifyVersion() {
  const templateJson = readJson(path.resolve(__dirname, '../template.json'));
  const templateVersion = templateJson.package.dependencies['@fluentui/react'];
  const reactPackageJson = readJson(path.resolve(__dirname, '../../react/package.json'));
  const actualVersion = reactPackageJson.version;
  if (!semver.satisfies(actualVersion, templateVersion)) {
    console.error(
      `@fluentui/react version ${actualVersion} does not satisfy template version range ${templateVersion}.`,
    );
    console.error('Please update the @fluentui/react version listed in cra-template/template.json.');
    process.exit(1);
  }
}

/**
 * If we tested the template as-is, it would install the latest packages from npm, which is pointless.
 * Instead, pack up the locally-built packages and make a copy of the template which references them.
 */
async function prepareTemplate(logger: Function, tempPaths: TempPaths) {
  await packProjectPackages(logger, '@fluentui/react');

  const templatePath = path.join(tempPaths.root, 'cra-template');

  const packageJson = readJson(path.resolve(__dirname, '../package.json'));
  // Copy only the template files that would be installed from npm
  const filesToCopy = [...packageJson.files, 'package.json'];
  const rootDir = path.resolve(__dirname, '..');
  for (const file of filesToCopy) {
    fs.cpSync(path.resolve(rootDir, file), path.join(templatePath, file), { recursive: true });
  }

  await addResolutionPathsForProjectPackages(templatePath, true /*isTemplateJson*/);

  return templatePath;
}

/**
 * Tests the following scenario:
 * - Copy the template to a temp directory
 * - Modify it to reference packed versions of the local packages
 * - Use the template to create a test app
 * - Build and test the test app
 */
async function runE2ETest() {
  const testName = '@fluentui/cra-template';
  const logger = log(testName);

  const tempPaths = prepareTempDirs(`${path.basename(testName)}-`);
  logger(`✔️ Temporary directories created under ${tempPaths.root}`);

  logger('STEP 1. Update template to reference local packages');
  const templatePath = await prepareTemplate(logger, tempPaths);

  logger('STEP 2. Create test React app from template');
  await prepareCreateReactApp(tempPaths, `file:${templatePath}`);
  await shEcho('yarn add cross-env', tempPaths.testApp);
  logger(`✔️ Test React app is successfully created: ${tempPaths.testApp}`);

  logger('STEP 3. Build test app');
  await shEcho(`yarn cross-env CI=1 yarn build`, tempPaths.testApp);

  logger('STEP 4. Run test app tests');
  await shEcho(`yarn cross-env CI=1 yarn test`, tempPaths.testApp);

  logger('STEP 5. Load the test app in the browser');
  await performBrowserTest(path.join(tempPaths.testApp, 'build'));
  logger('✔️ Browser test passed');
}

(async () => {
  verifyVersion();
  await runE2ETest();
})().catch(err => {
  console.error(err.stack || err);
  process.exit(1);
});
