#!/usr/bin/env node
const cypress = require('cypress');
const path = require('path');

/**
 * Script that run/opens cypress, since cypress does not support easy config extension
 * Can be removed in favour of native CLI once cypress supports path based config extension
 * https://github.com/cypress-io/cypress/issues/5674
 */

const argv = require('yargs')
  .option('mode', {
    describe: 'Choose a mode to run cypress',
    choices: ['run', 'open'],
  })
  .option('port', {
    describe: 'Port number storybook is running on',
    default: 3000,
    type: 'number',
  })
  .demandOption('mode').argv;

const baseConfig = {
  baseUrl: process.env.DEPLOYURL
    ? // Base path hard coded for converged for now, can be modified to be configurable if required to other projects
      `${process.env.DEPLOYURL}/react-components/storybook`
    : `http://localhost:${argv.port}`,
  fixturesFolder: path.join(__dirname, 'cypress/fixtures'),
  integrationFolder: '.',
  pluginsFile: path.join(__dirname, 'cypress/plugins/index.js'),
  retries: {
    runMode: 2,
    openMode: 0,
  },
  screenshotOnRunFailure: false,
  // due to https://github.com/cypress-io/cypress/issues/8599 this must point to a path within the package,
  // not a relative path into scripts
  supportFile: 'e2e/support.js',
  testFiles: ['**/e2e/**/*.e2e.ts'],
  video: false,
};

const run = () => {
  return cypress.run({
    configFile: false,
    config: {
      ...baseConfig,
    },
  });
};

const open = () => {
  cypress.open({
    configFile: false,
    config: {
      ...baseConfig,
    },
  });
};

if (argv.mode === 'open') {
  open();
} else {
  return run()
    .then(result => {
      if (result.totalFailed) {
        throw new Error(`${result.totalFailed} failing E2E tests`);
      }
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
