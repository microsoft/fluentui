import yargs from 'yargs';

import { createAnalyzeCommand } from './commands/analyze';
import { createInitCommand } from './commands/init';
import { createLintCommand } from './commands/lint';
import { CliError } from './commands/shared';
import { loadRcaConfig } from './config';

const configOption = {
  type: 'string' as const,
  nargs: 1,
  global: true,
  describe: 'Path to an RCA config file (for init: output path; otherwise default: ./rca.config.json when present)',
};

export interface BootstrapArgs {
  command: string | undefined;
  configPath: string | undefined;
}

/** Parse command-independent arguments before configured command builders are created. */
export function parseBootstrapArgs(args: string[]): BootstrapArgs {
  const parser = yargs(args)
    .exitProcess(false)
    .help(false)
    .version(false)
    .option('config', configOption)
    .fail((message, error) => {
      throw error ?? new CliError(message);
    });

  const parsed = parser.parse();
  const command = typeof parsed._[0] === 'string' ? parsed._[0] : undefined;

  return { command, configPath: parsed.config };
}

export function parseConfigPath(args: string[]): string | undefined {
  return parseBootstrapArgs(args).configPath;
}

export async function cli(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    const bootstrap = parseBootstrapArgs(args);
    const { config } = bootstrap.command === 'init' ? { config: {} } : loadRcaConfig(bootstrap.configPath);
    const parser = yargs(args)
      .scriptName('react-compiler-analyzer')
      .usage('Analyze React Compiler behavior on TypeScript source files.\n\nUsage: $0 <command> [options]')
      .option('config', configOption)
      .command(createInitCommand())
      .command(createLintCommand(config))
      .command(createAnalyzeCommand(config))
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
