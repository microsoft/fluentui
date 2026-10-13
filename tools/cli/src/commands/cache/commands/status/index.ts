import type { CommandModule } from 'yargs';

import { CACHE_STATUS_COMMAND_SPEC, applyCommandOptions } from '../../../../utils/command-spec';

const command: CommandModule = {
  command: CACHE_STATUS_COMMAND_SPEC.command,
  describe: CACHE_STATUS_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, CACHE_STATUS_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { cacheStatusHandler } = await import('../../handler');
    return cacheStatusHandler(argv);
  },
};

export default command;
