import { compileSource, extractDetailReason } from './compiler';
import type { CompilerEvent, FileCompilationResult } from './compiler';
import { USE_NO_MEMO_LINE_RE, USE_MEMO_LINE_RE } from './patterns';
import type { CompilationMode, DirectiveAnalysis, DirectiveLocation, DirectiveType } from './types';

// Regex matching the ESLint rule's justification pattern
const JUSTIFIED_RE = /^\s*justified:/;

/**
 * Parse source text to find all directive locations ('use no memo' and 'use memo').
 */
function findDirectiveLocations(source: string): DirectiveLocation[] {
  const lines = source.split('\n');
  const locations: DirectiveLocation[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let directiveType: DirectiveType | null = null;

    if (USE_NO_MEMO_LINE_RE.test(line)) {
      directiveType = 'use-no-memo';
    } else if (USE_MEMO_LINE_RE.test(line)) {
      directiveType = 'use-memo';
    }

    if (!directiveType) {
      continue;
    }

    // Check for inline justification comment on the same line
    const commentMatch = line.match(/\/\/(.*)$/);
    let justified = false;
    let justification: string | undefined;
    if (commentMatch) {
      const commentText = commentMatch[1];
      if (JUSTIFIED_RE.test(commentText)) {
        justified = true;
        justification = commentText.trim();
      }
    }

    locations.push({
      line: i + 1, // 1-based
      lineText: line,
      justified,
      justification,
      directiveType,
    });
  }

  return locations;
}

/**
 * Create a modified source with non-justified 'use no memo' directives stripped.
 * Returns the modified source and a line-number mapping (original → new).
 */
function stripDirectives(
  source: string,
  directives: DirectiveLocation[],
): { modifiedSource: string; removedLines: Set<number> } {
  const removedLines = new Set<number>();
  for (const directive of directives) {
    if (!directive.justified && directive.directiveType === 'use-no-memo') {
      removedLines.add(directive.line);
    }
  }

  if (removedLines.size === 0) {
    return { modifiedSource: source, removedLines };
  }

  const lines = source.split('\n');
  const kept: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (!removedLines.has(i + 1)) {
      kept.push(lines[i]);
    }
  }

  return { modifiedSource: kept.join('\n'), removedLines };
}

/**
 * Build a mapping from modified-source line numbers back to original line numbers.
 * This lets us correlate compiler events (which reference modified-source locations)
 * back to the original source lines.
 */
function buildLineMapping(totalOriginalLines: number, removedLines: Set<number>): Map<number, number> {
  const map = new Map<number, number>();
  let newLine = 1;
  for (let origLine = 1; origLine <= totalOriginalLines; origLine++) {
    if (!removedLines.has(origLine)) {
      map.set(newLine, origLine);
      newLine++;
    }
  }
  return map;
}

/**
 * Try to determine the enclosing function name for a directive at a given line.
 * Uses a simple heuristic: scan backwards for function/arrow/const declarations.
 */
function findEnclosingFunctionName(source: string, directiveLine: number): string | null {
  const lines = source.split('\n');
  // Scan backwards from the directive line
  for (let i = directiveLine - 2; i >= 0; i--) {
    const line = lines[i];
    // Named function declaration: function useFoo(
    const fnMatch = line.match(/function\s+(\w+)/);
    if (fnMatch) {
      return fnMatch[1];
    }
    // Const/let/var arrow or function expression: const useFoo = (
    const constMatch = line.match(/(?:const|let|var)\s+(\w+)\s*=/);
    if (constMatch) {
      return constMatch[1];
    }
    // Method: useFoo(
    const methodMatch = line.match(/^\s+(\w+)\s*\(/);
    if (methodMatch && !line.includes('if') && !line.includes('for') && !line.includes('while')) {
      return methodMatch[1];
    }
    // Stop at top-level boundaries
    if (line.match(/^(import |export |type |interface )/)) {
      break;
    }
  }
  return null;
}

/**
 * For a given compiler event location (in modified source), find which original
 * directive's enclosing function contains this event.
 */
function matchEventToDirective(
  event: CompilerEvent,
  directives: DirectiveLocation[],
  lineMapping: Map<number, number>,
  removedLines: Set<number>,
): DirectiveLocation | null {
  if (!event.fnLoc) {
    return null;
  }

  // Map the event's function start/end lines back to original source lines
  const origStartLine = lineMapping.get(event.fnLoc.start.line);
  const origEndLine = lineMapping.get(event.fnLoc.end.line);

  if (origStartLine === undefined || origEndLine === undefined) {
    return null;
  }

  // Find which directive falls within this function's range.
  for (const dir of directives) {
    if (dir.justified) {
      continue;
    }
    if (dir.line >= origStartLine && dir.line <= origEndLine + removedLines.size) {
      return dir;
    }
  }
  return null;
}

/**
 * Group directives by enclosing function to detect conflicts
 * (both 'use no memo' and 'use memo' on same function).
 */
function detectConflicts(
  directives: DirectiveLocation[],
  source: string,
): { conflicts: Map<string, DirectiveLocation[]>; nonConflicting: DirectiveLocation[] } {
  // Group by enclosing function (using function name as key)
  const byFunction = new Map<string, DirectiveLocation[]>();

  for (const dir of directives) {
    if (dir.justified) {
      continue;
    }
    const fnName = findEnclosingFunctionName(source, dir.line);
    const key = fnName ?? `__anon_at_${dir.line}`;
    const group = byFunction.get(key) ?? [];
    group.push(dir);
    byFunction.set(key, group);
  }

  const conflicts = new Map<string, DirectiveLocation[]>();
  const nonConflicting: DirectiveLocation[] = [];

  for (const [key, dirs] of byFunction) {
    const hasNoMemo = dirs.some(d => d.directiveType === 'use-no-memo');
    const hasMemo = dirs.some(d => d.directiveType === 'use-memo');

    if (hasNoMemo && hasMemo) {
      conflicts.set(key, dirs);
    } else {
      nonConflicting.push(...dirs);
    }
  }

  return { conflicts, nonConflicting };
}

/**
 * Derive 'use memo' directive statuses from a pre-compiled FileCompilationResult.
 * Pure function — no I/O, no compilation.
 * Also handles justified directives and conflict detection.
 */
export function deriveMemoDirectiveStatuses(
  result: FileCompilationResult,
  compilationMode: CompilationMode,
): DirectiveAnalysis[] {
  const { filePath, packageName, source, events, error } = result;
  const directives = findDirectiveLocations(source);

  if (directives.length === 0) {
    return [];
  }

  const results: DirectiveAnalysis[] = [];

  // Handle justified directives
  for (const dir of directives.filter(d => d.justified)) {
    results.push({
      filePath,
      packageName,
      line: dir.line,
      functionName: findEnclosingFunctionName(source, dir.line),
      status: 'skipped',
      compilerEvent: 'skipped',
      reason: dir.justification,
      directiveType: dir.directiveType,
    });
  }

  // Detect conflicts
  const { conflicts, nonConflicting } = detectConflicts(directives, source);

  for (const [, dirs] of conflicts) {
    for (const dir of dirs) {
      if (dir.justified) {
        continue;
      }
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: findEnclosingFunctionName(source, dir.line),
        status: 'conflicting',
        compilerEvent: 'none',
        reason: "conflicting directives: both 'use no memo' and 'use memo' on same function",
        directiveType: dir.directiveType,
      });
    }
  }

  // Only analyze 'use memo' directives here
  const memoDirs = nonConflicting.filter(d => d.directiveType === 'use-memo');
  if (memoDirs.length === 0) {
    return results;
  }

  if (error) {
    const fullTrace = error.stack ?? error.message;
    for (const dir of memoDirs) {
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: findEnclosingFunctionName(source, dir.line),
        status: 'broken',
        compilerEvent: 'none',
        reason: `babel parse error:\n${fullTrace}`,
        directiveType: 'use-memo',
      });
    }
    return results;
  }

  for (const dir of memoDirs) {
    const fnName = findEnclosingFunctionName(source, dir.line);
    let matchedEvent: CompilerEvent | null = null;

    for (const event of events) {
      if (!event.fnLoc) {
        continue;
      }
      if (dir.line >= event.fnLoc.start.line && dir.line <= event.fnLoc.end.line) {
        matchedEvent = event;
        break;
      }
    }

    if (!matchedEvent) {
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: fnName,
        status: 'broken',
        compilerEvent: 'none',
        reason: 'no compiler event — function not recognized as React component/hook',
        directiveType: 'use-memo',
      });
    } else if (matchedEvent.kind === 'CompileSuccess') {
      // In all modes, 'use memo' on a compilable function is valid and active.
      // In 'infer' mode: the compiler already optimizes it, so 'use memo' is a no-op
      // but it's forward-compatible for switching to 'annotation' mode later.
      // In 'annotation'/'all' mode: the directive triggers compilation.
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: matchedEvent.fnName ?? fnName,
        status: 'active',
        compilerEvent: 'CompileSuccess',
        directiveType: 'use-memo',
      });
    } else if (matchedEvent.kind === 'CompileError' || matchedEvent.kind === 'PipelineError') {
      const reason =
        matchedEvent.kind === 'PipelineError' ? matchedEvent.data ?? '' : extractDetailReason(matchedEvent.detail);
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: fnName,
        status: 'broken',
        compilerEvent: matchedEvent.kind as 'CompileError' | 'PipelineError',
        reason,
        directiveType: 'use-memo',
      });
    } else if (matchedEvent.kind === 'CompileSkip') {
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: fnName,
        status: 'broken',
        compilerEvent: 'none',
        reason: matchedEvent.reason ?? 'compiler skipped this function',
        directiveType: 'use-memo',
      });
    }
  }

  return results;
}

/**
 * Analyze 'use no memo' directives from a pre-compiled FileCompilationResult.
 * Requires a second compilation with directives stripped to determine active vs. redundant.
 */
export async function analyzeNoMemoDirectives(
  result: FileCompilationResult,
  compilationMode: CompilationMode,
  verbose: boolean = false,
): Promise<DirectiveAnalysis[]> {
  const { filePath, packageName, source } = result;
  const directives = findDirectiveLocations(source);

  // Only handle conflicts that haven't been reported yet
  const { nonConflicting } = detectConflicts(directives, source);
  const noMemoDirs = nonConflicting.filter(d => d.directiveType === 'use-no-memo');

  if (noMemoDirs.length === 0) {
    return [];
  }

  const results: DirectiveAnalysis[] = [];
  const { modifiedSource, removedLines } = stripDirectives(source, directives);
  const totalOriginalLines = source.split('\n').length;
  const lineMapping = buildLineMapping(totalOriginalLines, removedLines);

  const { events, error } = await compileSource(modifiedSource, filePath, {
    compilationMode,
  });

  if (error) {
    if (verbose) {
      console.error(`  babel error in ${filePath}: ${error.message}`);
    }
    const fullTrace = error.stack ?? error.message;
    for (const dir of noMemoDirs) {
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: findEnclosingFunctionName(source, dir.line),
        status: 'redundant',
        compilerEvent: 'none',
        reason: `babel parse error:\n${fullTrace}`,
        directiveType: 'use-no-memo',
      });
    }
    return results;
  }

  if (verbose) {
    for (const ev of events) {
      const loc = ev.fnLoc ? `${ev.fnLoc.start.line}:${ev.fnLoc.start.column}` : '?';
      const name = ev.fnName ?? '';
      console.log(`  [${ev.kind}] ${filePath} fn@${loc} ${name}`);
    }
  }

  const matched = new Set<DirectiveLocation>();

  for (const event of events) {
    if (!event.fnLoc) {
      continue;
    }

    const dir = matchEventToDirective(event, noMemoDirs, lineMapping, removedLines);
    if (!dir || matched.has(dir)) {
      continue;
    }

    matched.add(dir);

    if (event.kind === 'CompileSuccess') {
      const fnName = event.fnName ?? findEnclosingFunctionName(source, dir.line);

      if (compilationMode === 'annotation') {
        results.push({
          filePath,
          packageName,
          line: dir.line,
          functionName: fnName,
          status: 'redundant',
          compilerEvent: 'CompileSuccess',
          reason: "in annotation mode, compiler requires 'use memo' — 'use no memo' has no effect",
          directiveType: 'use-no-memo',
        });
      } else {
        results.push({
          filePath,
          packageName,
          line: dir.line,
          functionName: fnName,
          status: 'active',
          compilerEvent: 'CompileSuccess',
          directiveType: 'use-no-memo',
        });
      }
    } else if (event.kind === 'CompileError' || event.kind === 'PipelineError') {
      const reason = event.kind === 'PipelineError' ? event.data ?? '' : extractDetailReason(event.detail);
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: findEnclosingFunctionName(source, dir.line),
        status: 'redundant',
        compilerEvent: event.kind as 'CompileError' | 'PipelineError',
        reason,
        directiveType: 'use-no-memo',
      });
    }
  }

  for (const dir of noMemoDirs) {
    if (!matched.has(dir)) {
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: findEnclosingFunctionName(source, dir.line),
        status: 'redundant',
        compilerEvent: 'none',
        reason: 'no compiler event — function not recognized as React component/hook',
        directiveType: 'use-no-memo',
      });
    }
  }

  return results;
}
