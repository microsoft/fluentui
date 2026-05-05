import { readFile } from 'node:fs/promises';

import { compileSource, extractDetailReason } from './compiler';
import type { CompilerEvent } from './compiler';
import { processFilesConcurrently } from './concurrency';
import type {
  FunctionAnalysis,
  FileEntry,
  CoverageAnalyzerOptions,
  CompilationMode,
  MemoStats,
  ManualMemoization,
} from './types';
import { manualMemoPlugin, ManualMemoEntry, ManualMemoPluginOptions } from './manual-memo-plugin';

/**
 * Analyze a single file to determine which functions the React Compiler would memoize.
 */
export async function analyzeFileForCoverage(
  filePath: string,
  packageName: string,
  compilationMode: CompilationMode,
  verbose: boolean,
): Promise<FunctionAnalysis[]> {
  const source = await readFile(filePath, 'utf-8');
  const results: FunctionAnalysis[] = [];

  // Collect manual memoization data
  const manualMemoResults = new Map<string, ManualMemoEntry>();

  const { events, error } = await compileSource(source, filePath, {
    compilationMode,
    plugins: [[manualMemoPlugin, { results: manualMemoResults } as ManualMemoPluginOptions]],
  });

  if (error) {
    if (verbose) {
      console.error(`  babel error in ${filePath}: ${error.message}`);
    }
    // Nothing to report — file-level parse errors don't produce function-level results
    return results;
  }

  if (verbose) {
    for (const ev of events) {
      const loc = ev.fnLoc ? `${ev.fnLoc.start.line}:${ev.fnLoc.start.column}` : '?';
      const name = ev.fnName ?? '';
      console.log(`  [${ev.kind}] ${filePath} fn@${loc} ${name}`);
    }
  }

  for (const event of events) {
    // Skip non-analysis events (Timing, AutoDeps*, etc.)
    if (!['CompileSuccess', 'CompileError', 'CompileSkip', 'PipelineError'].includes(event.kind)) {
      continue;
    }

    const line = event.fnLoc?.start.line ?? 0;
    const column = event.fnLoc?.start.column ?? 0;
    const functionName = event.fnName ?? null;

    if (event.kind === 'CompileSuccess') {
      const memoStats: MemoStats = {
        memoSlots: event.memoSlots ?? 0,
        memoBlocks: event.memoBlocks ?? 0,
        memoValues: event.memoValues ?? 0,
        prunedMemoBlocks: event.prunedMemoBlocks ?? 0,
        prunedMemoValues: event.prunedMemoValues ?? 0,
      };

      results.push({
        filePath,
        packageName,
        line,
        column,
        functionName,
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        memoStats,
      });
    } else if (event.kind === 'CompileSkip') {
      results.push({
        filePath,
        packageName,
        line,
        column,
        functionName,
        status: 'skipped',
        compilerEvent: 'CompileSkip',
        reason: event.reason,
      });
    } else if (event.kind === 'CompileError') {
      results.push({
        filePath,
        packageName,
        line,
        column,
        functionName,
        status: 'error',
        compilerEvent: 'CompileError',
        reason: extractDetailReason(event.detail),
      });
    } else if (event.kind === 'PipelineError') {
      results.push({
        filePath,
        packageName,
        line,
        column,
        functionName,
        status: 'error',
        compilerEvent: 'PipelineError',
        reason: event.data ?? '',
      });
    }
  }

  // Merge manual memoization data into results by matching function location
  for (const result of results) {
    const key = `${result.line}:${result.column}`;
    const memoEntry = manualMemoResults.get(key);
    if (memoEntry) {
      result.manualMemo = {
        useMemo: memoEntry.useMemo,
        useCallback: memoEntry.useCallback,
        reactMemo: memoEntry.reactMemo,
        reactMemoHasComparator: memoEntry.reactMemoHasComparator,
      };
      result.bodyInsertionLine = memoEntry.bodyInsertionLine;
    }
  }

  return results;
}

/**
 * Analyze multiple files for coverage with concurrency-limited parallelism.
 */
export async function analyzeFilesForCoverage(
  files: FileEntry[],
  options: CoverageAnalyzerOptions,
): Promise<FunctionAnalysis[]> {
  const { concurrency, verbose, compilationMode } = options;

  return processFilesConcurrently(
    files,
    entry => analyzeFileForCoverage(entry.filePath, entry.packageName, compilationMode, verbose),
    { concurrency, verbose },
  );
}
