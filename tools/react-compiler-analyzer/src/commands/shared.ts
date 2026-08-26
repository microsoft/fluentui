import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import type { Argv } from 'yargs';

import { createFormatter, escapeHtml, renderHtmlDocument, type Formatter, type ReportMeta } from '../formatter';
import { dedupeFileEntries, findPackageName } from '../discovery';
import type { CompilationMode, FileEntry, OutputFormat } from '../types';

/**
 * A user-facing failure (bad path, bad flag, unreadable config). Thrown rather than exiting so
 * command bodies stay callable from tests; {@link cli} turns it into a message and exit code.
 */
export class CliError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CliError';
  }
}

/**
 * A scan path that isn't on disk. Distinguished from other {@link CliError}s because a sparse
 * checkout legitimately lacks some paths, so it is skipped with a warning rather than fatal.
 */
export class MissingPathError extends CliError {
  constructor(public readonly path: string) {
    super(`Path does not exist: ${path}`);
    this.name = 'MissingPathError';
  }
}

/** Options every subcommand accepts, as parsed by {@link sharedOptions}. */
export interface SharedArgv {
  paths: string[];
  verbose: boolean;
  concurrency: number;
  'full-reasons': boolean;
  exclude: string[];
  mode: CompilationMode;
  format: OutputFormat;
  'strict-paths': boolean;
}

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
      describe:
        'Output format: cli (terminal-friendly), md (GitHub-flavored markdown), html (styled document), or json (machine-readable on stdout, diagnostics on stderr)',
      choices: ['cli', 'md', 'html', 'json'] as const,
      default: 'cli' as OutputFormat,
    })
    .option('strict-paths', {
      type: 'boolean' as const,
      describe: 'Fail instead of warning when a given path does not exist',
      default: false,
    });
}

export function validatePath(rawPath: string): string {
  const resolvedPath = resolve(rawPath);

  if (!existsSync(resolvedPath)) {
    throw new MissingPathError(resolvedPath);
  }

  const stats = statSync(resolvedPath);
  if (stats.isFile() && !/\.tsx?$/.test(resolvedPath)) {
    throw new CliError(`File is not a TypeScript (.ts/.tsx) file: ${resolvedPath}`);
  }
  if (!stats.isDirectory() && !stats.isFile()) {
    throw new CliError(`Path is not a file or directory: ${resolvedPath}`);
  }

  return resolvedPath;
}

/**
 * Resolve every scan path, skipping ones that are simply absent (a sparse checkout does not
 * need a pre-filter step). Only fails when *nothing* is left to scan, or when `strict` is set.
 * A path that exists but is the wrong kind of file is always fatal — that is a typo, not a
 * missing checkout.
 */
export function validatePaths(rawPaths: string[], options: { strict?: boolean } = {}): string[] {
  const valid: string[] = [];
  const missing: string[] = [];

  for (const rawPath of rawPaths) {
    try {
      valid.push(validatePath(rawPath));
    } catch (err) {
      if (options.strict || !(err instanceof MissingPathError)) {
        throw err;
      }
      missing.push(err.path);
      console.warn(`Warning: skipping missing path: ${err.path}`);
    }
  }

  if (valid.length === 0) {
    throw new CliError(
      missing.length > 0 ? `none of the given paths exist:\n  ${missing.join('\n  ')}` : 'no paths were given to scan.',
    );
  }

  return valid;
}

export function validateConcurrency(concurrency: number): void {
  if (concurrency < 1) {
    throw new CliError('--concurrency must be >= 1');
  }
}

/** A result located in source, as produced by both the coverage and directive analyses. */
interface Located {
  packageName: string;
  filePath: string;
  line: number;
  column?: number;
}

/**
 * Sort results into a stable order. Compilation streams results in completion order, so without
 * this the report (and any diff of it) reshuffles between runs on identical input.
 */
export function sortByLocation<T extends Located>(results: T[]): T[] {
  return results.sort(
    (a, b) =>
      a.packageName.localeCompare(b.packageName) ||
      a.filePath.localeCompare(b.filePath) ||
      a.line - b.line ||
      (a.column ?? 0) - (b.column ?? 0),
  );
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
 * and resolve with the exit code it returns.
 *
 * For `cli`/`md` the formatter writes straight to stdout (with the `━━ title ━━` banner).
 * For `html` everything is buffered — both formatter output and the raw `console.log`
 * diagnostics emitted by the compiler/discovery during scanning — then injected once into a
 * standalone HTML document. Raw diagnostics are HTML-escaped and wrapped so they remain valid
 * inside the scan-log block; formatter output (which already emits valid HTML) is left intact.
 *
 * `meta` is rendered as a label/value bar under the document banner in `html` (e.g. the
 * compilation mode); it is ignored by `cli`/`md` (which already surface the mode in the scan log).
 */
export async function withReportOutput(
  format: OutputFormat,
  title: string,
  run: (f: Formatter) => Promise<number>,
  meta: ReportMeta[] = [],
): Promise<number> {
  if (format === 'json') {
    // stdout is reserved for the document, so scan-log and compiler chatter goes to stderr and
    // the formatter sink is discarded.
    const originalLog = console.log;
    console.log = (...args: unknown[]) => console.error(...args);
    try {
      return await run(createFormatter('cli', () => undefined));
    } finally {
      console.log = originalLog;
    }
  }

  if (format !== 'html') {
    const f = createFormatter(format);
    f.raw(`━━ ${title} ━━`);
    f.raw('');
    return run(f);
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

  console.log(renderHtmlDocument(title, buffer.join('\n'), meta));
  return code;
}

/** Discovers the files a command operates on, given one scan root. */
export type DiscoverFiles = (
  scanDir: string,
  packageName: string,
  exclude: string[],
  verbose: boolean,
) => Promise<FileEntry[]>;

export interface ReportSpec {
  title: string;
  discover: DiscoverFiles;
  /** Printed instead of a report when discovery turns up nothing. */
  emptyMessage: string;
  /** Prefix for the file-count line, e.g. `Files to analyze`. */
  countLabel: string;
  /**
   * The command body. Call `endScanLog()` once compilation is done — everything logged before
   * that point is folded into the collapsible scan log.
   */
  run: (ctx: { f: Formatter; files: FileEntry[]; endScanLog: () => void }) => Promise<number>;
}

/**
 * Shared shell for `lint` and `analyze`: validates input, opens the scan log, discovers and
 * dedupes files across every path, then hands off to the command body. Returns the exit code.
 */
export async function runReport(argv: SharedArgv, spec: ReportSpec): Promise<number> {
  const resolvedPaths = validatePaths(argv.paths, { strict: argv['strict-paths'] });
  validateConcurrency(argv.concurrency);

  return withReportOutput(
    argv.format,
    spec.title,
    async f => {
      openScanLog(f, 'Scan & compile log');

      const collected: FileEntry[] = [];
      for (const resolvedPath of resolvedPaths) {
        const packageName = await findPackageName(resolvedPath);

        f.heading(2, `Scanning: ${resolvedPath}`);
        f.line(`   Package: ${packageName}`);
        f.line(`   Mode: ${argv.mode}`);
        f.blank();

        collected.push(...(await spec.discover(resolvedPath, packageName, argv.exclude, argv.verbose)));
      }

      // Overlapping path arguments (a directory plus a file inside it) can surface the same
      // file twice — process, and therefore annotate or fix, each one only once.
      const files = dedupeFileEntries(collected);

      if (files.length === 0) {
        closeScanLog(f);
        f.line(spec.emptyMessage);
        return 0;
      }

      f.line(`${spec.countLabel}: ${files.length}`);
      f.blank();

      let scanLogOpen = true;
      const endScanLog = () => {
        if (scanLogOpen) {
          closeScanLog(f);
          scanLogOpen = false;
        }
      };

      return spec.run({ f, files, endScanLog });
    },
    [{ label: 'Mode', value: argv.mode }],
  );
}
