import { parallel, series, task } from 'gulp';
import yargs from 'yargs';

import jest, { JestPluginConfig } from '../plugins/gulp-jest';

import config from '../../config';

const argv = yargs
  .option('runInBand', {})
  .option('maxWorkers', {})
  .option('detectLeaks', {})
  .option('coverage', { default: true })
  .option('testNamePattern', { alias: 't' })
  .option('testFilePattern', { alias: 'F' }).argv;

const jestConfigFromArgv: Partial<JestPluginConfig> = {
  runInBand: argv.runInBand as boolean,
  coverage: argv.coverage as boolean,
  maxWorkers: argv.maxWorkers as number,
  detectLeaks: argv.detectLeaks as boolean,
  testNamePattern: argv.testNamePattern as string,
  testFilePattern: argv.testFilePattern as string,
};

if (process.env.TF_BUILD) {
  jestConfigFromArgv.maxWorkers = 2;
}

task(
  'test:jest',
  jest({
    config: './jest.config.js',
    ...jestConfigFromArgv,
  }),
);

task(
  'test:jest:watch',
  jest({
    config: './jest.config.js',
    watchAll: true,
    ...jestConfigFromArgv,
  }),
);

// ----------------------------------------
// Tests
// ----------------------------------------

if (config.isRoot) {
  // If running at root, define test and test:watch to build doc-related pre-reqs
  task('test:jest:setup', parallel('build:docs:component-info', 'build:docs:component-menu-behaviors'));
  task('test', series('test:jest:setup', 'test:jest'));
  task('test:watch', series('test:jest:setup', parallel('test:jest:watch', 'watch:docs:component-info')));
} else {
  task('test', series('test:jest'));
  task('test:watch', series('test:jest:watch'));
}
