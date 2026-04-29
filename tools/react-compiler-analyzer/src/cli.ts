import yargs from 'yargs';

import { coverageCommand } from './commands/coverage';
import { directivesCommand } from './commands/directives';

export async function cli(): Promise<void> {
  await yargs(process.argv.slice(2))
    .scriptName('react-compiler-analyzer')
    .usage('Analyze React Compiler behavior on TypeScript source files.\n\nUsage: $0 <command> <path>')
    .command(directivesCommand)
    .command(coverageCommand)
    .demandCommand(1, 'You must specify a command. Use --help to see available commands.')
    .strict()
    .help()
    .parse();
}
