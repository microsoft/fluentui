import type { FileCompilationResult } from './compiler';
import {
  normalizeCompilerEvents,
  type NormalizeCompilerEventsOptions,
  type NormalizedCompilerEvents,
} from './compiler-events';
import type { FunctionAnalysis } from './types';

export function isParseError(error: Error): boolean {
  return 'code' in error && error.code === 'BABEL_PARSE_ERROR';
}

export function deriveCompilerAnalysis(
  result: FileCompilationResult,
  options: NormalizeCompilerEventsOptions = {},
): NormalizedCompilerEvents {
  if (result.error) {
    return { analyses: [], unattributedErrors: [] };
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
  if (result.error && !isParseError(result.error)) {
    throw new Error(`Compiler failed for ${result.filePath}: ${result.error.message}`);
  }
  const normalized = deriveCompilerAnalysis(result);
  if (normalized.unattributedErrors.length > 0) {
    throw new Error(
      `Compiler failed for ${result.filePath}: ${normalized.unattributedErrors
        .map(error => `${error.kind}: ${error.reason}`)
        .join('; ')}`,
    );
  }
  return normalized.analyses;
}
