import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import type { Argv } from 'yargs';

import type { CompilationMode } from '../types';

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
    .positional('paths', {
      type: 'string' as const,
      array: true as const,
      describe: 'One or more files or directories to scan for TypeScript files',
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
    })
    .option('mode', {
      type: 'string' as const,
      describe: 'React Compiler compilation mode',
      choices: ['infer', 'annotation', 'all'] as const,
      default: 'infer' as CompilationMode,
    });
}

export function validatePath(rawPath: string): string {
  const resolvedPath = resolve(rawPath);

  if (!existsSync(resolvedPath)) {
    console.error(`Error: Path does not exist: ${resolvedPath}`);
    process.exit(1);
  }

  const stats = statSync(resolvedPath);
  if (stats.isFile() && !/\.tsx?$/.test(resolvedPath)) {
    console.error(`Error: File is not a TypeScript (.ts/.tsx) file: ${resolvedPath}`);
    process.exit(1);
  }
  if (!stats.isDirectory() && !stats.isFile()) {
    console.error(`Error: Path is not a file or directory: ${resolvedPath}`);
    process.exit(1);
  }

  return resolvedPath;
}

export function validatePaths(rawPaths: string[]): string[] {
  return rawPaths.map(validatePath);
}

export function validateConcurrency(concurrency: number): void {
  if (concurrency < 1) {
    console.error('Error: --concurrency must be >= 1');
    process.exit(1);
  }
}

/**
 * Open a collapsible `<details>` block wrapping all scan + compile output.
 * Pair with `closeScanLog()` after the last compilation pass completes.
 *
 * The blank line after `<summary>` is required so GitHub-flavored markdown
 * renders the inner content as markdown (headings, lists) instead of inline HTML.
 */
export function openScanLog(title: string): void {
  console.log('<details>');
  console.log(`<summary>📋 ${title}</summary>`);
  console.log('');
}

/**
 * Close the `<details>` block opened by `openScanLog()`.
 */
export function closeScanLog(): void {
  console.log('');
  console.log('</details>');
  console.log('');
}
