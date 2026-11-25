import yargs from 'yargs';

import reportCommand from './commands/report';
import metadataCommand from './commands/metadata';

const BANNER = `
  ███████╗██╗     ██╗   ██╗███████╗███╗   ██╗████████╗  ██╗   ██╗██╗
  ██╔════╝██║     ██║   ██║██╔════╝████╗  ██║╚══██╔══╝  ██║   ██║██║
  █████╗  ██║     ██║   ██║█████╗  ██╔██╗ ██║   ██║     ██║   ██║██║
  ██╔══╝  ██║     ██║   ██║██╔══╝  ██║╚██╗██║   ██║     ██║   ██║██║
  ██║     ███████╗╚██████╔╝███████╗██║ ╚████║   ██║     ╚██████╔╝██║
  ╚═╝     ╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝      ╚═════╝ ╚═╝
                                                               CLI
`;

export async function main(argv: string[]): Promise<void> {
  await yargs(argv)
    .scriptName('fluentui-cli')
    .usage(`${BANNER}\n  $0 <command> [options]`)
    .command(reportCommand)
    .command(metadataCommand)
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
