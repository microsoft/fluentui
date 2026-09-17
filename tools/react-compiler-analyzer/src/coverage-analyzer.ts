import type { FileCompilationResult } from './compiler';
import {
  normalizeCompilerEvents,
  type NormalizeCompilerEventsOptions,
  type NormalizedCompilerEvents,
} from './compiler-events';
import type { FunctionAnalysis } from './types';

export function deriveCompilerAnalysis(
  result: FileCompilationResult,
  options: NormalizeCompilerEventsOptions = {},
): NormalizedCompilerEvents {
  if (result.error) {
    return { analyses: [] };
  }
  return normalizeCompilerEvents(result.events, result.source, result.sourceFunctions, {
    sourceHash: result.sourceHash,
    ...options,
  });
}

/**
 * Reduce every compiler occurrence to one canonical source-function analysis.
 */
export function deriveCoverage(result: FileCompilationResult): FunctionAnalysis[] {
  return deriveCompilerAnalysis(result).analyses;
}
