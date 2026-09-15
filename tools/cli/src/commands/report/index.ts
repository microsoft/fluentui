import type { CommandModule } from 'yargs';
import infoCommand from './commands/info';
import usageCommand from './commands/usage';

const command: CommandModule = {
  command: 'report',
  describe: 'Generate reports (info for issue reporting, usage for codebase analysis)',
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
