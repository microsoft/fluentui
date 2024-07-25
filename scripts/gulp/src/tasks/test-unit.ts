import { series, task } from 'gulp';
import yargs from 'yargs';

import jest, { JestPluginConfig } from '../plugins/gulp-jest';

const argv = yargs
  .option('cache', {})
  .option('runInBand', {})
  .option('maxWorkers', {})
  .option('workerThreads', {})
  .option('detectLeaks', {})
  .option('coverage', {})
  .option('testNamePattern', { alias: 't' })
  .option('testFilePattern', { alias: 'F' }).argv;

const jestConfigFromArgv: Partial<JestPluginConfig> = {
  cache: argv.cache as boolean,
  runInBand: argv.runInBand as boolean,
  coverage: argv.coverage as boolean,
  maxWorkers: argv.maxWorkers as number,
  workerThreads: argv.workerThreads as number,
  detectLeaks: argv.detectLeaks as boolean,
  testNamePattern: argv.testNamePattern as string,
  testFilePattern: argv.testFilePattern as string,
};

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

task('test', series('test:jest'));
task('test:watch', series('test:jest:watch'));
