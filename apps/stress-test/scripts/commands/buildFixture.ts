import * as yargs from 'yargs';
import { CLIBuildFixtureOptions } from '../utils/types';
import configureYargs from '../utils/configureYargs.js';
import { buildTreeFixture, cleanFixtures, isReservedName, reservedNames } from '../utils/fixtures.js';

type BuildFixture = (options: CLIBuildFixtureOptions) => void;

const command = 'build-fixture';

const buildFixture: BuildFixture = ({ type, name, options }) => {
  if (type === 'tree') {
    buildTreeFixture(name, options);
  }
};

const api: yargs.CommandModule = {
  command,
  describe: 'Builds a test fixture.',
  builder: y => {
    return configureYargs(command, y);
  },
  handler: argv => {
    const { $0, _, ...options } = argv;

    const opts = options as CLIBuildFixtureOptions;

    if (opts.clean) {
      cleanFixtures();
    } else {
      if (!opts.name) {
        throw new Error(`"name" is required.`);
      } else if (!opts.options) {
        throw new Error(`"options" is required.`);
      }

      if (isReservedName(opts.name)) {
        throw new Error(
          `"${opts.name}" is a reserved name. Please using a name other than ${reservedNames.map(n => n + '*')}`,
        );
      }

      buildFixture(opts);
    }
  },
};

export default api;
