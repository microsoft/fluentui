import config from '@fluentui/scripts/config';
import sh from '@fluentui/scripts/gulp/sh';
import fs from 'fs-extra';
import path from 'path';

import { addResolutionPathsForProjectPackages, packProjectPackages } from './packPackages';
import { createTempDir, log } from './utils';

export async function typings() {
  const logger = log('test:typescript-3.9-react:typings');
  const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/typings'));
  const tmpDirectory = createTempDir('typescript-3.9-react-typings-');

  logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

  // Install dependencies, ensuring we specify the same TS version as our projects use
  const tsVersion = '3.9';
  const dependencies = ['@types/react', '@types/react-dom', 'react', 'react-dom', `typescript@${tsVersion}`].join(' ');
  await sh(`yarn add ${dependencies}`, tmpDirectory);
  logger(`✔️ Dependencies were installed`);

  const packedPackages = await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(tmpDirectory);

  await sh(`yarn add ${packedPackages['@fluentui/react']}`, tmpDirectory);
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
}
