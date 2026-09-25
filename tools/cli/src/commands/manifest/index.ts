import type { CommandModule } from 'yargs';

import { MANIFEST_COMMAND_SPEC, applyCommandOptions } from '../../utils/command-spec';
import type { ManifestArgs } from './handler';

const command: CommandModule<{}, ManifestArgs> = {
  command: MANIFEST_COMMAND_SPEC.command,
  describe: MANIFEST_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, MANIFEST_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
