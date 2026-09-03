import { relative } from 'node:path';

import type {
  AnalysisDocument,
  CompilationMode,
  DirectiveAnalysis,
  FunctionAnalysis,
  JsonDirective,
  JsonFinding,
  JsonFunction,
  LintDocument,
} from './types';

const SCHEMA_VERSION = 1;

/** Documents are consumed by tooling, so paths are workspace-relative and POSIX-separated. */
function toRelative(filePath: string, workspaceRoot: string): string {
  return relative(workspaceRoot, filePath).split('\\').join('/');
}

export interface DocumentMeta {
  mode: CompilationMode;
  workspaceRoot: string;
  /** Files the parser could not read at all; they contribute no functions to the report. */
  unparseable?: { file: string; error: string }[];
  /** Outcome of `--annotate`, when it ran. */
  annotate?: AnalysisDocument['annotate'];
}

/** Build the machine-readable form of an `analyze` run. Input is expected pre-sorted. */
export function toAnalysisDocument(results: FunctionAnalysis[], meta: DocumentMeta): AnalysisDocument {
  const functions: JsonFunction[] = results.map(r => ({
    file: toRelative(r.filePath, meta.workspaceRoot),
    package: r.packageName,
    line: r.line,
    column: r.column,
    name: r.functionName,
    status: r.status,
    compilerEvent: r.compilerEvent,
    ...(r.reason ? { reason: r.reason } : {}),
    ...(r.memoStats ? { memoStats: r.memoStats } : {}),
    ...(r.manualMemo ? { manualMemo: r.manualMemo } : {}),
  }));

  const findings: JsonFinding[] = [];
  for (const r of results) {
    for (const risk of r.risks ?? []) {
      findings.push({
        file: toRelative(r.filePath, meta.workspaceRoot),
        package: r.packageName,
        line: risk.line,
        column: risk.column,
        rule: risk.ruleId,
        severity: risk.severity,
        symbol: risk.symbol,
        message: risk.message,
        function: r.functionName,
        // Whether the enclosing function is actually memoized — a risk in a non-compiled
        // function is latent, not live.
        compiled: r.status === 'compiled',
        ...(r.status !== 'compiled' && r.existingDirectives?.useNoMemo ? { suppressed: 'use no memo' as const } : {}),
      });
    }
  }

  const unparseable = meta.unparseable ?? [];

  return {
    schemaVersion: SCHEMA_VERSION,
    tool: 'react-compiler-analyzer',
    command: 'analyze',
    mode: meta.mode,
    summary: {
      functions: results.length,
      compiled: results.filter(r => r.status === 'compiled').length,
      skipped: results.filter(r => r.status === 'skipped').length,
      errors: results.filter(r => r.status === 'error').length,
      findings: findings.length,
      findingsOnCompiled: findings.filter(f => f.compiled).length,
      findingsSuppressed: findings.filter(f => f.suppressed).length,
      unparseableFiles: unparseable.length,
    },
    functions,
    findings,
    unparseable: unparseable.map(u => ({ file: toRelative(u.file, meta.workspaceRoot), error: u.error })),
    ...(meta.annotate ? { annotate: meta.annotate } : {}),
  };
}

/** Build the machine-readable form of a `lint` run. Input is expected pre-sorted. */
export function toLintDocument(results: DirectiveAnalysis[], meta: DocumentMeta): LintDocument {
  const directives: JsonDirective[] = results.map(r => ({
    file: toRelative(r.filePath, meta.workspaceRoot),
    package: r.packageName,
    line: r.line,
    directive: r.directiveType,
    status: r.status,
    compilerEvent: r.compilerEvent,
    function: r.functionName,
    ...(r.reason ? { reason: r.reason } : {}),
  }));

  return {
    schemaVersion: SCHEMA_VERSION,
    tool: 'react-compiler-analyzer',
    command: 'lint',
    mode: meta.mode,
    summary: {
      directives: directives.length,
      active: directives.filter(d => d.status === 'active').length,
      redundant: directives.filter(d => d.status === 'redundant').length,
      broken: directives.filter(d => d.status === 'broken').length,
      conflicting: directives.filter(d => d.status === 'conflicting').length,
      skipped: directives.filter(d => d.status === 'skipped').length,
    },
    directives,
  };
}

/**
 * Write a document to stdout as the process's only stdout content, so `--format json` can be
 * piped straight into a parser.
 */
export function writeDocument(doc: unknown): void {
  process.stdout.write(`${JSON.stringify(doc, null, 2)}\n`);
}
