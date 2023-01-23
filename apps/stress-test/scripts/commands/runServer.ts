import * as yargs from 'yargs';

import configureYargs from '../utils/configureYargs.js';
import { startServer } from '../utils/server.js';
import { CLIServerOptions } from '../utils/types';

const command = 'serve';

const api: yargs.CommandModule = {
  command,
  describe: 'Runs a test HTTP server.',
  builder: y => {
    return configureYargs(command, y);
  },
  handler: argv => {
    startServer(argv as CLIServerOptions);
  },
};

export default api;
