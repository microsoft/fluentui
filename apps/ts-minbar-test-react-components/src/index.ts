import config from '@fluentui/scripts/config';
import sh from '@fluentui/scripts/gulp/sh';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
} from '@fluentui/scripts/projects-test/packPackages';
import { createTempDir, log } from '@fluentui/scripts/projects-test/utils';

async function performTest() {
  try {
    const logger = log('test:ts-minbar-react-components');
    const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/'));
    const tmpDirectory = createTempDir('ts-minbar-react-components');

    logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

    // Install dependencies, using the minimum TS version supported for consumers
    const tsVersion = '3.9';
    const dependencies = ['@types/react', '@types/react-dom', 'react', 'react-dom', `typescript@${tsVersion}`].join(
      ' ',
    );
    await sh(`yarn add ${dependencies}`, tmpDirectory);
    logger(`✔️ Dependencies were installed`);

    const lernaRoot = config.paths.allPackages();
    const packedPackages = await packProjectPackages(logger, lernaRoot, ['@fluentui/react-components']);
    await addResolutionPathsForProjectPackages(tmpDirectory);

    await sh(`yarn add ${packedPackages['@fluentui/react-components']}`, tmpDirectory);
    logger(`✔️ Fluent UI packages were added to dependencies`);

    fs.mkdirSync(path.resolve(tmpDirectory, 'src'));
    fs.copyFileSync(scaffoldPath('index.tsx'), path.resolve(tmpDirectory, 'src/index.tsx'));
    fs.copyFileSync(scaffoldPath('tsconfig.json'), path.resolve(tmpDirectory, 'tsconfig.json'));
    logger(`✔️ Source and configs were copied`);

    await sh(`which yarn`);

    await sh(`yarn --version`);
    await sh(`yarn tsc --version`);
    await sh(`yarn tsc --version`, tmpDirectory);
    await sh(`yarn tsc --noEmit`, tmpDirectory);
    logger(`✔️ Example project was successfully built: ${tmpDirectory}`);
  } catch (e) {
    console.error(e);

    console.log('');
    console.log(
      '@fluentui/ts-minbar-test-react-components: Test suite failed. Please fix TS 3.9 incompatible code you may have introduced.',
    );

    process.exit(1);
  }
}

performTest();
