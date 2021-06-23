#!/usr/bin/env node
const cypress = require('cypress');
const path = require('path');

/**
 * Script that run/opens cypress, since cypress does not support easy config extension
 * Can be removed in favour of native CLI once cypress supports path based config extension
 * https://github.com/cypress-io/cypress/issues/5674
 */

const baseConfig = {
  baseUrl: process.env.DEPLOYURL
    ? // Base path hard coded for converged for now, can be modified to be configurable if required to other projects
      `${process.env.DEPLOYURL}/react-components/storybook`
    : 'http://localhost:3000',
  fixturesFolder: path.relative(process.cwd(), path.resolve(__dirname, 'cypress/fixtures')),
  integrationFolder: '.',
  pluginsFile: path.relative(process.cwd(), path.resolve(__dirname, 'cypress/plugins/index.js')),
  retries: {
    runMode: 2,
    openMode: 0,
  },
  screenshotOnRunFailure: false,
  supportFile: path.relative(process.cwd(), path.resolve(__dirname, 'cypress/support/index.js')),
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

const argv = require('yargs')
  .option('mode', {
    describe: 'Choose a mode to run cypress',
    choices: ['run', 'open'],
  })
  .demandOption('mode').argv;

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
