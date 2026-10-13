import type { CommandModule } from 'yargs';

import { CliError } from '../../utils/diagnostics';
import { CACHE_COMMAND_SPEC } from '../../utils/command-spec';
import buildCommand from './commands/build';
import clearCommand from './commands/clear';
import statusCommand from './commands/status';

const command: CommandModule = {
  command: CACHE_COMMAND_SPEC.command,
  describe: CACHE_COMMAND_SPEC.description,
  builder: yargs =>
    yargs
      .command(statusCommand)
      .command(buildCommand)
      .command(clearCommand)
      .demandCommand(1, 'Usage: fluentui-cli cache <status|build|clear> [options]')
      .version(false)
      .help(),
  handler: () => {
    throw new CliError('CLI_USAGE', 'Usage: fluentui-cli cache <status|build|clear> [options]', 2);
  },
};

export default command;
