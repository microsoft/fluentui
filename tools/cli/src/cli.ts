import yargs from 'yargs';

import { REGISTERED_COMMANDS } from './commands/registry';
import { CliError } from './utils/diagnostics';
import { createEnvelope, emptyCoverage } from './utils/output';

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
  let cli = yargs(argv).scriptName('fluentui-cli').usage(`${BANNER}\n  $0 <command> [options]`);
  for (const command of REGISTERED_COMMANDS) {
    cli = cli.command(command.module);
  }
  await cli
    .demandCommand(1, 'You need to specify a command to run.')
    .help()
    .strict()
    .exitProcess(false)
    .fail((message, error) => {
      if (error) {
        throw error;
      } else if (message) {
        throw new CliError('CLI_USAGE', message, 2, [
          {
            code: 'CLI_USAGE',
            severity: 'error',
            message,
            hint: 'Run the command with --help to see valid arguments.',
          },
        ]);
      }
    })
    .parseAsync();
}

export async function handleFatalError(error: unknown, argv: readonly string[]): Promise<void> {
  const cliError =
    error instanceof CliError
      ? error
      : new CliError('CLI_UNEXPECTED', error instanceof Error ? error.message : String(error), 1);
  if (isJsonOutputRequested(argv)) {
    const envelope = createEnvelope(
      'fluentui.error',
      {
        code: cliError.code,
        message: cliError.message,
        details: cliError.data,
      },
      cliError.diagnostics.length
        ? cliError.diagnostics
        : [{ code: cliError.code, severity: 'error', message: cliError.message }],
      cliError.coverage ?? emptyCoverage('unavailable'),
      'unavailable',
    );
    process.stdout.write(`${JSON.stringify(envelope)}\n`);
  } else {
    process.stderr.write(`${cliError.code}: ${cliError.message}\n`);
    for (const diagnostic of cliError.diagnostics) {
      if (diagnostic.hint) {
        process.stderr.write(`${diagnostic.hint}\n`);
      }
    }
  }
  process.exitCode = cliError.exitCode;
}

export function isJsonOutputRequested(argv: readonly string[]): boolean {
  let enabled = false;
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    if (argument === '--no-json') {
      enabled = false;
      continue;
    }
    if (argument === '--json') {
      const value = argv[index + 1];
      if (value === 'true' || value === 'false') {
        enabled = value === 'true';
        index++;
      } else {
        enabled = true;
      }
      continue;
    }
    if (argument === '--json=true') {
      enabled = true;
    } else if (argument === '--json=false') {
      enabled = false;
    }
  }
  return enabled;
}
