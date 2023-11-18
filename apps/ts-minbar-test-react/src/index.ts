import * as path from 'path';

import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
  prepareTempDirs,
  log,
  shEcho,
  TempPaths,
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

    // Install dependencies, using the minimum TS version supported for consumers
    const dependencies = [
      '@types/node@14',
      `@types/react@17`,
      '@types/react-dom@17',
      'react@17',
      'react-dom@17',
      `typescript@${tsVersion}`,
    ].join(' ');
    await shEcho(`yarn add ${dependencies}`, tempPaths.testApp);
    logger(`✔️ Dependencies were installed`);

    const packedPackages = await packProjectPackages(logger, '@fluentui/react');
    await addResolutionPathsForProjectPackages(tempPaths.testApp);

    await shEcho(`yarn add ${packedPackages['@fluentui/react']}`, tempPaths.testApp);
    logger(`✔️ Fluent UI packages were added to dependencies`);

    generateFiles(scaffoldPathRoot, tempPaths.testApp);
    logger(`✔️ Source and configs were copied`);

    await shEcho(`npx npm-which yarn`);

    await shEcho(`yarn --version`);
    await shEcho(`yarn tsc --version`);
    await shEcho(`yarn tsc --version`, tempPaths.testApp);
  } catch (err) {
    console.error('Something went wrong setting up the test:');
    console.error(err instanceof Error ? err?.stack : err);
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
