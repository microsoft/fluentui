import yargs from 'yargs';

import { analyzeCommand } from './commands/analyze';
import { lintCommand } from './commands/lint';

export async function cli(): Promise<void> {
  yargs(process.argv.slice(2))
    .scriptName('react-compiler-analyzer')
    .usage('Analyze React Compiler behavior on TypeScript source files.\n\nUsage: $0 <command> <paths..>')
    .command(lintCommand)
    .command(analyzeCommand)
    .demandCommand(1, 'You must specify a command. Use --help to see available commands.')
    .strict()
    .help()
    .parse();
}
