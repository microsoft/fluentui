import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

import { transformAsync } from '@babel/core';

import type { DirectiveAnalysis, DirectiveLocation, FileEntry, AnalyzerOptions } from './types';
import { extractDetailReason } from './compiler-utils';
import type { CompilerEvent } from './compiler-utils';

// Regex matching the ESLint rule's justification pattern
const JUSTIFIED_RE = /^\s*justified:/;

// Match 'use no memo' as either a plain expression statement or parenthesized
const USE_NO_MEMO_RE = /^\s*(?:\(?'use no memo'\)?;?\s*)(\/\/.*)?$/;

/**
 * Parse source text to find all 'use no memo' directive locations.
 */
function findDirectiveLocations(source: string): DirectiveLocation[] {
  const lines = source.split('\n');
  const locations: DirectiveLocation[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!USE_NO_MEMO_RE.test(line)) {
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
    if (!directive.justified) {
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
  // The directive was removed, so its original line should be between the function start
  // and the first kept line after function start.
  for (const dir of directives) {
    if (dir.justified) {
      continue;
    }
    // The directive was originally between origStartLine and origEndLine
    // Since we removed it, its original line should be >= function start and <= function end
    // Account for the shift: the directive was on dir.line in original, which is now missing
    if (dir.line >= origStartLine && dir.line <= origEndLine + removedLines.size) {
      return dir;
    }
  }
  return null;
}

/**
 * Analyze a single file for redundant 'use no memo' directives.
 */
export async function analyzeFile(
  filePath: string,
  packageName: string,
  verbose: boolean,
): Promise<DirectiveAnalysis[]> {
  const source = await readFile(filePath, 'utf-8');
  const directives = findDirectiveLocations(source);

  if (directives.length === 0) {
    return [];
  }

  const results: DirectiveAnalysis[] = [];

  // Handle justified directives (always skipped)
  const justifiedDirs = directives.filter(d => d.justified);
  for (const dir of justifiedDirs) {
    results.push({
      filePath,
      packageName,
      line: dir.line,
      functionName: findEnclosingFunctionName(source, dir.line),
      status: 'skipped',
      compilerEvent: 'skipped',
      reason: dir.justification,
    });
  }

  const nonJustifiedDirs = directives.filter(d => !d.justified);
  if (nonJustifiedDirs.length === 0) {
    return results;
  }

  // Strip non-justified directives and run the compiler
  const { modifiedSource, removedLines } = stripDirectives(source, directives);
  const totalOriginalLines = source.split('\n').length;
  const lineMapping = buildLineMapping(totalOriginalLines, removedLines);

  // Collect compiler events
  const events: CompilerEvent[] = [];
  const logger = {
    logEvent: (_filename: string | null, event: CompilerEvent) => {
      events.push(event);
    },
  };

  const ext = extname(filePath);
  const isTSX = ext === '.tsx';

  try {
    await transformAsync(modifiedSource, {
      filename: filePath,
      ast: false,
      code: false,
      babelrc: false,
      configFile: false,
      presets: [
        [
          require.resolve('@babel/preset-typescript'),
          {
            isTSX: isTSX || ext === '.ts', // enable JSX parsing for .ts too (some .ts files use JSX pragma)
            allExtensions: true,
          },
        ],
      ],
      plugins: [
        [
          require.resolve('babel-plugin-react-compiler'),
          {
            noEmit: true,
            panicThreshold: 'none',
            logger,
          },
        ],
      ],
    });
  } catch (err) {
    // If babel itself fails (e.g. syntax error), mark all directives in this file as redundant
    // since we can't determine compiler behavior
    if (verbose) {
      console.error(`  babel error in ${filePath}: ${(err as Error).message}`);
    }
    const fullTrace = (err as Error).stack ?? (err as Error).message;
    for (const dir of nonJustifiedDirs) {
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: findEnclosingFunctionName(source, dir.line),
        status: 'redundant',
        compilerEvent: 'none',
        reason: `babel parse error:\n${fullTrace}`,
      });
    }
    return results;
  }

  if (verbose) {
    for (const ev of events) {
      const loc = ev.fnLoc ? `${ev.fnLoc.start.line}:${ev.fnLoc.start.column}` : '?';
      const name = (ev as { fnName?: string }).fnName ?? '';
      console.log(`  [${ev.kind}] ${filePath} fn@${loc} ${name}`);
    }
  }

  // Match each non-justified directive to compiler events
  const matched = new Set<DirectiveLocation>();

  for (const event of events) {
    if (!event.fnLoc) {
      continue;
    }

    const dir = matchEventToDirective(event, nonJustifiedDirs, lineMapping, removedLines);
    if (!dir || matched.has(dir)) {
      continue;
    }

    matched.add(dir);

    if (event.kind === 'CompileSuccess') {
      // The compiler CAN compile this function → the directive was actively preventing optimization
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: (event as { fnName?: string | null }).fnName ?? findEnclosingFunctionName(source, dir.line),
        status: 'active',
        compilerEvent: 'CompileSuccess',
      });
    } else if (event.kind === 'CompileError' || event.kind === 'PipelineError') {
      // The compiler bails on this function anyway → the directive is redundant
      const reason =
        event.kind === 'PipelineError' ? (event as { data?: string }).data ?? '' : extractDetailReason(event.detail);
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: findEnclosingFunctionName(source, dir.line),
        status: 'redundant',
        compilerEvent: event.kind as 'CompileError' | 'PipelineError',
        reason,
      });
    }
  }

  // Any non-justified directives not matched to any event → dead directive (redundant)
  for (const dir of nonJustifiedDirs) {
    if (!matched.has(dir)) {
      results.push({
        filePath,
        packageName,
        line: dir.line,
        functionName: findEnclosingFunctionName(source, dir.line),
        status: 'redundant',
        compilerEvent: 'none',
        reason: 'no compiler event — function not recognized as React component/hook',
      });
    }
  }

  return results;
}

/**
 * Analyze multiple files with concurrency-limited parallelism.
 */
export async function analyzeFiles(files: FileEntry[], options: AnalyzerOptions): Promise<DirectiveAnalysis[]> {
  const allResults: DirectiveAnalysis[] = [];
  const { concurrency, verbose } = options;

  // Simple concurrency pool
  let index = 0;

  async function worker(): Promise<void> {
    while (index < files.length) {
      const current = index++;
      const entry = files[current];

      if (verbose) {
        console.log(`Analyzing: ${entry.filePath}`);
      }

      const results = await analyzeFile(entry.filePath, entry.packageName, verbose);
      allResults.push(...results);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, files.length) }, () => worker());
  await Promise.all(workers);

  return allResults;
}
