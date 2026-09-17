import { readFile, writeFile } from 'node:fs/promises';

import { compareText } from './ordering';
import { fingerprintText } from './stable-json';
import type { AnnotateMode, AnnotateResult, FunctionAnalysis, QuoteStyle, RiskFinding } from './types';

const RISK_SEVERITY_ORDER: Record<string, number> = { high: 0, medium: 1 };

function quoted(text: string, quote: QuoteStyle): string {
  return quote === 'double' ? `"${text}"` : `'${text}'`;
}

function bailoutDirective(indent: string, risks: RiskFinding[], quote: QuoteStyle): string {
  const top = [...risks].sort(
    (a, b) =>
      (RISK_SEVERITY_ORDER[a.severity] ?? 9) - (RISK_SEVERITY_ORDER[b.severity] ?? 9) ||
      a.line - b.line ||
      a.column - b.column,
  )[0];
  const extra = risks.length > 1 ? ` (+${risks.length - 1} more)` : '';
  return `${indent}${quoted('use no memo', quote)}; // justified: ${top.ruleId} risk via ${
    top.symbol
  }${extra} - unsafe to memoize`;
}

export interface AnnotateOptions {
  quote?: QuoteStyle;
}

function hasRisks(result: FunctionAnalysis): boolean {
  return (result.risks?.length ?? 0) > 0;
}

function indentationAt(source: string, insertionOffset: number): string {
  const lineStart = source.lastIndexOf('\n', Math.max(0, insertionOffset - 1)) + 1;
  const openingIndent = source.slice(lineStart, insertionOffset).match(/^\s*/)?.[0] ?? '';
  const after = source.slice(insertionOffset);
  const nextLine = after.match(/^\r?\n([ \t]+)\S/);
  if (nextLine && nextLine[1].length > openingIndent.length) {
    return nextLine[1];
  }
  return `${openingIndent}  `;
}

function lineOffset(source: string, line: number): number {
  if (line <= 1) {
    return 0;
  }
  let offset = 0;
  for (let currentLine = 1; currentLine < line; currentLine++) {
    const next = source.indexOf('\n', offset);
    if (next === -1) {
      return source.length;
    }
    offset = next + 1;
  }
  return offset;
}

/**
 * Apply annotations once per canonical function, after preflighting every source hash.
 * Writes are ordered by file and descending insertion offset, so offsets never drift.
 */
export async function applyAnnotations(
  results: FunctionAnalysis[],
  mode: AnnotateMode,
  options: AnnotateOptions = {},
): Promise<AnnotateResult> {
  const quote = options.quote ?? 'single';
  const byIdentity = new Map<string, FunctionAnalysis>();
  for (const result of results) {
    const id = result.sourceFunctionId ?? `${result.filePath}:${result.line}:${result.column}`;
    if (
      result.status === 'compiled' &&
      ((result.bodyInsertionOffset !== undefined && result.bodyInsertionOffset >= 0) ||
        (result.bodyInsertionLine !== undefined && result.bodyInsertionLine > 0)) &&
      !result.existingDirectives?.useMemo &&
      !result.existingDirectives?.useNoMemo &&
      (mode !== 'manual-memo' || result.manualMemo) &&
      (mode !== 'bailout-only' || hasRisks(result))
    ) {
      byIdentity.set(id, result);
    }
  }
  const candidates = [...byIdentity.values()];
  if (candidates.length === 0) {
    return { filesModified: 0, functionsAnnotated: 0, functionsBailedOut: 0 };
  }

  const byFile = new Map<string, FunctionAnalysis[]>();
  for (const candidate of candidates) {
    const list = byFile.get(candidate.filePath) ?? [];
    list.push(candidate);
    byFile.set(candidate.filePath, list);
  }

  const sourceByFile = new Map<string, string>();
  for (const [filePath, fileCandidates] of [...byFile.entries()].sort(([a], [b]) => compareText(a, b))) {
    const source = await readFile(filePath, 'utf-8');
    const expectedHashes = new Set(fileCandidates.map(candidate => candidate.sourceHash).filter(Boolean));
    if (expectedHashes.size > 1 || (expectedHashes.size === 1 && !expectedHashes.has(fingerprintText(source)))) {
      throw new Error(`stale source: '${filePath}' changed after analysis; rerun before annotating`);
    }
    sourceByFile.set(filePath, source);
  }

  let filesModified = 0;
  let functionsAnnotated = 0;
  let functionsBailedOut = 0;
  for (const [filePath, fileCandidates] of [...byFile.entries()].sort(([a], [b]) => compareText(a, b))) {
    let source = sourceByFile.get(filePath)!;
    const eol = source.includes('\r\n') ? '\r\n' : '\n';
    const sorted = [...fileCandidates].sort(
      (a, b) =>
        (b.bodyInsertionOffset ?? lineOffset(source, b.bodyInsertionLine!)) -
          (a.bodyInsertionOffset ?? lineOffset(source, a.bodyInsertionLine!)) ||
        compareText(a.sourceFunctionId ?? '', b.sourceFunctionId ?? ''),
    );
    for (const candidate of sorted) {
      const canonicalOffset = candidate.bodyInsertionOffset;
      const offset = canonicalOffset ?? lineOffset(source, candidate.bodyInsertionLine!);
      if (offset < 0 || offset > source.length) {
        throw new Error(`invalid annotation offset ${offset} for '${candidate.filePath}'`);
      }
      const indent =
        canonicalOffset === undefined
          ? source.slice(offset).match(/^([ \t]*)/)?.[1] ?? '  '
          : indentationAt(source, offset);
      const isBailout = (mode === 'all-safe' || mode === 'bailout-only') && hasRisks(candidate);
      const directive = isBailout
        ? bailoutDirective(indent, candidate.risks!, quote)
        : `${indent}${quoted('use memo', quote)};`;
      const insertion = canonicalOffset === undefined ? `${directive}${eol}` : `${eol}${directive}`;
      source = source.slice(0, offset) + insertion + source.slice(offset);
      if (isBailout) {
        functionsBailedOut++;
      } else {
        functionsAnnotated++;
      }
    }
    await writeFile(filePath, source, 'utf-8');
    filesModified++;
  }

  return { filesModified, functionsAnnotated, functionsBailedOut };
}
