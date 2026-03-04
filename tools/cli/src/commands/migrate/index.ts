import type { CommandModule } from 'yargs';
import v8ToV9Command from './v8-to-v9';

const command: CommandModule = {
  command: 'migrate <migration>',
  describe: 'Run migration analysis and annotation',
  builder: yargs =>
    yargs
      .command(v8ToV9Command)
      .demandCommand(1, 'Specify a migration type: v8-to-v9')
      .version(false)
      .help(),
  handler: () => {},
};

export default command;
