import config from '@uifabric/build/config';
import sh from '@uifabric/build/gulp/sh';
import fs from 'fs-extra';
import path from 'path';
import portfinder from 'portfinder';

import { addResolutionPathsForProjectPackages, packProjectPackages } from './packPackages';
import { performBrowserTest } from './performBrowserTest';
import { createTempDir, log } from './utils';

export async function nextjs() {
  const logger = log('test:projects:nextjs');

  const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/nextjs'));
  const tmpDirectory = createTempDir('project-nextjs-');

  logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

  const dependencies = ['next', 'react', 'react-dom'].join(' ');
  await sh(`yarn add ${dependencies}`, tmpDirectory);
  logger(`✔️ Dependencies were installed`);

  const packedPackages = await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(tmpDirectory);

  await sh(`yarn add ${packedPackages['@fluentui/react-northstar']}`, tmpDirectory);
  logger(`✔️ Fluent UI packages were added to dependencies`);

  fs.mkdirSync(path.resolve(tmpDirectory, 'pages'));
  fs.copyFileSync(scaffoldPath('index.js'), path.resolve(tmpDirectory, 'pages', 'index.js'));
  logger(`✔️ Source and bundler's config were created`);

  await sh(`yarn next build`, tmpDirectory);
  await sh(`yarn next export`, tmpDirectory);
  logger(`✔️ Example project was successfully built: ${tmpDirectory}`);

  await performBrowserTest(path.resolve(tmpDirectory, 'out'), await portfinder.getPortPromise());
  logger(`✔️ Browser test was passed`);
}
