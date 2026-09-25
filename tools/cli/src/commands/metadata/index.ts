import type { CommandModule } from 'yargs';

import { METADATA_COMMAND_SPEC, applyCommandOptions } from '../../utils/command-spec';
import { CliError } from '../../utils/diagnostics';
import generateCommand from './commands/generate';
import validateCommand from './commands/validate';

const command: CommandModule = {
  command: METADATA_COMMAND_SPEC.command,
  describe: METADATA_COMMAND_SPEC.description,
  builder: yargs =>
    applyCommandOptions(yargs.command(generateCommand).command(validateCommand), METADATA_COMMAND_SPEC)
      .demandCommand(1, 'Usage: fluentui-cli metadata <generate|validate> [options]')
      .version(false)
      .help(),
  handler: () => {
    throw new CliError('CLI_USAGE', 'Usage: fluentui-cli metadata <generate|validate> [options]', 2);
  },
};

export default command;
