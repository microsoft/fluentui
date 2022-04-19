import config from '@fluentui/scripts/config';
import fs from 'fs-extra';
import path from 'path';

import {
  addResolutionPathsForProjectPackages,
  packProjectPackages,
  prepareTempDirs,
  log,
  shEcho,
} from '@fluentui/scripts/projects-test';

export async function typings() {
  const logger = log('test:projects:typings');

  const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/typings'));
  const tempPaths = prepareTempDirs('project-typings-');
  logger(`✔️ Temporary directories created under ${tempPaths.root}`);

  // Install dependencies, ensuring we specify the same TS version as our projects use
  const rootPkgJson: { devDependencies: Record<string, string> } = fs.readJSONSync(config.paths.base('package.json'));
  const { typescript: tsVersion } = rootPkgJson.devDependencies;

  const dependencies = [
    '@types/react@17',
    '@types/react-dom@17',
    'react@17',
    'react-dom@17',
    `typescript@${tsVersion}`,
  ].join(' ');
  await shEcho(`yarn add ${dependencies}`, tempPaths.testApp);
  logger(`✔️ Dependencies were installed`);

  const packedPackages = await packProjectPackages(logger, config.paths.packages(), ['@fluentui/react-northstar']);
  await addResolutionPathsForProjectPackages(tempPaths.testApp);

  await shEcho(`yarn add ${packedPackages['@fluentui/react-northstar']}`, tempPaths.testApp);
  logger(`✔️ Fluent UI packages were added to dependencies`);

  fs.mkdirSync(path.resolve(tempPaths.testApp, 'src'));
  fs.copyFileSync(scaffoldPath('index.tsx'), path.resolve(tempPaths.testApp, 'src/index.tsx'));
  fs.copyFileSync(scaffoldPath('tsconfig.json'), path.resolve(tempPaths.testApp, 'tsconfig.json'));
  logger(`✔️ Source and configs were copied`);

  await shEcho(`which yarn`);
  await shEcho(`yarn --version`);
  await shEcho(`yarn tsc --version`, tempPaths.testApp);
  await shEcho(`yarn tsc --noEmit`, tempPaths.testApp);
  logger(`✔️ Example project was successfully built: ${tempPaths.testApp}`);
}
