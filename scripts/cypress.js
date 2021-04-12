const cypress = require('cypress');
const path = require('path');

/**
 * Script that run/opens cypress, since cypress does not support easy config extension
 * Can be removed in favour of native CLI once cypress supports path based config extension
 * https://github.com/cypress-io/cypress/issues/5674
 */

const baseConfig = {
  pluginsFile: path.relative(process.cwd(), path.resolve(__dirname, 'cypress/plugins/index.js')),
  supportFile: path.relative(process.cwd(), path.resolve(__dirname, 'cypress/support/index.js')),
  fixturesFolder: path.relative(process.cwd(), path.resolve(__dirname, 'cypress/fixtures')),
  integrationFolder: '.',
  testFiles: ['**/e2e/**/*.test.ts'],
  video: false,
  screenshotOnRunFailure: false,
  baseUrl: 'http://localhost:3000',
};

const run = config => {
  cypress.run({
    configFile: false,
    config: {
      ...baseConfig,
      ...config,
    },
  });
};

const open = config => {
  cypress.open({
    configFile: false,
    config: {
      ...baseConfig,
      ...config,
    },
  });
};

module.exports = config => {
  const argv = require('yargs')
    .option('mode', {
      describe: 'Choose a mode to run cypress',
      choices: ['run', 'open'],
    })
    .demandOption('mode').argv;

  if (argv.mode === 'open') {
    open(config);
  } else {
    run(config);
  }
};
