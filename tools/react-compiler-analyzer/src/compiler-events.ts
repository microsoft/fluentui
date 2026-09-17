import {
  extractDetailLoc,
  extractDetailReason,
  extractFullDiagnostic,
  resolveSkipReason,
  type CompilerEvent,
} from './compiler';
import type { SourceFunctionIndex } from './source-functions';
import { compareText } from './ordering';
import type {
  CompilerDiagnostic,
  CompilerOccurrence,
  FunctionAnalysis,
  FunctionStatus,
  NullableMemoStats,
} from './types';

const TERMINAL_KINDS = new Set(['CompileSuccess', 'CompileError', 'CompileSkip', 'PipelineError']);

export interface NormalizeCompilerEventsOptions {
  sourceHash?: string;
  includeFullDiagnostics?: boolean;
  includeMutationMetadata?: boolean;
}

export interface NormalizedCompilerEvents {
  analyses: FunctionAnalysis[];
}

function nullableMemoStats(event: CompilerEvent): NullableMemoStats {
  return {
    memoSlots: event.memoSlots ?? null,
    memoBlocks: event.memoBlocks ?? null,
    memoValues: event.memoValues ?? null,
    prunedMemoBlocks: event.prunedMemoBlocks ?? null,
    prunedMemoValues: event.prunedMemoValues ?? null,
  };
}

function occurrenceFor(
  event: CompilerEvent,
  ordinal: number,
  source: string,
  index: SourceFunctionIndex,
  includeFullDiagnostics: boolean,
): CompilerOccurrence {
  const rawFunctionSpan = index.spanFromLocation(event.fnLoc);
  const detailLocation = extractDetailLoc(event.detail);
  const diagnosticSpan = detailLocation ? index.pointSpan(detailLocation.line, detailLocation.column) : null;
  const fn = rawFunctionSpan ? index.resolveSpan(rawFunctionSpan) : null;
  const reason =
    event.kind === 'CompileSkip'
      ? resolveSkipReason(event, source)
      : event.kind === 'CompileError'
      ? extractDetailReason(event.detail)
      : event.kind === 'PipelineError'
      ? event.data ?? ''
      : undefined;
  const fullReason = includeFullDiagnostics
    ? event.kind === 'CompileError'
      ? extractFullDiagnostic(event.detail, source)
      : event.kind === 'PipelineError' && event.data?.includes('\n')
      ? event.data
      : undefined
    : undefined;

  return {
    ordinal,
    kind: event.kind,
    functionId: fn?.id ?? null,
    rawFunctionSpan,
    diagnosticSpan,
    ...(reason ? { reason } : {}),
    ...(fullReason ? { fullReason } : {}),
    ...(event.kind === 'CompileSuccess' ? { memoStats: nullableMemoStats(event) } : {}),
  };
}

function occurrenceKey(occurrence: CompilerOccurrence): string {
  return JSON.stringify([
    occurrence.kind,
    occurrence.functionId,
    occurrence.rawFunctionSpan,
    occurrence.diagnosticSpan,
    occurrence.reason ?? null,
    occurrence.fullReason ?? null,
    occurrence.memoStats ?? null,
  ]);
}

function dedupeOccurrences(occurrences: CompilerOccurrence[]): CompilerOccurrence[] {
  const deduped: CompilerOccurrence[] = [];
  let previousKey: string | undefined;
  for (const occurrence of occurrences) {
    const key = occurrenceKey(occurrence);
    if (key !== previousKey) {
      deduped.push(occurrence);
    }
    previousKey = key;
  }
  return deduped;
}

function reduceStatus(events: CompilerOccurrence[]): FunctionStatus {
  const terminal = events[events.length - 1];
  if (terminal.kind === 'CompileSuccess') {
    return 'compiled';
  }
  if (terminal.kind === 'CompileSkip') {
    return 'skipped';
  }
  return 'error';
}

function diagnosticsFor(events: CompilerOccurrence[]): CompilerDiagnostic[] {
  return events
    .filter(
      (event): event is CompilerOccurrence & { kind: 'CompileError' | 'PipelineError' } =>
        event.kind === 'CompileError' || event.kind === 'PipelineError',
    )
    .map(event => ({
      kind: event.kind,
      span: event.diagnosticSpan,
      reason: event.reason ?? '',
      ...(event.fullReason ? { fullReason: event.fullReason } : {}),
    }));
}

/** Normalize compiler events into one terminal analysis per canonical source function. */
export function normalizeCompilerEvents(
  events: CompilerEvent[],
  source: string,
  index: SourceFunctionIndex,
  options: NormalizeCompilerEventsOptions = {},
): NormalizedCompilerEvents {
  const includeFullDiagnostics = options.includeFullDiagnostics ?? true;
  const includeMutationMetadata = options.includeMutationMetadata ?? true;
  const rawOccurrences = events
    .map((event, ordinal) => ({ event, ordinal }))
    .filter(({ event }) => TERMINAL_KINDS.has(event.kind))
    .map(({ event, ordinal }) => occurrenceFor(event, ordinal, source, index, includeFullDiagnostics));
  const occurrences = dedupeOccurrences(rawOccurrences);
  const grouped = new Map<string, CompilerOccurrence[]>();

  for (const occurrence of occurrences) {
    if (!occurrence.functionId) {
      continue;
    }
    const list = grouped.get(occurrence.functionId) ?? [];
    list.push(occurrence);
    grouped.set(occurrence.functionId, list);
  }

  const analyses: FunctionAnalysis[] = [];
  for (const [functionId, functionEvents] of grouped) {
    const fn = index.get(functionId);
    if (!fn) {
      continue;
    }
    const status = reduceStatus(functionEvents);
    const diagnostics = diagnosticsFor(functionEvents);
    const terminal = functionEvents[functionEvents.length - 1];
    const lastDiagnostic = diagnostics[diagnostics.length - 1];
    const terminalEvent: FunctionAnalysis['compilerEvent'] =
      status === 'compiled'
        ? 'CompileSuccess'
        : status === 'skipped'
        ? 'CompileSkip'
        : lastDiagnostic?.kind ?? 'CompileError';
    const reason = status === 'skipped' ? terminal.reason : status === 'error' ? lastDiagnostic?.reason : undefined;
    const firstDiagnosticPosition = lastDiagnostic?.span?.start;
    const useMemo = fn.directives.some(directive => directive.directiveType === 'use-memo');
    const useNoMemo = fn.directives.some(directive => directive.directiveType === 'use-no-memo');

    analyses.push({
      filePath: fn.filePath,
      packageName: fn.packageName,
      line: fn.declarationSpan.start.line,
      column: fn.declarationSpan.start.column,
      functionName: fn.name,
      sourceFunctionId: fn.id,
      functionKind: fn.kind,
      status,
      compilerEvent: terminalEvent,
      ...(status === 'error' ? { diagnostics } : {}),
      ...(reason ? { reason } : {}),
      ...(status === 'error' && lastDiagnostic?.fullReason ? { fullReason: lastDiagnostic.fullReason } : {}),
      ...(status === 'error' && firstDiagnosticPosition
        ? { errorLine: firstDiagnosticPosition.line, errorColumn: firstDiagnosticPosition.column }
        : {}),
      memoStats: status === 'compiled' ? terminal.memoStats ?? null : null,
      ...(fn.manualMemo
        ? {
            manualMemo: {
              useMemo: fn.manualMemo.useMemo,
              useCallback: fn.manualMemo.useCallback,
              reactMemo: fn.manualMemo.reactMemo,
              reactMemoHasComparator: fn.manualMemo.reactMemoHasComparator,
            },
          }
        : {}),
      ...(includeMutationMetadata && fn.bodyInsertionLine ? { bodyInsertionLine: fn.bodyInsertionLine } : {}),
      ...(includeMutationMetadata && fn.bodyInsertionOffset !== null
        ? { bodyInsertionOffset: fn.bodyInsertionOffset }
        : {}),
      ...(includeMutationMetadata && options.sourceHash ? { sourceHash: options.sourceHash } : {}),
      existingDirectives: { useMemo, useNoMemo },
      ...(fn.findings?.length
        ? {
            risks: fn.findings.map(finding => ({
              ruleId: finding.ruleId,
              severity: finding.severity,
              line: finding.line,
              column: finding.column,
              symbol: finding.symbol,
              message: finding.message,
            })),
          }
        : {}),
    });
  }

  analyses.sort(
    (a, b) => a.line - b.line || a.column - b.column || compareText(a.sourceFunctionId ?? '', b.sourceFunctionId ?? ''),
  );
  return { analyses };
}
