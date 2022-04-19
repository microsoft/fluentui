import config from '@fluentui/scripts/config';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
} from '@fluentui/scripts/projects-test/packPackages';
import { prepareTempDirs, log, shEcho, TempPaths } from '@fluentui/scripts/projects-test/utils';

const tsVersion = '3.9';
const testName = 'ts-minbar-react';

async function performTest() {
  let tempPaths: TempPaths;
  const logger = log(`test:${testName}`);

  try {
    const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/'));

    tempPaths = prepareTempDirs(`${testName}-`);
    logger(`✔️ Temporary directories created under ${tempPaths.root}`);

    // Install dependencies, using the minimum TS version supported for consumers
    const dependencies = [
      '@types/node',
      '@types/react@17',
      '@types/react-dom@17',
      'react@17',
      'react-dom@17',
      `typescript@${tsVersion}`,
    ].join(' ');
    await shEcho(`yarn add ${dependencies}`, tempPaths.testApp);
    logger(`✔️ Dependencies were installed`);

    const lernaRoot = config.paths.allPackages();
    const packedPackages = await packProjectPackages(logger, lernaRoot, ['@fluentui/react']);
    await addResolutionPathsForProjectPackages(tempPaths.testApp);

    await shEcho(`yarn add ${packedPackages['@fluentui/react']}`, tempPaths.testApp);
    logger(`✔️ Fluent UI packages were added to dependencies`);

    fs.mkdirSync(path.join(tempPaths.testApp, 'src'));
    fs.copyFileSync(scaffoldPath('index.tsx'), path.join(tempPaths.testApp, 'src/index.tsx'));
    fs.copyFileSync(scaffoldPath('tsconfig.json'), path.join(tempPaths.testApp, 'tsconfig.json'));
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
