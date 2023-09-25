import * as yargs from 'yargs';
import { CLIBuildTestConfigOptions, CLIRunOptions, CLIServerOptions, ConfigResult } from '../utils/types';
import configureYargs from '../utils/configureYargs.js';
import { startServer, stopServer } from '../utils/server.js';
import runTachometer from '../utils/tachometer.js';
import processResults from './processResults.js';
import { buildTestConfig } from './buildTestConfig.js';
import { buildDefaultFixtures } from '../utils/fixtures.js';

const command = 'run';

const run: (testConfigs: ConfigResult[], options: CLIServerOptions) => Promise<void> = async (testConfigs, options) => {
  const { port, root } = options;
  await startServer({ port, root });
  await runTachometer(testConfigs);
};

const handler: (argv: CLIRunOptions) => Promise<void> = async argv => {
  const testConfigs = buildTestConfig(argv as CLIBuildTestConfigOptions);

  try {
    await run(testConfigs, argv);
  } finally {
    stopServer();
  }
};

const api: yargs.CommandModule = {
  command,
  describe: 'Builds configs and runs stress testing.',
  builder: y => {
    return configureYargs(command, y);
  },
  handler: async argv => {
    buildDefaultFixtures();

    const { $0, _, ...rest } = argv;
    const args = rest as unknown as CLIRunOptions;
    await handler(args);

    if (argv.processResults) {
      processResults.handler(argv);
    }
  },
};

export default api;
