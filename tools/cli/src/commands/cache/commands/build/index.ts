import type { CommandModule } from 'yargs';

import { CACHE_BUILD_COMMAND_SPEC, applyCommandOptions } from '../../../../utils/command-spec';

const command: CommandModule = {
  command: CACHE_BUILD_COMMAND_SPEC.command,
  describe: CACHE_BUILD_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, CACHE_BUILD_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { cacheBuildHandler } = await import('../../handler');
    return cacheBuildHandler(argv);
  },
};

export default command;
