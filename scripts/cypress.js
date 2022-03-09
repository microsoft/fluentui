#!/usr/bin/env node
const cypress = require('cypress');
const path = require('path');

/**
 * Script that run/opens cypress, since cypress does not support easy config extension.
 * Can be removed in favour of native CLI once cypress supports path-based config extension.
 * https://github.com/cypress-io/cypress/issues/5218
 *
 * To debug cypress tests locally, run the following in your package folder in *separate terminals*:
 * - `yarn start` and make a note of the port
 * - `yarn e2e --mode open --port ####`
 */

const argv = require('yargs')
  .option('mode', {
    describe: 'Choose a mode to run cypress',
    choices: ['run', 'open'],
  })
  .option('package', {
    describe: 'Unscoped package name to load the deployed storybook for (used by PR runs only)',
    default: 'react-components',
    type: 'option',
    choices: ['react-components', 'react'],
  })
  .option('port', {
    describe: 'Port number storybook is running on (used by local runs only)',
    default: 3000,
    type: 'number',
  })
  .demandOption('mode').argv;

const isLocalRun = !process.env.DEPLOYURL;

/** @type {Cypress.ConfigOptions} */
const baseConfig = {
  baseUrl: isLocalRun ? `http://localhost:${argv.port}` : `${process.env.DEPLOYURL}/${argv.package}/storybook`,
  fixturesFolder: path.join(__dirname, 'cypress/fixtures'),
  integrationFolder: '.',
  pluginsFile: path.join(__dirname, 'cypress/plugins/index.js'),
  retries: {
    runMode: 2,
    openMode: 0,
  },
  // Screenshots go under <pkg>/cypress/screenshots and can be useful to look at after failures in
  // local headless runs (especially if the failure is specific to headless runs)
  screenshotOnRunFailure: isLocalRun && argv.mode === 'run',
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
