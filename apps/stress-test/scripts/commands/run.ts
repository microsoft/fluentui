import * as yargs from 'yargs';
import { CLIBuildTestConfigOptions, CLIRunOptions, CLIServerOptions, ConfigResult } from '../utils/types';
import configureYargs from '../utils/configureYargs';
import { startServer, stopServer } from '../utils/server';
import runTachometer from '../utils/tachometer';
import processResults from './processResults';
import { buildTestConfig } from './buildTestConfig';

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
    const { $0, _, ...rest } = argv;
    const args = (rest as unknown) as CLIRunOptions;
    await handler(args);

    if (argv.processResults) {
      processResults.handler(argv);
    }
  },
};

export default api;
