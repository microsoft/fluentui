import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import yargs from 'yargs';
import type { Argv } from 'yargs';

import type { ParsedCommand, CompilationMode } from './types';

const DEFAULT_EXCLUDE = [
  '**/__tests__/**',
  '**/testing/**',
  '**/__mocks__/**',
  '**/*.spec.*',
  '**/*.test.*',
  '**/*.stories.*',
  '**/*.cy.*',
];

/**
 * Add shared CLI options common to all subcommands.
 */
function sharedOptions<T>(yarg: Argv<T>) {
  return yarg
    .positional('path', {
      type: 'string' as const,
      describe: 'Directory to scan for TypeScript files',
      demandOption: true,
    })
    .option('verbose', {
      type: 'boolean' as const,
      describe: 'Show per-function compiler events in the output',
      default: false,
    })
    .option('concurrency', {
      type: 'number' as const,
      describe: 'Max parallel file processing',
      default: 10,
    })
    .option('full-reasons', {
      type: 'boolean' as const,
      describe: 'Show full compiler error reasons instead of truncated summaries',
      default: false,
    })
    .option('exclude', {
      type: 'string' as const,
      array: true as const,
      describe: 'Glob patterns passed to fs.globSync exclude',
      default: DEFAULT_EXCLUDE,
    });
}

function validatePath(rawPath: string): string {
  const resolvedPath = resolve(rawPath);

  if (!existsSync(resolvedPath)) {
    console.error(`Error: Path does not exist: ${resolvedPath}`);
    process.exit(1);
  }
  if (!statSync(resolvedPath).isDirectory()) {
    console.error(`Error: Path is not a directory: ${resolvedPath}`);
    process.exit(1);
  }

  return resolvedPath;
}

function validateConcurrency(concurrency: number): void {
  if (concurrency < 1) {
    console.error('Error: --concurrency must be >= 1');
    process.exit(1);
  }
}

export function parseArgs(processArgs: string[]): ParsedCommand {
  let result: ParsedCommand | undefined;

  yargs(processArgs)
    .scriptName('react-compiler-analyzer')
    .usage('Analyze React Compiler behavior on TypeScript source files.\n\nUsage: $0 <command> <path>')
    .command(
      'directives <path>',
      "Analyze and detect redundant 'use no memo' directives",
      yarg =>
        sharedOptions(yarg).option('fix', {
          type: 'boolean' as const,
          describe: "Auto-remove redundant 'use no memo' directives from source files",
          default: false,
        }),
      argv => {
        const resolvedPath = validatePath(argv.path as string);
        validateConcurrency(argv.concurrency);

        result = {
          command: 'directives',
          args: {
            path: resolvedPath,
            fix: argv.fix,
            verbose: argv.verbose,
            fullReasons: argv['full-reasons'],
            concurrency: argv.concurrency,
            exclude: argv.exclude,
          },
        };
      },
    )
    .command(
      'coverage <path>',
      'Analyze which functions the React Compiler will memoize',
      yarg =>
        sharedOptions(yarg).option('mode', {
          type: 'string' as const,
          describe: 'React Compiler compilation mode',
          choices: ['infer', 'annotation', 'all'] as const,
          default: 'infer' as CompilationMode,
        }),
      argv => {
        const resolvedPath = validatePath(argv.path as string);
        validateConcurrency(argv.concurrency);

        result = {
          command: 'coverage',
          args: {
            path: resolvedPath,
            compilationMode: argv.mode as CompilationMode,
            verbose: argv.verbose,
            fullReasons: argv['full-reasons'],
            concurrency: argv.concurrency,
            exclude: argv.exclude,
          },
        };
      },
    )
    .demandCommand(1, 'You must specify a command. Use --help to see available commands.')
    .strict()
    .help()
    .parse();

  if (!result) {
    // Should not happen with demandCommand(1), but safety net
    console.error('Error: No command specified. Use --help to see available commands.');
    process.exit(1);
  }

  return result;
}
