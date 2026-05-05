import { extractDetailReason } from './compiler';
import type { FileCompilationResult } from './compiler';
import type { FunctionAnalysis, MemoStats } from './types';

/**
 * Derive coverage results from a pre-compiled FileCompilationResult.
 * Pure function — no I/O, no compilation.
 */
export function deriveCoverage(result: FileCompilationResult): FunctionAnalysis[] {
  if (result.error) {
    return [];
  }

  const results: FunctionAnalysis[] = [];

  for (const event of result.events) {
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
        filePath: result.filePath,
        packageName: result.packageName,
        line,
        column,
        functionName,
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        memoStats,
      });
    } else if (event.kind === 'CompileSkip') {
      results.push({
        filePath: result.filePath,
        packageName: result.packageName,
        line,
        column,
        functionName,
        status: 'skipped',
        compilerEvent: 'CompileSkip',
        reason: event.reason,
      });
    } else if (event.kind === 'CompileError') {
      results.push({
        filePath: result.filePath,
        packageName: result.packageName,
        line,
        column,
        functionName,
        status: 'error',
        compilerEvent: 'CompileError',
        reason: extractDetailReason(event.detail),
      });
    } else if (event.kind === 'PipelineError') {
      results.push({
        filePath: result.filePath,
        packageName: result.packageName,
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
  for (const r of results) {
    const key = `${r.line}:${r.column}`;
    const memoEntry = result.manualMemo.get(key);
    if (memoEntry) {
      r.manualMemo = {
        useMemo: memoEntry.useMemo,
        useCallback: memoEntry.useCallback,
        reactMemo: memoEntry.reactMemo,
        reactMemoHasComparator: memoEntry.reactMemoHasComparator,
      };
      r.bodyInsertionLine = memoEntry.bodyInsertionLine;
    }
  }

  return results;
}
