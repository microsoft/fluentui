import yargs from 'yargs';

import { analyzeCommand } from './commands/analyze';
import { lintCommand } from './commands/lint';
import { CliError } from './commands/shared';

export async function cli(): Promise<void> {
  const parser = yargs(process.argv.slice(2))
    .scriptName('react-compiler-analyzer')
    .usage('Analyze React Compiler behavior on TypeScript source files.\n\nUsage: $0 <command> <paths..>')
    .command(lintCommand)
    .command(analyzeCommand)
    .demandCommand(1, 'You must specify a command. Use --help to see available commands.')
    .strict()
    // Without this, yargs prints its usage banner and a raw stack trace for a CliError, burying
    // the actionable message dozens of lines down.
    .fail((msg, err) => {
      if (err instanceof CliError) {
        console.error(`Error: ${err.message}`);
      } else if (err) {
        console.error(err.stack ?? String(err));
      } else {
        console.error(msg);
      }
      process.exit(1);
    })
    .help();

  try {
    // `@types/yargs` is pinned at v13 repo-wide; `parseAsync` exists in the yargs v17 runtime.
    await (parser as unknown as { parseAsync(): Promise<unknown> }).parseAsync();
  } catch (err) {
    // Backstop for rejections yargs does not route through `.fail()`.
    if (err instanceof CliError) {
      console.error(`Error: ${err.message}`);
      process.exitCode = 1;
      return;
    }
    throw err;
  }
}
