import { extname } from 'node:path';
import { readFile } from 'node:fs/promises';

import { transformAsync } from '@babel/core';
import type { PluginItem } from '@babel/core';

import { processFilesConcurrently } from './concurrency';
import { manualMemoPlugin } from './manual-memo-plugin';
import type { ManualMemoEntry, ManualMemoPluginOptions } from './manual-memo-plugin';
import { riskPlugin } from './risk-plugin';
import type { RiskPluginOptions } from './risk-plugin';
import type { CompilationMode, CompileFilesOptions, FileEntry, RiskConfig, RiskFinding } from './types';

export interface CompilerEvent {
  kind: 'CompileSuccess' | 'CompileError' | 'CompileSkip' | 'PipelineError' | string;
  fnLoc: { start: { line: number; column: number }; end: { line: number; column: number } } | null;
  fnName?: string | null;
  reason?: string;
  /** Source location of the trigger (e.g. the opt-out directive for `CompileSkip`). */
  loc?: { start: { line: number; column: number }; end?: { line: number; column: number } } | null;
  detail?: unknown;
  data?: string;
  memoSlots?: number;
  memoBlocks?: number;
  memoValues?: number;
  prunedMemoBlocks?: number;
  prunedMemoValues?: number;
}

interface CompilerDetailLike {
  reason?: string;
  description?: string;
  loc?: {
    start?: { line?: number; column?: number };
  };
  /** Returns the primary source location. Present on CompilerErrorDetail / CompilerDiagnostic. */
  primaryLocation?: () => { start?: { line?: number; column?: number } } | null;
  /** Renders a full, code-framed compiler message. Present on CompilerErrorDetail / CompilerDiagnostic. */
  printErrorMessage?: (source: string, options: { eslint: boolean }) => string;
}

/**
 * Resolve a `{ line, column }` from a compiler detail. Prefers the `.loc` property,
 * falling back to `primaryLocation()` (which is where `CompilerDiagnostic` exposes it).
 * Returns `null` when no usable location is available.
 */
function getDetailLocation(detail: CompilerDetailLike): { line: number; column: number } | null {
  let start = detail.loc?.start;
  if ((!start || typeof start.line !== 'number') && typeof detail.primaryLocation === 'function') {
    try {
      start = detail.primaryLocation()?.start;
    } catch {
      start = undefined;
    }
  }
  if (start && typeof start.line === 'number') {
    return { line: start.line, column: typeof start.column === 'number' ? start.column : 0 };
  }
  return null;
}

/**
 * Extract a concise, single-line reason string from a CompileError detail object.
 * The `detail` can be a CompilerErrorDetail or CompilerDiagnostic from the
 * React Compiler — both carry a `.reason`, optional `.description`, and a location.
 * Returns a `reason [description] (line:col)` summary suitable for a table cell.
 * Falls back to `String(detail)`.
 *
 * For the full code-framed diagnostic, use {@link extractFullDiagnostic}.
 */
export function extractDetailReason(detail: unknown): string {
  if (detail === null || detail === undefined) {
    return '';
  }
  // CompilerErrorDetail / CompilerDiagnostic expose .reason + .description
  if (typeof detail === 'object') {
    const compilerDetail = detail as CompilerDetailLike;
    const parts: string[] = [];

    if (typeof compilerDetail.reason === 'string') {
      parts.push(compilerDetail.reason);
    }
    // Wrap the description in brackets so it stays visually distinct from the reason
    // instead of running the two sentences together (e.g. `reason [description]`).
    if (typeof compilerDetail.description === 'string' && compilerDetail.description.length > 0) {
      parts.push(`[${compilerDetail.description}]`);
    }
    // Append line/column info when available
    const loc = getDetailLocation(compilerDetail);
    if (loc) {
      parts.push(`(${loc.line}:${loc.column})`);
    }
    if (parts.length > 0) {
      return parts.join(' ');
    }
  }
  return String(detail);
}

/**
 * Render the React Compiler's full, code-framed diagnostic for a CompileError detail.
 * Uses the detail's `.printErrorMessage(source, opts)` to produce the rich, multi-line
 * message (with a code frame pointing at the offending lines). Returns `''` when the
 * detail can't be printed.
 */
export function extractFullDiagnostic(detail: unknown, source: string): string {
  if (detail !== null && typeof detail === 'object') {
    const compilerDetail = detail as CompilerDetailLike;
    if (typeof compilerDetail.printErrorMessage === 'function') {
      try {
        const printed = compilerDetail.printErrorMessage(source, { eslint: false });
        if (typeof printed === 'string' && printed.trim().length > 0) {
          return printed;
        }
      } catch {
        // Fall through: caller keeps the concise reason only.
      }
    }
  }
  return '';
}

/**
 * Extract the source location (`line:column`) of a CompileError detail — the precise
 * spot inside the function where this specific error occurred. Returns `null` when the
 * detail carries no usable location, which is what distinguishes one error from another
 * when a single function produces several.
 */
export function extractDetailLoc(detail: unknown): { line: number; column: number } | null {
  if (detail !== null && typeof detail === 'object') {
    return getDetailLocation(detail as CompilerDetailLike);
  }
  return null;
}

/**
 * Read the directive string literal at a source location (e.g. `use no memo`).
 * Returns the inner text of the first quoted segment on the directive's line, or `null`.
 */
function readDirectiveText(source: string, loc: CompilerEvent['loc']): string | null {
  if (!loc?.start?.line) {
    return null;
  }
  const line = source.split('\n')[loc.start.line - 1];
  if (!line) {
    return null;
  }
  const match = line.match(/['"]([^'"]*)['"]/);
  return match ? match[1] : null;
}

/**
 * Resolve a `CompileSkip` event's reason string.
 *
 * `babel-plugin-react-compiler@1.x` builds the skip message by interpolating the
 * opt-out directive's AST node directly, producing `Skipped due to '[object Object]'
 * directive.`. When that mangled form is detected, recover the real directive text
 * from the event's source location.
 */
export function resolveSkipReason(event: CompilerEvent, source: string): string {
  const reason = event.reason ?? 'compiler skipped this function';
  if (!reason.includes('[object Object]')) {
    return reason;
  }
  const directive = readDirectiveText(source, event.loc);
  return directive ? reason.replace('[object Object]', directive) : reason;
}

// ── Shared compiler invocation ──

export interface CompileOptions {
  compilationMode?: CompilationMode;
  plugins?: PluginItem[];
}

export interface CompileResult {
  events: CompilerEvent[];
  error?: Error;
}

/**
 * Run the React Compiler (via babel transform) on source code and collect events.
 * Returns compiler events for each function in the source.
 */
export async function compileSource(
  source: string,
  filePath: string,
  options: CompileOptions = {},
): Promise<CompileResult> {
  const events: CompilerEvent[] = [];
  const logger = {
    logEvent: (_filename: string | null, event: CompilerEvent) => {
      events.push(event);
    },
  };

  const ext = extname(filePath);
  const isTSX = ext === '.tsx';

  const extraPlugins = options.plugins ?? [];
  const compilerPluginConfig: [string, Record<string, unknown>] = [
    require.resolve('babel-plugin-react-compiler'),
    {
      noEmit: true,
      panicThreshold: 'none',
      ...(options.compilationMode ? { compilationMode: options.compilationMode } : {}),
      logger,
    },
  ];

  try {
    await transformAsync(source, {
      filename: filePath,
      ast: false,
      code: false,
      babelrc: false,
      configFile: false,
      presets: [
        [
          require.resolve('@babel/preset-typescript'),
          {
            isTSX: isTSX || ext === '.ts',
            allExtensions: true,
          },
        ],
      ],
      plugins: [...extraPlugins, compilerPluginConfig],
    });
  } catch (err) {
    return { events, error: err as Error };
  }

  return { events };
}

// ── Unified file compilation ──

export interface FileCompilationResult {
  filePath: string;
  packageName: string;
  source: string;
  events: CompilerEvent[];
  error?: Error;
  manualMemo: Map<string, ManualMemoEntry>;
  bodyInsertionLines: Map<string, number>;
  /** Runtime-risk findings keyed by `line:column` of the enclosing function start. */
  risks: Map<string, RiskFinding[]>;
}

/**
 * Read and compile a single file with the React Compiler + manualMemoPlugin.
 * Returns all metadata needed for both coverage and directive analysis.
 */
export async function compileFile(
  entry: FileEntry,
  compilationMode: CompilationMode,
  verbose: boolean,
  riskConfig: RiskConfig = {},
): Promise<FileCompilationResult> {
  const source = await readFile(entry.filePath, 'utf-8');
  const manualMemo = new Map<string, ManualMemoEntry>();
  const bodyInsertionLines = new Map<string, number>();
  const risks = new Map<string, RiskFinding[]>();

  const { events, error } = await compileSource(source, entry.filePath, {
    compilationMode,
    plugins: [
      [manualMemoPlugin, { results: manualMemo, bodyInsertionLines } as ManualMemoPluginOptions],
      [riskPlugin, { ...riskConfig, results: risks } as RiskPluginOptions],
    ],
  });

  if (verbose && !error) {
    for (const ev of events) {
      const loc = ev.fnLoc ? `${ev.fnLoc.start.line}:${ev.fnLoc.start.column}` : '?';
      const name = ev.fnName ?? '';
      console.log(`  [${ev.kind}] ${entry.filePath} fn@${loc} ${name}`);
    }
  }

  return {
    filePath: entry.filePath,
    packageName: entry.packageName,
    source,
    events,
    error,
    manualMemo,
    bodyInsertionLines,
    risks,
  };
}

/**
 * Compile multiple files with concurrency-limited parallelism.
 */
export async function compileFiles(files: FileEntry[], options: CompileFilesOptions): Promise<FileCompilationResult[]> {
  return processFilesConcurrently(
    files,
    entry => compileFile(entry, options.compilationMode, options.verbose, options.riskConfig).then(r => [r]),
    { concurrency: options.concurrency, verbose: options.verbose },
  );
}
