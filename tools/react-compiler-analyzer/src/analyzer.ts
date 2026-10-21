import { compileSource } from './compiler';
import type { FileCompilationResult } from './compiler';
import { normalizeCompilerEvents } from './compiler-events';
import { compareText } from './ordering';
import type { CompilationMode, DirectiveAnalysis, DirectiveOccurrence, FunctionAnalysis } from './types';

export interface DirectiveAnalysisOptions {
  parserPlugins?: string[];
  revalidateJustified?: boolean;
}

function compilerEventOf(analysis: FunctionAnalysis | undefined): DirectiveAnalysis['compilerEvent'] {
  if (!analysis) {
    return 'none';
  }
  if (analysis.compilerEvent === 'CompileSkip') {
    return 'skipped';
  }
  return analysis.compilerEvent;
}

function toDirectiveAnalysis(
  result: FileCompilationResult,
  directive: DirectiveOccurrence,
  values: Pick<DirectiveAnalysis, 'status' | 'compilerEvent'> &
    Partial<Pick<DirectiveAnalysis, 'reason' | 'fullReason'>>,
): DirectiveAnalysis {
  return {
    filePath: result.filePath,
    packageName: result.packageName,
    line: directive.line,
    column: directive.column,
    functionName: directive.functionId ? result.sourceFunctions.get(directive.functionId)?.name ?? null : null,
    sourceFunctionId: directive.functionId,
    directiveId: directive.id,
    directiveSpan: directive.span,
    sourceHash: result.sourceHash,
    directiveType: directive.directiveType,
    ...values,
  };
}

function conflictIds(directives: DirectiveOccurrence[], includeJustified = false): Set<string> {
  const byFunction = new Map<string, DirectiveOccurrence[]>();
  for (const directive of directives) {
    if (!directive.functionId || (directive.justified && !includeJustified)) {
      continue;
    }
    const list = byFunction.get(directive.functionId) ?? [];
    list.push(directive);
    byFunction.set(directive.functionId, list);
  }
  const conflicts = new Set<string>();
  for (const list of byFunction.values()) {
    if (
      list.some(directive => directive.directiveType === 'use-memo') &&
      list.some(directive => directive.directiveType === 'use-no-memo')
    ) {
      for (const directive of list) {
        conflicts.add(directive.id);
      }
    }
  }
  return conflicts;
}

function analysisByFunction(result: FileCompilationResult): Map<string, FunctionAnalysis> {
  const normalized = normalizeCompilerEvents(result.events, result.source, result.sourceFunctions, {
    sourceHash: result.sourceHash,
  });
  return new Map(normalized.analyses.map(analysis => [analysis.sourceFunctionId!, analysis]));
}

/** Derive one status for every real `'use memo'` directive from canonical terminal outcomes. */
export function deriveMemoDirectiveStatuses(
  result: FileCompilationResult,
  _compilationMode: CompilationMode,
  options: DirectiveAnalysisOptions = {},
): DirectiveAnalysis[] {
  const directives = result.sourceFunctions.directives();
  if (directives.length === 0) {
    return [];
  }
  const conflicts = conflictIds(directives, options.revalidateJustified);
  const analyses = result.error ? new Map<string, FunctionAnalysis>() : analysisByFunction(result);
  const output: DirectiveAnalysis[] = [];

  for (const directive of directives) {
    if (directive.justified) {
      if (options.revalidateJustified) {
        continue;
      }
      output.push(
        toDirectiveAnalysis(result, directive, {
          status: 'skipped',
          compilerEvent: 'skipped',
          reason: directive.justification,
        }),
      );
      continue;
    }
    if (conflicts.has(directive.id)) {
      output.push(
        toDirectiveAnalysis(result, directive, {
          status: 'conflicting',
          compilerEvent: 'none',
          reason: "conflicting directives: both 'use no memo' and 'use memo' on same function",
        }),
      );
      continue;
    }
    if (directive.directiveType !== 'use-memo') {
      continue;
    }
    if (result.error) {
      output.push(
        toDirectiveAnalysis(result, directive, {
          status: 'broken',
          compilerEvent: 'none',
          reason: `babel parse error:\n${result.error.stack ?? result.error.message}`,
        }),
      );
      continue;
    }

    const analysis = directive.functionId ? analyses.get(directive.functionId) : undefined;
    if (!analysis) {
      output.push(
        toDirectiveAnalysis(result, directive, {
          status: 'broken',
          compilerEvent: 'none',
          reason: 'no compiler event - function not recognized as React component/hook',
        }),
      );
    } else if (analysis.status === 'compiled') {
      output.push(toDirectiveAnalysis(result, directive, { status: 'active', compilerEvent: 'CompileSuccess' }));
    } else {
      output.push(
        toDirectiveAnalysis(result, directive, {
          status: 'broken',
          compilerEvent: compilerEventOf(analysis),
          ...(analysis.reason ? { reason: analysis.reason } : {}),
          ...(analysis.fullReason ? { fullReason: analysis.fullReason } : {}),
        }),
      );
    }
  }

  return output.sort(
    (a, b) => a.line - b.line || (a.column ?? 0) - (b.column ?? 0) || compareText(a.directiveId!, b.directiveId!),
  );
}

function neutralizeNoMemo(source: string, directives: DirectiveOccurrence[]): string {
  let output = source;
  for (const directive of [...directives].sort((a, b) => b.span.start.offset - a.span.start.offset)) {
    const { start, end } = directive.span;
    const original = output.slice(start.offset, end.offset);
    const neutral = original.replace('use no memo', 'use no-memo');
    output = output.slice(0, start.offset) + neutral + output.slice(end.offset);
  }
  return output;
}

/**
 * Probe `'use no memo'` directives by neutralizing them in place. Source offsets, CRLF line
 * endings, parser plugins, and every other compiler setting remain identical to the first pass.
 */
export async function analyzeNoMemoDirectives(
  result: FileCompilationResult,
  compilationMode: CompilationMode,
  verbose = false,
  options: DirectiveAnalysisOptions = {},
): Promise<DirectiveAnalysis[]> {
  const allDirectives = result.sourceFunctions.directives();
  const conflicts = conflictIds(allDirectives, options.revalidateJustified);
  const preserved = allDirectives
    .filter(directive => directive.directiveType === 'use-no-memo' && !directive.justified && !directive.functionId)
    .map(directive =>
      toDirectiveAnalysis(result, directive, {
        status: 'skipped',
        compilerEvent: 'skipped',
        reason: 'file-level opt-out preserved',
      }),
    );
  const directives = allDirectives.filter(
    directive =>
      directive.directiveType === 'use-no-memo' &&
      directive.functionId &&
      !directive.justified &&
      !conflicts.has(directive.id),
  );
  if (directives.length === 0) {
    return preserved;
  }

  const modifiedSource = neutralizeNoMemo(result.source, directives);
  const { events, error } = await compileSource(modifiedSource, result.filePath, {
    compilationMode,
    parserPlugins: options.parserPlugins ?? result.parserPlugins,
  });

  if (verbose && !error) {
    result.verboseLogs.push(
      ...events.map(event => {
        const loc = event.fnLoc ? `${event.fnLoc.start.line}:${event.fnLoc.start.column}` : '?';
        return `  [probe:${event.kind}] ${result.filePath} fn@${loc} ${event.fnName ?? ''}`;
      }),
    );
  }

  if (error) {
    const fullTrace = error.stack ?? error.message;
    return [
      ...preserved,
      ...directives.map(directive =>
        toDirectiveAnalysis(result, directive, {
          status: 'broken',
          compilerEvent: 'none',
          reason: `opt-out probe failed:\n${fullTrace}`,
        }),
      ),
    ];
  }

  const normalized = normalizeCompilerEvents(events, modifiedSource, result.sourceFunctions, {
    sourceHash: result.sourceHash,
  });
  const analyses = new Map(normalized.analyses.map(analysis => [analysis.sourceFunctionId!, analysis]));

  return [
    ...preserved,
    ...directives.map(directive => {
      const analysis = directive.functionId ? analyses.get(directive.functionId) : undefined;
      if (analysis?.status === 'compiled') {
        if (compilationMode === 'annotation') {
          return toDirectiveAnalysis(result, directive, {
            status: 'redundant',
            compilerEvent: 'CompileSuccess',
            reason: "in annotation mode, compiler requires 'use memo' - 'use no memo' has no effect",
          });
        }
        return toDirectiveAnalysis(result, directive, {
          status: 'active',
          compilerEvent: 'CompileSuccess',
        });
      }
      return toDirectiveAnalysis(result, directive, {
        status: 'redundant',
        compilerEvent: compilerEventOf(analysis),
        reason: analysis?.reason ?? 'no compiler event - function not recognized as React component/hook',
        ...(analysis?.fullReason ? { fullReason: analysis.fullReason } : {}),
      });
    }),
  ].sort((a, b) => a.line - b.line || (a.column ?? 0) - (b.column ?? 0) || compareText(a.directiveId!, b.directiveId!));
}

/** Revalidate one justified directive at a time without making it eligible for source fixes. */
export async function revalidateJustifiedDirectives(
  result: FileCompilationResult,
  compilationMode: CompilationMode,
  options: DirectiveAnalysisOptions = {},
): Promise<DirectiveAnalysis[]> {
  const directives = result.sourceFunctions.directives();
  const conflicts = conflictIds(directives, true);
  const original = analysisByFunction(result);
  const output: DirectiveAnalysis[] = [];
  for (const directive of directives.filter(item => item.justified)) {
    const report = (values: Parameters<typeof toDirectiveAnalysis>[2]) =>
      output.push({
        ...toDirectiveAnalysis(result, directive, values),
        justified: true,
        revalidated: true,
      });
    if (!directive.functionId) {
      report({
        status: 'skipped',
        compilerEvent: 'skipped',
        reason: 'file-level directive preserved; function-level revalidation unavailable (report-only)',
      });
      continue;
    }
    if (conflicts.has(directive.id)) {
      report({
        status: 'conflicting',
        compilerEvent: 'none',
        reason: "conflicting 'use memo' and 'use no memo' directives; justified directive is report-only",
      });
      continue;
    }
    const initial = original.get(directive.functionId);
    if (
      result.error ||
      initial?.compilerEvent === 'PipelineError' ||
      (directive.directiveType === 'use-memo' && initial?.status !== 'compiled')
    ) {
      report({
        status: 'broken',
        compilerEvent: compilerEventOf(initial),
        reason: result.error?.message ?? initial?.reason ?? 'original opt-in has no successful compiler outcome',
      });
      continue;
    }
    const { start, end } = directive.span;
    const text = result.source.slice(start.offset, end.offset);
    const neutral = text.replace(
      directive.directiveType === 'use-memo' ? 'use memo' : 'use no memo',
      directive.directiveType === 'use-memo' ? 'use-memo' : 'use no-memo',
    );
    const source = result.source.slice(0, start.offset) + neutral + result.source.slice(end.offset);
    const probe = await compileSource(source, result.filePath, {
      compilationMode,
      parserPlugins: options.parserPlugins ?? result.parserPlugins,
    });
    const normalized = normalizeCompilerEvents(probe.events, source, result.sourceFunctions);
    const analysis = normalized.analyses.find(item => item.sourceFunctionId === directive.functionId);
    if (probe.error || normalized.unattributedErrors.length > 0 || analysis?.compilerEvent === 'PipelineError') {
      report({
        status: 'broken',
        compilerEvent: compilerEventOf(analysis),
        reason: `directive revalidation unavailable: ${
          probe.error?.message ??
          (normalized.unattributedErrors.map(item => item.reason).join('; ') || analysis?.reason)
        }`,
      });
      continue;
    }
    const accepted = analysis?.status === 'compiled';
    const active = directive.directiveType === 'use-memo' ? !accepted : accepted;
    report({
      status: active ? 'active' : 'redundant',
      compilerEvent: compilerEventOf(analysis),
      reason: `${
        active ? 'changes' : 'does not change'
      } Babel compiler acceptance in ${compilationMode} mode; justified directive is report-only, not a native-parity or performance guarantee`,
    });
  }
  return output;
}
