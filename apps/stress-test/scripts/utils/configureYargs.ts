import * as yargs from 'yargs';
import { getBrowsers } from './getBrowsers.js';

type YargsOptions = Record<string, yargs.Options>;
type Configure = (y: yargs.Argv, options: YargsOptions) => void;
type CongfigureYargs = (command: string, y: yargs.Argv) => yargs.Argv;

const cliOptions = {
  scenario: {
    describe: 'Name applied to scenario that is about to be run',
    demand: true,
  },
  'test-cases': {
    describe: 'List of test cases to run for the scenario. E.g., mount inject-styles',
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
    describe: 'Tests to target.',
    demand: true,
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
  'test-options': {
    describe: 'Options to apply to each test. E.g., option1=value1 option2=value2',
    coerce: (arg: string[]) => {
      return arg.reduce((map: { [key: string]: string }, current) => {
        const [key, value] = current.split('=');
        if (!key || !value) {
          throw new Error(`Invalid test option. Got ${current}. Expected the form "key=value".`);
        }

        map[key] = value;
        return map;
      }, {});
    },
    default: [],
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
  type: {
    describe: 'Type of fixture to build.',
    default: 'tree',
  },
  name: {
    describe: 'Name of the fixture.',
  },
  options: {
    describe: 'Options for building the fixture. E.g., minBreadth=1 maxBreadth=20',
    coerce: (arg: string[]) => {
      return arg.reduce((map: { [key: string]: string }, current) => {
        const [key, value] = current.split('=');
        if (!key || !value) {
          throw new Error(`Invalid test option. Got ${current}. Expected the form "key=value".`);
        }

        map[key] = value;
        return map;
      }, {});
    },
  },
  clean: {
    describe: 'Cleans fixtures.',
    default: false,
  },
};

const configure: Configure = (y, options) => {
  let _y = y.options(options);

  Object.keys(options).forEach(option => {
    switch (option) {
      case 'test-cases':
      case 'browsers':
      case 'targets':
      case 'test-options':
      case 'renderers':
      case 'options':
        _y = _y.array(option);
        break;

      case 'sizes':
        _y = _y.array(option).choices(option, ['xs', 's', 'm', 'l', 'xl']);
        break;

      case 'sample-size':
      case 'port':
        _y = _y.number(option);
        break;

      case 'process-results':
      case 'verbose':
      case 'build-deps':
      case 'open':
      case 'clean':
        _y = _y.boolean(option);
        break;

      case 'griffel-mode':
        _y = _y.choices(option, ['runtime', 'buildtime', 'extraction']);
        break;

      case 'mode':
        _y = _y.choices(option, ['production', 'development']);
        break;

      case 'type':
        _y = _y.choices(option, ['tree']);
        break;
    }
  });
};

const configureYargs: CongfigureYargs = (command, y) => {
  switch (command) {
    case 'build-test-config': {
      const {
        scenario,
        'test-cases': testCases,
        sizes,
        browsers,
        'sample-size': sampleSize,
        targets,
        'test-options': testOptions,
        port,
      } = cliOptions;
      configure(y, {
        scenario,
        'test-cases': testCases,
        sizes,
        browsers,
        'sample-size': sampleSize,
        targets,
        'test-options': testOptions,
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
        'test-options': testOptions,
        'process-results': processResults,
        port,
        root,
      } = cliOptions;
      configure(y, {
        scenario,
        'test-cases': testCases,
        sizes,
        browsers,
        'sample-size': sampleSize,
        targets,
        'test-options': testOptions,
        'process-results': processResults,
        port,
        root,
      });
      break;
    }

    case 'process-results': {
      const { scenario } = cliOptions;
      configure(y, { scenario });
      break;
    }

    case 'serve': {
      const { port, root } = cliOptions;
      configure(y, { port, root });
      break;
    }

    case 'tachometer': {
      const { scenario } = cliOptions;
      configure(y, { scenario });
      break;
    }

    case 'build': {
      const { 'griffel-mode': griffelMode, mode, verbose, 'build-deps': buildDeps } = cliOptions;
      configure(y, { 'griffel-mode': griffelMode, mode, verbose, 'build-deps': buildDeps });
      break;
    }

    case 'dev': {
      const { mode, open, 'griffel-mode': griffelMode } = cliOptions;
      mode.default = 'development';
      configure(y, { mode, open, 'griffel-mode': griffelMode });
      break;
    }

    case 'build-fixture': {
      const { type, name, options, clean } = cliOptions;
      configure(y, { type, name, options, clean });
      break;
    }
  }

  return y;
};

export default configureYargs;
