import { extractDetailLoc, extractDetailReason, extractFullDiagnostic, resolveSkipReason } from './compiler';
import type { FileCompilationResult } from './compiler';
import type { FunctionAnalysis, MemoStats } from './types';

/** Options for {@link deriveCoverage}. */
export interface DeriveCoverageOptions {
  /** When true, error reasons include the compiler's full code-framed diagnostic. */
  fullReasons?: boolean;
}

/**
 * Derive coverage results from a pre-compiled FileCompilationResult.
 * Pure function — no I/O, no compilation.
 */
export function deriveCoverage(result: FileCompilationResult, options: DeriveCoverageOptions = {}): FunctionAnalysis[] {
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
        reason: resolveSkipReason(event, result.source),
      });
    } else if (event.kind === 'CompileError') {
      const fullReason = options.fullReasons ? extractFullDiagnostic(event.detail, result.source) : '';
      const errorLoc = extractDetailLoc(event.detail);
      results.push({
        filePath: result.filePath,
        packageName: result.packageName,
        line,
        column,
        functionName,
        status: 'error',
        compilerEvent: 'CompileError',
        reason: extractDetailReason(event.detail),
        ...(fullReason ? { fullReason } : {}),
        ...(errorLoc ? { errorLine: errorLoc.line, errorColumn: errorLoc.column } : {}),
      });
    } else if (event.kind === 'PipelineError') {
      const data = event.data ?? '';
      results.push({
        filePath: result.filePath,
        packageName: result.packageName,
        line,
        column,
        functionName,
        status: 'error',
        compilerEvent: 'PipelineError',
        reason: data,
        ...(options.fullReasons && data.includes('\n') ? { fullReason: data } : {}),
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

    // Merge bodyInsertionLine from the all-functions map for compiled functions
    // that don't already have one from the manual-memo map
    if (!r.bodyInsertionLine) {
      const insertionLine = result.bodyInsertionLines.get(key);
      if (insertionLine) {
        r.bodyInsertionLine = insertionLine;
      }
    }

    // Attach runtime-risk findings — only meaningful for functions the compiler
    // will actually memoize (CompileSuccess).
    if (r.status === 'compiled') {
      const risks = result.risks.get(key);
      if (risks && risks.length > 0) {
        r.risks = risks;
      }
    }
  }

  return results;
}
