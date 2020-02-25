import express from 'express';
import fs from 'fs';
import { series, task } from 'gulp';
import { rollup as lernaAliases } from 'lerna-alias';
import path from 'path';
import portfinder from 'portfinder';
import puppeteer from 'puppeteer';
import sh from '../sh';
import del from 'del';

import config from '../../config';
import tmp from 'tmp';
import http from 'http';
import { safeLaunchOptions } from '../../puppeteer/puppeteer.config';

type PackedPackages = Record<string, string>;

const { paths } = config;

const log = (context: string) => (message: string) => {
  console.log();
  console.log('='.repeat(80));
  console.log(`${context} : ${message}`);
  console.log('='.repeat(80));
};

export const runIn = targetPath => cmd => sh(cmd, targetPath);

const addResolutionPathsForProjectPackages = async (testProjectDir: string, packedPackages: PackedPackages) => {
  const packageJsonPath = path.resolve(testProjectDir, 'package.json');
  const packageJson = require(packageJsonPath);

  packageJson.resolutions = packageJson.resolutions || {};
  Object.keys(packedPackages).forEach(packageName => {
    packageJson.resolutions[`**/${packageName}`] = `file:${packedPackages[packageName]}`;
  });

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

const packProjectPackages = async (logger: Function): Promise<PackedPackages> => {
  // packages/react/src -> packages/react,
  // as lernaAliases append 'src' by default
  const projectPackages = lernaAliases({ sourceDirectory: false });

  // We don't want to pack a package with our dev tools
  delete projectPackages['@fluentui/digest'];
  delete projectPackages['@fluentui/docs'];
  delete projectPackages['@fluentui/e2e'];
  delete projectPackages['@fluentui/eslint-plugin'];
  delete projectPackages['@uifabric/build'];
  delete projectPackages['@fluentui/perf'];
  delete projectPackages['@fluentui/perf-test'];
  delete projectPackages['@fluentui/scripts'];

  await Promise.all(
    Object.keys(projectPackages).map(async (packageName: string) => {
      const filename = tmp.tmpNameSync({ prefix: `project-`, postfix: '.tgz' });
      const directory = projectPackages[packageName];

      await runIn(directory)(`yarn pack --filename ${filename}`);
      logger(`✔️Package "${packageName}" was packed to ${filename}`);

      projectPackages[packageName] = filename;
    })
  );

  return projectPackages;
};

const createReactApp = async (atTempDirectory: string, appName: string): Promise<string> => {
  const atDirectorySubpath = paths.withRootAt(atTempDirectory);

  // we need this temp sibling project to install create-react-app util without polluting
  // global state, as well as the scope of test project
  const tempUtilProjectPath = atDirectorySubpath('util');
  const appProjectPath = atDirectorySubpath(appName);

  fs.mkdirSync(tempUtilProjectPath);

  try {
    // restoring bits of create-react-app inside util project
    await runIn(tempUtilProjectPath)('yarn add create-react-app');

    // create test project with util's create-react-app
    fs.mkdirSync(appProjectPath);
    await runIn(tempUtilProjectPath)(`yarn create-react-app ${appProjectPath} --typescript`);
  } finally {
    // remove temp util directory
    del.sync(tempUtilProjectPath, { force: true });
  }

  return appProjectPath;
};

const startServer = (publicDirectory: string, listenPort: number) =>
  new Promise<http.Server>((resolve, reject) => {
    const app = express();
    app.use(express.static(publicDirectory));

    const server = app.listen(listenPort, config.server_host, e => {
      if (e) return reject(e);

      resolve(server);
    });
  });

const performBrowserTest = async (publicDirectory: string, listenPort: number) => {
  const server = await startServer(publicDirectory, listenPort);

  const browser = await puppeteer.launch(safeLaunchOptions());
  const page = await browser.newPage();
  let error: Error;

  page.on('console', message => {
    if (message.type() === 'error') {
      error = new Error(`[Browser]: console.error(${message.text()})`);
    }
  });
  page.on('pageerror', pageError => {
    error = pageError;
  });

  await page.goto(`http://${config.server_host}:${listenPort}`);

  await page.close();
  await browser.close();
  await new Promise(resolve => server.close(resolve));

  if (error) throw error;
};

// Tests the following scenario
//  - Create a new react test app
//  - Add Fluent UI as a app's dependency
//  - Update the App.tsx to include some project imports
//  - Try and run a build
task('test:projects:cra-ts', async () => {
  const logger = log('test:projects:cra-ts');
  const scaffoldPath = paths.base.bind(null, 'scripts/gulp/tasks/test-projects/cra');

  logger('STEP 1. Create test React project with TSX scripts..');

  const testAppPath = paths.withRootAt(await createReactApp(tmp.dirSync({ prefix: 'project-' }).name, 'test-app'));

  const runInTestApp = runIn(testAppPath());
  logger(`Test React project is successfully created: ${testAppPath()}`);

  logger('STEP 2. Add Fluent UI dependency to test project..');

  const packedPackages = await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(testAppPath(), packedPackages);
  await runInTestApp(`yarn add ${packedPackages['@fluentui/react']}`);
  logger(`✔️Fluent UI packages were added to dependencies`);

  logger("STEP 3. Reference Fluent UI components in test project's App.tsx");
  fs.copyFileSync(scaffoldPath('App.tsx'), testAppPath('src', 'App.tsx'));

  logger('STEP 4. Build test project..');
  await runInTestApp(`yarn build`);

  await performBrowserTest(testAppPath('build'), await portfinder.getPortPromise());
  logger(`✔️Browser test was passed`);
});

task('test:projects:rollup', async () => {
  const logger = log('test:projects:rollup');

  const scaffoldPath = paths.base.bind(null, 'scripts/gulp/tasks/test-projects/rollup');
  const tmpDirectory = tmp.dirSync({ prefix: 'project-' }).name;

  logger(`✔️Temporary directory was created: ${tmpDirectory}`);

  const dependencies = [
    'rollup',
    'rollup-plugin-replace',
    'rollup-plugin-commonjs',
    'rollup-plugin-node-resolve',
    'rollup-plugin-json',
    'react',
    'react-dom'
  ].join(' ');
  await runIn(tmpDirectory)(`yarn add ${dependencies}`);
  logger(`✔️Dependencies were installed`);

  const packedPackages = await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(tmpDirectory, packedPackages);
  await runIn(tmpDirectory)(`yarn add ${packedPackages['@fluentui/react']}`);
  logger(`✔️Fluent UI packages were added to dependencies`);

  fs.copyFileSync(scaffoldPath('app.js'), path.resolve(tmpDirectory, 'app.js'));
  fs.copyFileSync(scaffoldPath('rollup.config.js'), path.resolve(tmpDirectory, 'rollup.config.js'));
  fs.copyFileSync(scaffoldPath('index.html'), path.resolve(tmpDirectory, 'index.html'));
  logger(`✔️Source and bundler's config were created`);

  await runIn(tmpDirectory)(`yarn rollup -c`);
  logger(`✔️Example project was successfully built: ${tmpDirectory}`);

  await performBrowserTest(tmpDirectory, await portfinder.getPortPromise());
  logger(`✔️Browser test was passed`);
});

task('test:projects:typings', async () => {
  const logger = log('test:projects:typings');

  const scaffoldPath = paths.base.bind(null, 'scripts/gulp/tasks/test-projects/typings');
  const tmpDirectory = tmp.dirSync({ prefix: 'project-' }).name;

  logger(`✔️Temporary directory was created: ${tmpDirectory}`);

  const dependencies = ['@types/react', '@types/react-dom', 'react', 'react-dom', 'typescript'].join(' ');
  await runIn(tmpDirectory)(`yarn add ${dependencies}`);
  logger(`✔️Dependencies were installed`);

  const packedPackages = await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(tmpDirectory, packedPackages);
  await runIn(tmpDirectory)(`yarn add ${packedPackages['@fluentui/react']}`);
  logger(`✔️Fluent UI packages were added to dependencies`);

  fs.mkdirSync(path.resolve(tmpDirectory, 'src'));
  fs.copyFileSync(scaffoldPath('index.tsx'), path.resolve(tmpDirectory, 'src/index.tsx'));
  fs.copyFileSync(scaffoldPath('tsconfig.json'), path.resolve(tmpDirectory, 'tsconfig.json'));
  logger(`✔️Source and configs were copied`);

  await runIn(tmpDirectory)(`yarn tsc --noEmit`);
  logger(`✔️Example project was successfully built: ${tmpDirectory}`);
});

task('test:projects', series('test:projects:cra-ts', 'test:projects:rollup', 'test:projects:typings'));
