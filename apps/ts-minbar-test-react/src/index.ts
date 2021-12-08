import config from '@fluentui/scripts/config';
import sh from '@fluentui/scripts/gulp/sh';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
} from '@fluentui/scripts/projects-test/packPackages';
import { createTempDir, log } from '@fluentui/scripts/projects-test/utils';

const tsVersion = '3.9';

async function performTest() {
  let tmpDirectory: string;
  const logger = log('test:ts-minbar-react');

  try {
    const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/'));
    tmpDirectory = createTempDir('ts-minbar-react-typings-');

    logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

    // Install dependencies, using the minimum TS version supported for consumers
    const dependencies = [
      '@types/node',
      '@types/react',
      '@types/react-dom',
      'react',
      'react-dom',
      `typescript@${tsVersion}`,
    ].join(' ');
    await sh(`yarn add ${dependencies}`, tmpDirectory);
    logger(`✔️ Dependencies were installed`);

    const lernaRoot = config.paths.allPackages();
    const packedPackages = await packProjectPackages(logger, lernaRoot, ['@fluentui/react']);
    await addResolutionPathsForProjectPackages(tmpDirectory);

    await sh(`yarn add ${packedPackages['@fluentui/react']}`, tmpDirectory);
    logger(`✔️ Fluent UI packages were added to dependencies`);

    fs.mkdirSync(path.resolve(tmpDirectory, 'src'));
    fs.copyFileSync(scaffoldPath('index.tsx'), path.resolve(tmpDirectory, 'src/index.tsx'));
    fs.copyFileSync(scaffoldPath('tsconfig.json'), path.resolve(tmpDirectory, 'tsconfig.json'));
    logger(`✔️ Source and configs were copied`);

    await sh(`npx npm-which yarn`);

    await sh(`yarn --version`);
    await sh(`yarn tsc --version`);
    await sh(`yarn tsc --version`, tmpDirectory);
  } catch (e) {
    console.error('Something went wrong setting up the test:');
    console.error(e?.stack || e);
    process.exit(1);
  }

  try {
    await sh(`yarn tsc --noEmit`, tmpDirectory);
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
