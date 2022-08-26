const { getBrowsers } = require('./getBrowsers');

/**
 * @typedef {Object.<string, import('yargs').Options} YargsOptions
 */

const cliOptions = {
  scenario: {
    describe: 'Scenario to run',
    demand: true,
  },
  'test-cases': {
    describe: 'List of test cases to run for the scenario. E.g., test1 test2',
  },
  sizes: {
    describe: 'Sizes of each test case.',
    default: ['s', 'm', 'l'],
  },
  browsers: {
    describe: 'List of browsers to run against.',
    default: getBrowsers(),
  },
  'sample-size': {
    describe: 'Number of samples to run for each test case.',
    default: 25,
  },
  targets: {
    describe: 'Libraries to target.',
    default: ['v8', 'v9', 'wc'],
  },
  'use-config': {
    describe: 'Use options from config, overriding any config values with command line arguments.',
    default: true,
  },
  'process-results': {
    describe: 'Process the test results for display.',
    default: true,
  },
  port: {
    describe: 'Port for test server.',
    default: 8080,
  },
  root: {
    describe: 'Root folder for test server relative to package root.',
    default: 'dist',
  },
};

/**
 *
 * @param {import('yargs').Argv} yargs
 * @param {YargsOptions} options
 */
const configure = (yargs, options) => {
  let y = yargs.options(options);

  Object.keys(options).forEach(option => {
    switch (option) {
      case 'test-cases':
      case 'browsers':
      case 'targets':
        y = y.array(option);
        break;

      case 'sizes':
        y = y.array(option).choices(option, ['xs', 's', 'm', 'l', 'xl']);
        break;

      case 'sample-size':
      case 'port':
        y = y.number(option);
        break;

      case 'use-config':
      case 'process-results':
        y = y.boolean(option);
    }
  });
};

/**
 *
 * @param {string} command
 * @param {import('yargs').Argv} yargs
 */
const configureYargs = (command, yargs) => {
  switch (command) {
    case 'build-test-config': {
      const { 'process-results': processResults, ...buildTestOptions } = cliOptions;
      configure(yargs, buildTestOptions);
      break;
    }

    case 'run': {
      configure(yargs, cliOptions);
      break;
    }

    case 'process-results': {
      const { scenario } = cliOptions;
      configure(yargs, { scenario });
      break;
    }

    case 'serve': {
      const { port, root } = cliOptions;
      configure(yargs, { port, root });
      break;
    }

    case 'tachometer': {
      const { scenario } = cliOptions;
      configure(yargs, { scenario });
      break;
    }
  }
};

module.exports = configureYargs;
