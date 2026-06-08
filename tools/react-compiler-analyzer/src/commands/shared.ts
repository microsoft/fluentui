import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import type { Argv } from 'yargs';

import { createFormatter, escapeHtml, renderHtmlDocument, type Formatter } from '../formatter';
import type { CompilationMode, OutputFormat } from '../types';

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
    })
    .option('format', {
      type: 'string' as const,
      describe: 'Output format: cli (terminal-friendly), md (GitHub-flavored markdown), or html (styled document)',
      choices: ['cli', 'md', 'html'] as const,
      default: 'cli' as OutputFormat,
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
 * Open a collapsible section wrapping all scan + compile output.
 * Pair with `closeScanLog()` after the last compilation pass completes.
 *
 * In `md` format this is a `<details>` block. The blank line after `<summary>`
 * is required so GitHub-flavored markdown renders the inner content as markdown
 * (headings, lists) instead of inline HTML. In `html` format it is a collapsible
 * `<details class="scan-log">` element; in `cli` format a simple titled header.
 *
 * All markers are emitted through the formatter sink (`f.raw`) so that, under `html`,
 * they bypass the raw-diagnostics capture in {@link withReportOutput}.
 */
export function openScanLog(f: Formatter, title: string): void {
  if (f.format === 'md') {
    f.raw('<details>');
    f.raw(`<summary>📋 ${title}</summary>`);
    f.raw('');
  } else if (f.format === 'html') {
    f.raw(`<details class="scan-log"><summary>📋 ${escapeHtml(title)}</summary><div class="scan-body">`);
  } else {
    f.raw(`📋 ${title}`);
    f.raw('─'.repeat(title.length + 3));
    f.raw('');
  }
}

/**
 * Close the section opened by `openScanLog()`.
 */
export function closeScanLog(f: Formatter): void {
  if (f.format === 'md') {
    f.raw('');
    f.raw('</details>');
    f.raw('');
  } else if (f.format === 'html') {
    f.raw('</div></details>');
  } else {
    f.raw('');
  }
}

/**
 * Run a report-producing command body with output wired up for the requested `format`,
 * then exit with the code it returns.
 *
 * For `cli`/`md` the formatter writes straight to stdout (with the `━━ title ━━` banner).
 * For `html` everything is buffered — both formatter output and the raw `console.log`
 * diagnostics emitted by the compiler/discovery during scanning — then injected once into a
 * standalone HTML document. Raw diagnostics are HTML-escaped and wrapped so they remain valid
 * inside the scan-log block; formatter output (which already emits valid HTML) is left intact.
 */
export async function withReportOutput(
  format: OutputFormat,
  title: string,
  run: (f: Formatter) => Promise<number>,
): Promise<void> {
  if (format !== 'html') {
    const f = createFormatter(format);
    f.raw(`━━ ${title} ━━`);
    f.raw('');
    process.exit(await run(f));
    return;
  }

  const buffer: string[] = [];
  const originalLog = console.log;
  // Capture raw compiler/discovery diagnostics (escaped) so they stay valid inside the scan log.
  console.log = (...args: unknown[]) => {
    buffer.push(`<div class="log-line">${escapeHtml(args.map(String).join(' '))}</div>`);
  };

  let code = 0;
  try {
    // Formatter output goes straight to the buffer as valid HTML (not escaped again).
    const f = createFormatter('html', line => buffer.push(line));
    code = await run(f);
  } finally {
    console.log = originalLog;
  }

  console.log(renderHtmlDocument(title, buffer.join('\n')));
  process.exit(code);
}
