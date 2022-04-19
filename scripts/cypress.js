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
    default: 'open',
  })
  .demandOption('mode').argv;

const isLocalRun = !process.env.DEPLOYURL;

/** @type {Cypress.ConfigOptions} */
const baseConfig = {
  video: false,
  testFiles: path.join(process.cwd(), '**/*.e2e.tsx'),
  componentFolder: process.cwd(),
  retries: {
    runMode: 2,
    openMode: 0,
  },
  // Screenshots go under <pkg>/cypress/screenshots and can be useful to look at after failures in
  // local headless runs (especially if the failure is specific to headless runs)
  screenshotOnRunFailure: isLocalRun && argv.mode === 'run',
  integrationFolder: '.',
  fixturesFolder: path.join(__dirname, 'cypress/fixtures'),
  supportFile: path.join(__dirname, './cypress/support/index.js'),
  pluginsFile: path.join(__dirname, './cypress/plugins/index.js'),
  env: {
    // Used in ./plugins/index.js to choose the webpack devtool
    mode: argv.mode,
  },
};

const run = () => {
  return cypress.run({
    testingType: 'component',
    configFile: false,
    config: {
      ...baseConfig,
    },
  });
};

const open = () => {
  cypress.open({
    testingType: 'component',
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

      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
