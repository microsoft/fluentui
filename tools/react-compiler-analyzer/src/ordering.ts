import type { RiskFinding, SourceFunction, SourceSpan } from './types';

export function compareText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function compareSpans(a: SourceSpan, b: SourceSpan): number {
  return a.start.offset - b.start.offset || a.end.offset - b.end.offset;
}

export function compareSourceFunctions(a: SourceFunction, b: SourceFunction): number {
  return (
    compareText(a.packageName ?? '', b.packageName ?? '') ||
    compareText(a.filePath, b.filePath) ||
    compareSpans(a.declarationSpan, b.declarationSpan) ||
    compareText(a.id, b.id)
  );
}

export function compareRiskFindings(a: RiskFinding, b: RiskFinding): number {
  return (
    a.line - b.line ||
    a.column - b.column ||
    compareText(a.ruleId, b.ruleId) ||
    compareText(a.symbol, b.symbol) ||
    compareText(a.message, b.message)
  );
}
