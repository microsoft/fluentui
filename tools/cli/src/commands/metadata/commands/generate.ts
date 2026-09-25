import type { CommandModule } from 'yargs';

import { METADATA_GENERATE_COMMAND_SPEC, applyCommandOptions } from '../../../utils/command-spec';
import type { MetadataGenerateArgs } from '../generate-handler';

const generateCommand: CommandModule<{}, MetadataGenerateArgs> = {
  command: METADATA_GENERATE_COMMAND_SPEC.command,
  describe: METADATA_GENERATE_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, METADATA_GENERATE_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { generateHandler } = await import('../generate-handler');
    return generateHandler(argv);
  },
};

export default generateCommand;
