import type { CommandModule } from 'yargs';

import { METADATA_VALIDATE_COMMAND_SPEC, applyCommandOptions } from '../../../utils/command-spec';
import type { MetadataValidateArgs } from '../validate-handler';

const validateCommand: CommandModule<{}, MetadataValidateArgs> = {
  command: METADATA_VALIDATE_COMMAND_SPEC.command,
  describe: METADATA_VALIDATE_COMMAND_SPEC.description,
  builder: yargs =>
    applyCommandOptions(yargs, METADATA_VALIDATE_COMMAND_SPEC)
      .positional('input', {
        type: 'string',
        describe: 'Metadata index, API record, metadata directory, or package root',
      })
      .version(false)
      .help(),
  handler: async argv => {
    const { validateHandler } = await import('../validate-handler');
    return validateHandler(argv);
  },
};

export default validateCommand;
