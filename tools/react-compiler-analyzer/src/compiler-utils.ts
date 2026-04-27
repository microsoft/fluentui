export interface CompilerEvent {
  kind: 'CompileSuccess' | 'CompileError' | 'CompileSkip' | 'PipelineError' | string;
  fnLoc: { start: { line: number; column: number }; end: { line: number; column: number } } | null;
  fnName?: string | null;
  reason?: string;
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
}

/**
 * Extract a human-readable reason string from a CompileError detail object.
 * The `detail` can be a CompilerErrorDetail or CompilerDiagnostic from the
 * React Compiler — both carry a `.reason` and optional `.description`.
 * Falls back to `String(detail)` and then to `Error.toString()`.
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
    if (typeof compilerDetail.description === 'string') {
      parts.push(compilerDetail.description);
    }
    // Some details nest a loc with line/column info
    if (compilerDetail.loc && typeof compilerDetail.loc === 'object' && compilerDetail.loc.start) {
      const start = compilerDetail.loc.start;
      parts.push(`(${start.line ?? '?'}:${start.column ?? '?'})`);
    }
    if (parts.length > 0) {
      return parts.join(' ');
    }
  }
  return String(detail);
}
