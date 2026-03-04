import yargs from 'yargs';

import migrateCommand from './commands/migrate';
import reportCommand from './commands/report';

export async function main(argv: string[]): Promise<void> {
  await yargs(argv)
    .scriptName('fluentui-cli')
    .usage('$0 <command> [options]')
    .command(migrateCommand)
    .command(reportCommand)
    .demandCommand(1, 'You need to specify a command to run.')
    .help()
    .strict()
    .fail((message, error, yargsInstance) => {
      if (error) {
        console.error(error.message);
      } else if (message) {
        yargsInstance.showHelp();
        console.error(`\n${message}`);
      }
      process.exit(1);
    })
    .parse();
}
