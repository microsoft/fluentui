const { getBrowsers } = require('./getBrowsers');

/**
 * @typedef {Object.<string, import('yargs').Options>} YargsOptions
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
  'griffel-mode': {
    describe: 'Optimization mode for Griffel.',
    default: 'buildtime',
  },
  mode: {
    describe: 'Build mode.',
    default: 'production',
  },
  verbose: {
    describe: 'Log more messages.',
    default: false,
  },
  'build-deps': {
    describe: 'Build dependencies for the app before building the app itself.',
    default: false,
  },
  open: {
    describe: 'Open the dev server in a new browser window.',
    default: false,
  },
};

/**
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
      case 'verbose':
      case 'build-deps':
      case 'open':
        y = y.boolean(option);
        break;

      case 'griffel-mode':
        y = y.choices(option, ['runtime', 'buildtime', 'extraction']);
        break;

      case 'mode':
        y = y.choices(option, ['production', 'development']);
        break;
    }
  });
};

/**
 * @param {string} command
 * @param {import('yargs').Argv} yargs
 */
const configureYargs = (command, yargs) => {
  switch (command) {
    case 'build-test-config': {
      const {
        scenario,
        'test-cases': testCases,
        sizes,
        browsers,
        'sample-size': sampleSize,
        targets,
        'use-config': useConfig,
        port,
      } = cliOptions;
      configure(yargs, {
        scenario,
        'test-cases': testCases,
        sizes,
        browsers,
        'sample-size': sampleSize,
        targets,
        'use-config': useConfig,
        port,
      });
      break;
    }

    case 'run': {
      const {
        scenario,
        'test-cases': testCases,
        sizes,
        browsers,
        'sample-size': sampleSize,
        targets,
        'use-config': useConfig,
        'process-results': processResults,
        port,
        root,
      } = cliOptions;
      configure(yargs, {
        scenario,
        'test-cases': testCases,
        sizes,
        browsers,
        'sample-size': sampleSize,
        targets,
        'use-config': useConfig,
        'process-results': processResults,
        port,
        root,
      });
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

    case 'build': {
      const { 'griffel-mode': griffelMode, mode, verbose, 'build-deps': buildDeps } = cliOptions;
      configure(yargs, { 'griffel-mode': griffelMode, mode, verbose, 'build-deps': buildDeps });
      break;
    }

    case 'dev': {
      const { mode, open, 'griffel-mode': griffelMode } = cliOptions;
      mode.default = 'development';
      configure(yargs, { mode, open, 'griffel-mode': griffelMode });
      break;
    }
  }
};

module.exports = configureYargs;
