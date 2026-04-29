import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import type { Argv } from 'yargs';

export const DEFAULT_EXCLUDE = [
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
export function sharedOptions<T>(yarg: Argv<T>) {
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

export function validatePath(rawPath: string): string {
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

export function validateConcurrency(concurrency: number): void {
  if (concurrency < 1) {
    console.error('Error: --concurrency must be >= 1');
    process.exit(1);
  }
}
