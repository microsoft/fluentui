import * as fs from 'fs';
import * as path from 'path';

import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
  prepareTempDirs,
  log,
  shEcho,
  TempPaths,
  workspaceRoot,
  generateFiles,
} from '@fluentui/scripts-projects-test';

const tsVersion = '3.9';
const testName = 'ts-minbar-react';

async function performTest() {
  let tempPaths: TempPaths;
  const logger = log(`test:${testName}`);

  try {
    const scaffoldPathRoot = path.resolve(__dirname, '../files');

    tempPaths = prepareTempDirs(`${testName}-`);
    logger(`✔️ Temporary directories created under ${tempPaths.root}`);

    // https://github.com/microsoft/fluentui/issues/27425 - remove related logic once issue will be resolved
    const pinnedReactTypesVersion = '17.0.55';

    // Install dependencies, using the minimum TS version supported for consumers
    const dependencies = [
      '@types/node@14',
      `@types/react@${pinnedReactTypesVersion}`,
      '@types/react-dom@17',
      'react@17',
      'react-dom@17',
      `typescript@${tsVersion}`,
    ].join(' ');
    await shEcho(`yarn add ${dependencies}`, tempPaths.testApp);
    logger(`✔️ Dependencies were installed`);

    const lernaRoot = workspaceRoot;
    const packedPackages = await packProjectPackages(logger, lernaRoot, ['@fluentui/react']);
    await addResolutionPathsForProjectPackages(tempPaths.testApp);

    // Remove Start - once will be resolved https://github.com/microsoft/fluentui/issues/27425
    const jsonPath = path.resolve(tempPaths.testApp, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    packageJson.resolutions['@types/react-dom/@types/react'] = pinnedReactTypesVersion;
    fs.writeFileSync(jsonPath, JSON.stringify(packageJson), 'utf-8');
    // Remove End

    await shEcho(`yarn add ${packedPackages['@fluentui/react']}`, tempPaths.testApp);
    logger(`✔️ Fluent UI packages were added to dependencies`);

    generateFiles(scaffoldPathRoot, tempPaths.testApp);
    logger(`✔️ Source and configs were copied`);

    await shEcho(`npx npm-which yarn`);

    await shEcho(`yarn --version`);
    await shEcho(`yarn tsc --version`);
    await shEcho(`yarn tsc --version`, tempPaths.testApp);
  } catch (e) {
    console.error('Something went wrong setting up the test:');
    console.error(e?.stack || e);
    process.exit(1);
  }

  try {
    await shEcho(`yarn tsc --noEmit`, tempPaths.testApp);
    logger(`✔️ Example project was successfully built with typescript@${tsVersion}`);
  } catch (e) {
    console.error(e);

    console.log('');
    console.error(`Building a test project referencing @fluentui/react using typescript@${tsVersion} failed.`);
    console.error(
      `This is most likely because you added an API in @fluentui/react or a dependency which uses ` +
        `typescript features introduced in a version newer than ${tsVersion} (see logs above for the exact error).`,
    );

    process.exit(1);
  }
}

performTest();
