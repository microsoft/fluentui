import { relative } from 'node:path';

import { memoCacheOutcome } from './memo-cache-outcome';
import { createAnalysisProfile } from './analysis-profile';
import type {
  AnalysisDocument,
  AnnotateMode,
  AnnotateResult,
  CompilationMode,
  CoverageAccounting,
  DirectiveAnalysis,
  FileDiagnostic,
  FunctionAnalysis,
  JsonDirective,
  JsonFinding,
  JsonFunction,
  LintDocument,
  SuppressionProtectionReport,
} from './types';

interface DocumentMeta {
  mode: CompilationMode;
  workspaceRoot: string;
  coverage?: CoverageAccounting;
  fileDiagnostics?: FileDiagnostic[];
}

interface AnalysisDocumentMeta extends DocumentMeta {
  unparseable?: { file: string; error: string }[];
  annotate?: AnnotateResult & { mode: AnnotateMode };
  suppressionProtection?: SuppressionProtectionReport;
}

function toRelative(filePath: string, workspaceRoot: string): string {
  return relative(workspaceRoot, filePath).replace(/\\/g, '/');
}

function diagnosticMessage(filePath: string, message: string): string {
  const prefix = `${filePath}:`;
  return message.startsWith(prefix) ? message.slice(prefix.length).trimStart() : message;
}

function defaultCoverage(
  filePaths: string[],
  unparseable: { file: string }[] = [],
  fileDiagnostics: FileDiagnostic[] = [],
): CoverageAccounting {
  const discovered = new Set([
    ...filePaths,
    ...unparseable.map(item => item.file),
    ...fileDiagnostics.map(item => item.file),
  ]);
  const failed = new Set([
    ...unparseable.map(item => item.file),
    ...fileDiagnostics.filter(item => item.stage === 'input').map(item => item.file),
  ]);
  const incomplete = new Set(fileDiagnostics.map(item => item.file).filter(file => !failed.has(file)));
  const discoveredFiles = discovered.size;
  const failedFiles = failed.size;
  const incompleteFiles = incomplete.size;
  return {
    discoveredFiles,
    processedFiles: Math.max(0, discoveredFiles - failedFiles - incompleteFiles),
    failedFiles,
    incompleteFiles,
  };
}

function documentEnvelope(meta: DocumentMeta, filePaths: string[], unparseable: { file: string }[] = []) {
  const coverage = meta.coverage ?? defaultCoverage(filePaths, unparseable, meta.fileDiagnostics);
  return {
    schemaVersion: 5 as const,
    tool: 'react-compiler-analyzer' as const,
    mode: meta.mode,
    profile: createAnalysisProfile(meta.mode),
    emittedCaching: 'unverified' as const,
    completeness:
      coverage.failedFiles + coverage.incompleteFiles === 0 ? ('complete' as const) : ('incomplete' as const),
    coverage,
    fileDiagnostics: (meta.fileDiagnostics ?? []).map(item => ({
      ...item,
      file: toRelative(item.file, meta.workspaceRoot),
    })),
  };
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
          diagnostics: result.diagnostics.map(({ kind, reason, category, count }) => ({
            kind,
            reason,
            ...(category ? { category } : {}),
            count,
          })),
        }
      : {}),
    ...(result.errorLine !== undefined ? { errorLine: result.errorLine } : {}),
    ...(result.errorColumn !== undefined ? { errorColumn: result.errorColumn } : {}),
    ...(result.memoStats !== undefined
      ? { memoStats: result.memoStats ? { memoSlots: result.memoStats.memoSlots } : null }
      : {}),
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
    ...documentEnvelope(
      meta,
      results.map(result => result.filePath),
      meta.unparseable,
    ),
    command: 'analyze',
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
      fileDiagnostics: meta.fileDiagnostics?.length ?? 0,
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
    ...(meta.suppressionProtection
      ? {
          suppressionProtection: {
            ...meta.suppressionProtection,
            results: meta.suppressionProtection.results.map(({ file, ...result }) => ({
              ...result,
              file: toRelative(file, meta.workspaceRoot),
            })),
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
    ...documentEnvelope(
      meta,
      results.map(result => result.filePath),
      meta.unparseable,
    ),
    command: 'lint',
    summary: {
      directives: directives.length,
      active: directives.filter(directive => directive.status === 'active').length,
      redundant: directives.filter(directive => directive.status === 'redundant').length,
      broken: directives.filter(directive => directive.status === 'broken').length,
      conflicting: directives.filter(directive => directive.status === 'conflicting').length,
      skipped: directives.filter(directive => directive.status === 'skipped').length,
      fileDiagnostics: meta.fileDiagnostics?.length ?? 0,
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
