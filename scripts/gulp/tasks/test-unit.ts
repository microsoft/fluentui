import { task, series } from 'gulp';
import yargs from 'yargs';

import jest, { JestPluginConfig } from '../plugins/gulp-jest';

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

task('test', series('test:jest'));
task('test:watch', series('test:jest:watch'));
