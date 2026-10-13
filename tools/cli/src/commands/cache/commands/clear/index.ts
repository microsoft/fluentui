import type { CommandModule } from 'yargs';

import { CACHE_CLEAR_COMMAND_SPEC, applyCommandOptions } from '../../../../utils/command-spec';

const command: CommandModule = {
  command: CACHE_CLEAR_COMMAND_SPEC.command,
  describe: CACHE_CLEAR_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, CACHE_CLEAR_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { cacheClearHandler } = await import('../../handler');
    return cacheClearHandler(argv);
  },
};

export default command;
