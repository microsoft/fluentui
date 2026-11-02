import { relative } from 'node:path';

import { memoCacheOutcome } from './memo-cache-outcome';
import { createAnalysisProfile } from './analysis-profile';
import type {
  AnalysisDocument,
  AnnotateMode,
  AnnotateResult,
  CompilationMode,
  DirectiveAnalysis,
  FunctionAnalysis,
  JsonDirective,
  JsonFinding,
  JsonFunction,
  LintDocument,
} from './types';

interface DocumentMeta {
  mode: CompilationMode;
  workspaceRoot: string;
  parserPlugins?: string[];
}

interface AnalysisDocumentMeta extends DocumentMeta {
  unparseable?: { file: string; error: string }[];
  annotate?: AnnotateResult & { mode: AnnotateMode };
}

function toRelative(filePath: string, workspaceRoot: string): string {
  return relative(workspaceRoot, filePath).replace(/\\/g, '/');
}

function diagnosticMessage(filePath: string, message: string): string {
  const prefix = `${filePath}:`;
  return message.startsWith(prefix) ? message.slice(prefix.length).trimStart() : message;
}

/** Convert analysis results into the compact JSON contract. */
export function toAnalysisDocument(results: FunctionAnalysis[], meta: AnalysisDocumentMeta): AnalysisDocument {
  const functions: JsonFunction[] = results.map(result => ({
    file: toRelative(result.filePath, meta.workspaceRoot),
    package: result.packageName,
    line: result.line,
    column: result.column ?? 0,
    function: result.functionName,
    status: result.status,
    compilerEvent: result.compilerEvent,
    ...(result.reason ? { reason: result.reason } : {}),
    ...(result.rejectionKind ? { rejectionKind: result.rejectionKind } : {}),
    ...(result.diagnostics?.length
      ? {
          diagnostics: result.diagnostics.map(({ kind, reason, category }) => ({
            kind,
            reason,
            ...(category ? { category } : {}),
          })),
        }
      : {}),
    ...(result.errorLine !== undefined ? { errorLine: result.errorLine } : {}),
    ...(result.errorColumn !== undefined ? { errorColumn: result.errorColumn } : {}),
    ...(result.memoStats !== undefined ? { memoStats: result.memoStats } : {}),
    ...(result.manualMemo
      ? {
          manualMemo: {
            useMemo: result.manualMemo.useMemo,
            useCallback: result.manualMemo.useCallback,
            reactMemo: result.manualMemo.reactMemo,
            reactMemoHasComparator: result.manualMemo.reactMemoHasComparator,
          },
        }
      : {}),
  }));

  const findings: JsonFinding[] = results.flatMap(result =>
    (result.risks ?? []).map(finding => ({
      file: toRelative(result.filePath, meta.workspaceRoot),
      package: result.packageName,
      line: finding.line,
      column: finding.column,
      function: result.functionName,
      ruleId: finding.ruleId,
      severity: finding.severity,
      symbol: finding.symbol,
      message: finding.message,
      compiled: result.status === 'compiled',
      ...(result.existingDirectives?.useNoMemo ? { suppressed: true } : {}),
    })),
  );

  return {
    schemaVersion: 3,
    tool: 'react-compiler-analyzer',
    command: 'analyze',
    mode: meta.mode,
    profile: createAnalysisProfile(meta.mode, meta.parserPlugins),
    emittedCaching: 'unverified',
    summary: {
      functions: functions.length,
      compiled: results.filter(result => result.status === 'compiled').length,
      reportedMemoCachePositive: results.filter(
        result => result.status === 'compiled' && memoCacheOutcome(result) === 'positive',
      ).length,
      reportedMemoCacheZero: results.filter(
        result => result.status === 'compiled' && memoCacheOutcome(result) === 'zero',
      ).length,
      reportedMemoCacheUnavailable: results.filter(
        result => result.status === 'compiled' && memoCacheOutcome(result) === 'unavailable',
      ).length,
      suppressionRejected: results.filter(result => result.rejectionKind === 'suppression-related').length,
      suppressionRejectedWithRisks: results.filter(
        result => result.rejectionKind === 'suppression-related' && result.risks?.length,
      ).length,
      skipped: results.filter(result => result.status === 'skipped').length,
      errors: results.filter(result => result.status === 'error').length,
      findings: findings.length,
      findingsOnCompiled: findings.filter(finding => finding.compiled && !finding.suppressed).length,
      findingsSuppressed: findings.filter(finding => finding.suppressed).length,
      unparseableFiles: meta.unparseable?.length ?? 0,
    },
    functions,
    findings,
    unparseable: (meta.unparseable ?? []).map(item => ({
      file: toRelative(item.file, meta.workspaceRoot),
      error: diagnosticMessage(item.file, item.error),
    })),
    ...(meta.annotate
      ? {
          annotate: {
            mode: meta.annotate.mode,
            filesModified: meta.annotate.filesModified,
            functionsAnnotated: meta.annotate.functionsAnnotated,
            functionsBailedOut: meta.annotate.functionsBailedOut,
            targets: (meta.annotate.targets ?? []).map(({ filePath, ...target }) => ({
              ...target,
              file: toRelative(filePath, meta.workspaceRoot),
            })),
            ...(meta.annotate.dryRun ? { dryRun: true as const, planned: meta.annotate.planned } : {}),
          },
        }
      : {}),
  };
}

/** Convert directive lint results into the compact JSON contract. */
export function toLintDocument(
  results: DirectiveAnalysis[],
  meta: DocumentMeta & { unparseable?: { file: string; error: string }[] },
): LintDocument {
  const directives: JsonDirective[] = results.map(result => ({
    file: toRelative(result.filePath, meta.workspaceRoot),
    package: result.packageName,
    line: result.line,
    column: result.column ?? 0,
    directive: result.directiveType,
    status: result.status,
    compilerEvent: result.compilerEvent,
    function: result.functionName,
    ...(result.reason ? { reason: result.reason } : {}),
    ...(result.revalidated ? { justified: true as const, revalidated: true as const } : {}),
    ...(result.evidence ? { evidence: result.evidence } : {}),
  }));

  return {
    schemaVersion: 3,
    tool: 'react-compiler-analyzer',
    command: 'lint',
    mode: meta.mode,
    profile: createAnalysisProfile(meta.mode, meta.parserPlugins),
    emittedCaching: 'unverified',
    summary: {
      directives: directives.length,
      active: directives.filter(directive => directive.status === 'active').length,
      redundant: directives.filter(directive => directive.status === 'redundant').length,
      broken: directives.filter(directive => directive.status === 'broken').length,
      conflicting: directives.filter(directive => directive.status === 'conflicting').length,
      skipped: directives.filter(directive => directive.status === 'skipped').length,
      unparseableFiles: meta.unparseable?.length ?? 0,
    },
    directives,
    unparseable: (meta.unparseable ?? []).map(item => ({
      file: toRelative(item.file, meta.workspaceRoot),
      error: diagnosticMessage(item.file, item.error),
    })),
  };
}

/** Write exactly one JSON document to stdout. */
export function writeDocument(document: AnalysisDocument | LintDocument): void {
  process.stdout.write(`${JSON.stringify(document, null, 2)}\n`);
}
