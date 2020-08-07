import express from 'express';
import fs from 'fs-extra';
import { series, task } from 'gulp';
import { rollup as lernaAliases } from 'lerna-alias';
import path from 'path';
import portfinder from 'portfinder';
import puppeteer from 'puppeteer';
import sh from '../sh';

import config from '../../config';
import tmp from 'tmp';
import http from 'http';
import { safeLaunchOptions } from '../../puppeteer/puppeteer.config';

type PackedPackages = Record<string, string>;

const { paths } = config;

// Clean up created files/folders on exit, even after exceptions
// (will not catch SIGINT on windows)
tmp.setGracefulCleanup();

/** Shared packed packages between tests since they're not modified by any test */
let packedPackages: PackedPackages;

const log = (context: string) => (message: string) => {
  console.log();
  console.log('='.repeat(80));
  console.log(`${context} : ${message}`);
  console.log('='.repeat(80));
};

const createTempDir = (prefix: string): string => {
  return tmp.dirSync({ prefix, unsafeCleanup: true }).name;
};

const addResolutionPathsForProjectPackages = async (testProjectDir: string) => {
  const packageJsonPath = path.resolve(testProjectDir, 'package.json');
  const packageJson = require(packageJsonPath);

  packageJson.resolutions = packageJson.resolutions || {};
  Object.keys(packedPackages).forEach(packageName => {
    packageJson.resolutions[`**/${packageName}`] = `file:${packedPackages[packageName]}`;
  });

  fs.writeJSONSync(packageJsonPath, packageJson, { spaces: 2 });
};

const packProjectPackages = async (logger: Function): Promise<void> => {
  if (packedPackages) {
    logger(`✔️ Packages already packed`);
    return;
  }

  packedPackages = {};

  // packages/fluentui/react-northstar/src -> packages/fluentui/react-northstar,
  // as lernaAliases append 'src' by default
  const projectPackages = lernaAliases({ sourceDirectory: false });

  const tmpDirectory = createTempDir('project-packed-');
  logger(`✔️ Temporary directory for packed packages was created: ${tmpDirectory}`);

  const excludedPkgs = [
    '@fluentui/digest',
    '@fluentui/docs',
    '@fluentui/e2e',
    '@fluentui/eslint-plugin',
    '@fluentui/perf',
    '@fluentui/perf-test',
  ];

  // other local packages that we depend on, but are not inside packages/fluentui
  const whitelistedPkgs = ['@fluentui/react-compose'];

  for (const [pkg, pkgPath] of Object.entries(projectPackages)) {
    // Don't pack fabric packages or dev tools
    if (path.basename(path.dirname(pkgPath)) !== 'fluentui' || excludedPkgs.includes(pkg)) {
      if (!whitelistedPkgs.includes(pkg)) {
        delete projectPackages[pkg];
      }
    }
  }

  await Promise.all(
    Object.entries(projectPackages).map(async ([packageName, packagePath]) => {
      const filename = path.join(tmpDirectory, path.basename(packageName)) + '.tgz';

      await sh(`yarn pack --filename ${filename}`, packagePath);
      logger(`✔️ Package "${packageName}" was packed to ${filename}`);

      packedPackages[packageName] = filename;
    }),
  );
};

const createReactApp = async (tmpDirectory: string, appName: string): Promise<string> => {
  const atDirectorySubpath = paths.withRootAt(tmpDirectory);

  // we need this temp sibling project to install create-react-app util without polluting
  // global state, as well as the scope of test project
  const tempUtilProjectPath = atDirectorySubpath('util');
  const appProjectPath = atDirectorySubpath(appName);

  fs.mkdirSync(tempUtilProjectPath);

  try {
    // restoring bits of create-react-app inside util project
    await sh('yarn add create-react-app', tempUtilProjectPath);

    // create test project with util's create-react-app
    fs.mkdirSync(appProjectPath);
    await sh(`yarn create-react-app ${appProjectPath} --typescript`, tempUtilProjectPath);
  } finally {
    // remove temp util directory
    fs.removeSync(tempUtilProjectPath);
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
  let error: Error | undefined;

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

  const tmpDirectory = createTempDir('project-cra-');
  logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

  logger('STEP 1. Create test React project with TSX scripts..');

  const testAppPath = paths.withRootAt(await createReactApp(tmpDirectory, 'test-app'));

  logger(`Test React project is successfully created: ${testAppPath()}`);

  logger('STEP 2. Add Fluent UI dependency to test project..');

  await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(testAppPath());
  await sh(`yarn add ${packedPackages['@fluentui/react-northstar']}`, testAppPath());
  logger(`✔️ Fluent UI packages were added to dependencies`);

  logger("STEP 3. Reference Fluent UI components in test project's App.tsx");
  fs.copyFileSync(scaffoldPath('App.tsx'), testAppPath('src', 'App.tsx'));

  logger('STEP 4. Build test project..');
  await sh(`yarn build`, testAppPath());

  await performBrowserTest(testAppPath('build'), await portfinder.getPortPromise());
  logger(`✔️ Browser test was passed`);
});

task('test:projects:rollup', async () => {
  const logger = log('test:projects:rollup');

  const scaffoldPath = paths.base.bind(null, 'scripts/gulp/tasks/test-projects/rollup');
  const tmpDirectory = createTempDir('project-rollup-');

  logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

  const dependencies = [
    'rollup@2.7.3',
    'rollup-plugin-replace',
    'rollup-plugin-commonjs',
    'rollup-plugin-node-resolve',
    'rollup-plugin-json',
    'react',
    'react-dom',
  ].join(' ');
  await sh(`yarn add ${dependencies}`, tmpDirectory);
  logger(`✔️ Dependencies were installed`);

  await packProjectPackages(logger);
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
});

task('test:projects:nextjs', async () => {
  const logger = log('test:projects:nextjs');

  const scaffoldPath = paths.base.bind(null, 'scripts/gulp/tasks/test-projects/nextjs');
  const tmpDirectory = createTempDir('project-nextjs-');

  logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

  const dependencies = ['next', 'react', 'react-dom'].join(' ');
  await sh(`yarn add ${dependencies}`, tmpDirectory);
  logger(`✔️ Dependencies were installed`);

  await packProjectPackages(logger);
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
});

task('test:projects:typings', async () => {
  const logger = log('test:projects:typings');

  const scaffoldPath = paths.base.bind(null, 'scripts/gulp/tasks/test-projects/typings');
  const tmpDirectory = createTempDir('project-typings-');

  logger(`✔️ Temporary directory was created: ${tmpDirectory}`);

  // Install dependencies, ensuring we specify the same TS version as our projects use
  const tsVersion = fs.readJSONSync(paths.base('scripts', 'package.json')).dependencies.typescript;
  const dependencies = ['@types/react', '@types/react-dom', 'react', 'react-dom', `typescript@${tsVersion}`].join(' ');
  await sh(`yarn add ${dependencies}`, tmpDirectory);
  logger(`✔️ Dependencies were installed`);

  await packProjectPackages(logger);
  await addResolutionPathsForProjectPackages(tmpDirectory);
  await sh(`yarn add ${packedPackages['@fluentui/react-northstar']}`, tmpDirectory);
  logger(`✔️ Fluent UI packages were added to dependencies`);

  fs.mkdirSync(path.resolve(tmpDirectory, 'src'));
  fs.copyFileSync(scaffoldPath('index.tsx'), path.resolve(tmpDirectory, 'src/index.tsx'));
  fs.copyFileSync(scaffoldPath('tsconfig.json'), path.resolve(tmpDirectory, 'tsconfig.json'));
  logger(`✔️ Source and configs were copied`);

  await sh(`yarn tsc --noEmit`, tmpDirectory);
  logger(`✔️ Example project was successfully built: ${tmpDirectory}`);
});

task(
  'test:projects',
  series('test:projects:cra-ts', 'test:projects:nextjs', 'test:projects:rollup', 'test:projects:typings'),
);
