import type { CommandModule } from 'yargs';
import { REPORT_COMMAND_SPEC } from '../../utils/command-spec';
import infoCommand from './commands/info';
import usageCommand from './commands/usage';

const command: CommandModule = {
  command: REPORT_COMMAND_SPEC.command,
  describe: REPORT_COMMAND_SPEC.description,
  builder: yargs =>
    yargs
      .command(infoCommand)
      .command(usageCommand)
      .demandCommand(1, 'Please specify a subcommand: info or usage')
      .version(false)
      .help(),
  handler: () => {
    // yargs handles routing to subcommands; this is never reached due to demandCommand
  },
};

export default command;
