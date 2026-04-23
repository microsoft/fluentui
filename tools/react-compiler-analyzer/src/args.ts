import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import yargs from 'yargs';

import type { Args } from './types';

export function parseArgs(processArgs: string[]): Args {
  const argv = yargs(processArgs)
    .scriptName('react-compiler-analyzer')
    .usage(
      "Analyze and detect redundant 'use no memo' directives in a directory.\n\n" +
        'Usage:\n' +
        '  $0 <path>\n' +
        '  $0 <path> --fix\n' +
        '  $0 <path> --verbose',
    )
    .command('$0 <path>', "Analyze 'use no memo' directives in the given directory", yarg =>
      yarg.positional('path', {
        type: 'string',
        describe: "Directory to scan for TypeScript files with 'use no memo' directives",
        demandOption: true,
      }),
    )
    .option('fix', {
      type: 'boolean',
      describe: "Auto-remove redundant 'use no memo' directives from source files",
      default: false,
    })
    .option('verbose', {
      type: 'boolean',
      describe: 'Show per-function compiler events in the output',
      default: false,
    })
    .option('concurrency', {
      type: 'number',
      describe: 'Max parallel file processing',
      default: 10,
    })
    .option('full-reasons', {
      type: 'boolean',
      describe: 'Show full compiler error reasons instead of truncated summaries',
      default: false,
    })
    .option('exclude', {
      type: 'string',
      array: true,
      describe: 'Glob patterns passed to fs.globSync exclude. ' + 'Supports directory names and file glob patterns.',
      default: [
        '**/__tests__/**',
        '**/testing/**',
        '**/__mocks__/**',
        '**/*.spec.*',
        '**/*.test.*',
        '**/*.stories.*',
        '**/*.cy.*',
      ],
    })
    .strict()
    .help()
    .parse();

  const { fix, verbose, concurrency, exclude } = argv;
  const rawPath = argv['path'] as string;
  const fullReasons = argv['full-reasons'];

  // Validation
  const resolvedPath = resolve(rawPath);

  if (!existsSync(resolvedPath)) {
    console.error(`Error: Path does not exist: ${resolvedPath}`);
    process.exit(1);
  }
  if (!statSync(resolvedPath).isDirectory()) {
    console.error(`Error: Path is not a directory: ${resolvedPath}`);
    process.exit(1);
  }
  if (concurrency < 1) {
    console.error('Error: --concurrency must be >= 1');
    process.exit(1);
  }

  return { path: resolvedPath, fix, verbose, fullReasons, concurrency, exclude };
}
