import type { CommandModule } from 'yargs';

import { INIT_COMMAND_SPEC, applyCommandOptions } from '../../utils/command-spec';

const command: CommandModule = {
  command: INIT_COMMAND_SPEC.command,
  describe: INIT_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, INIT_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
