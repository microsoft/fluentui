import config from '@uifabric/build/config';
import sh from '@uifabric/build/gulp/sh';
import fs from 'fs-extra';
import path from 'path';
import portfinder from 'portfinder';

import { addResolutionPathsForProjectPackages, packProjectPackages } from './packPackages';
import { performBrowserTest } from './performBrowserTest';
import { createTempDir, log } from './utils';

export async function rollup() {
  const logger = log('test:projects:rollup');

  const scaffoldPath = config.paths.withRootAt(path.resolve(__dirname, '../assets/rollup'));
  const tmpDirectory = createTempDir('project-rollup-');

  logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

  const rollupVersion = '2.7.3';
  const dependencies = [
    `rollup@${rollupVersion}`,
    'rollup-plugin-replace',
    'rollup-plugin-commonjs',
    'rollup-plugin-node-resolve',
    'rollup-plugin-json',
    'react',
    'react-dom',
  ].join(' ');

  await sh(`yarn add ${dependencies}`, tmpDirectory);
  logger(`✔️ Dependencies were installed`);

  const packedPackages = await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(tmpDirectory);

  await sh(`yarn add ${packedPackages['@fluentui/react-northstar']}`, tmpDirectory);
  logger(`✔️ Fluent UI packages were added to dependencies`);

  fs.copyFileSync(scaffoldPath('app.js'), path.resolve(tmpDirectory, 'app.js'));
  fs.copyFileSync(scaffoldPath('rollup.config.js'), path.resolve(tmpDirectory, 'rollup.config.js'));
  fs.copyFileSync(scaffoldPath('index.html'), path.resolve(tmpDirectory, 'index.html'));
  logger(`✔️ Source and bundler's config were created`);

  await sh(`yarn rollup -c`, tmpDirectory);
  logger(`✔️ Example project was successfully built: ${tmpDirectory}`);

  await performBrowserTest(tmpDirectory, await portfinder.getPortPromise());
  logger(`✔️ Browser test was passed`);
}
