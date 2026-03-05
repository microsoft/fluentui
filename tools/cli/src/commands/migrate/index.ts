import type { CommandModule } from 'yargs';
import v8ToV9Command from './v8-to-v9';

const AVAILABLE_MIGRATIONS = ['v8-to-v9'];

const command: CommandModule = {
  command: 'migrate [migration]',
  describe: 'Run migration analysis and annotation',
  builder: yargs =>
    yargs
      .command(v8ToV9Command)
      .option('list', {
        alias: 'l',
        type: 'boolean',
        description: 'List all available migrations',
      })
      .version(false)
      .help(),
  handler: argv => {
    if ((argv as { list?: boolean }).list) {
      console.log('Available migrations:');
      for (const m of AVAILABLE_MIGRATIONS) {
        console.log(`  ${m}`);
      }
    }
  },
};

export default command;
