import { compileSource } from './compiler';
import type { FileCompilationResult } from './compiler';
import { normalizeCompilerEvents } from './compiler-events';
import { compareText } from './ordering';
import type { CompilationMode, DirectiveAnalysis, DirectiveOccurrence, FunctionAnalysis } from './types';

export interface DirectiveAnalysisOptions {
  parserPlugins?: string[];
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

function conflictIds(directives: DirectiveOccurrence[]): Set<string> {
  const byFunction = new Map<string, DirectiveOccurrence[]>();
  for (const directive of directives) {
    if (!directive.functionId || directive.justified) {
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
): DirectiveAnalysis[] {
  const directives = result.sourceFunctions.directives();
  if (directives.length === 0) {
    return [];
  }
  const conflicts = conflictIds(directives);
  const analyses = result.error ? new Map<string, FunctionAnalysis>() : analysisByFunction(result);
  const output: DirectiveAnalysis[] = [];

  for (const directive of directives) {
    if (directive.justified) {
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
  const conflicts = conflictIds(allDirectives);
  const directives = allDirectives.filter(
    directive => directive.directiveType === 'use-no-memo' && !directive.justified && !conflicts.has(directive.id),
  );
  if (directives.length === 0) {
    return [];
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
    return directives.map(directive =>
      toDirectiveAnalysis(result, directive, {
        status: 'redundant',
        compilerEvent: 'none',
        reason: `babel parse error:\n${fullTrace}`,
      }),
    );
  }

  const normalized = normalizeCompilerEvents(events, modifiedSource, result.sourceFunctions, {
    sourceHash: result.sourceHash,
  });
  const analyses = new Map(normalized.analyses.map(analysis => [analysis.sourceFunctionId!, analysis]));

  return directives
    .map(directive => {
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
    })
    .sort(
      (a, b) => a.line - b.line || (a.column ?? 0) - (b.column ?? 0) || compareText(a.directiveId!, b.directiveId!),
    );
}
