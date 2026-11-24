import { readFile, writeFile } from 'node:fs/promises';

import { parseSource } from './ast/parse';
import type { ParsedSource } from './ast/parse';
import { compareText } from './ordering';
import { fingerprintText } from './stable-json';
import { compilerSuppressions } from './suppressions';
import type { SuppressionDirective } from './suppressions';
import type { QuoteStyle } from './types';

export const SUPPRESSION_PROTECTION_REASON = 'cross-backend-suppression-protection';

export interface SuppressionProtectionPlan {
  filePath: string;
  sourceHash: string;
  status: 'eligible' | 'already-protected' | 'conflict' | 'ineligible' | 'invalid-source';
  reason: string;
  suppressions: SuppressionDirective[];
  edit?: { offset: number; text: string };
  preview?: string;
}

export interface SuppressionProtectionResult {
  filesModified: number;
  filesPlanned: number;
  results: Array<{
    filePath: string;
    status: 'written' | 'would-write' | 'skipped' | 'conflict';
    reason: string;
    suppressions: SuppressionDirective[];
    preview?: string;
  }>;
}

function insertionOffset(parsed: ParsedSource): number {
  const { source, program } = parsed;
  let offset = source.charCodeAt(0) === 0xfeff ? 1 : 0;
  if (source.startsWith('#!', offset)) {
    const end = source.slice(offset).search(/[\r\n\u2028\u2029]/);
    offset = end === -1 ? source.length : offset + end;
    if (source[offset] === '\r' && source[offset + 1] === '\n') {
      offset += 2;
    } else if (offset < source.length) {
      offset++;
    }
  }
  let lastDirectiveEnd: number | undefined;
  for (const statement of program.body) {
    if (!(statement as { directive?: string }).directive) {
      break;
    }
    lastDirectiveEnd = statement.end;
  }
  if (lastDirectiveEnd !== undefined) {
    const rest = source.slice(lastDirectiveEnd);
    const endOfLine = rest.search(/[\r\n\u2028\u2029]/);
    const trailing = endOfLine === -1 ? rest : rest.slice(0, endOfLine);
    // Keep trailing comments on their original directive. A next-line disable must
    // still target its original statement, so use the start of the prologue instead.
    if (/^\s*(?:\/\/(?!\s*eslint-disable-next-line\b).*)?$/.test(trailing)) {
      offset = endOfLine === -1 ? source.length : lastDirectiveEnd + endOfLine;
      if (source[offset] === '\r' && source[offset + 1] === '\n') {
        offset += 2;
      } else if (offset < source.length) {
        offset++;
      }
    }
  }
  return offset;
}

/** Plans a conservative module opt-out without changing source or requiring compiler acceptance. */
export function planSuppressionProtection(
  source: string,
  filePath: string,
  options: { quote?: QuoteStyle } = {},
): SuppressionProtectionPlan {
  const base = { filePath, sourceHash: fingerprintText(source), suppressions: [] as SuppressionDirective[] };
  let parsed: ParsedSource;
  try {
    parsed = parseSource(source, filePath);
  } catch (error) {
    return { ...base, status: 'invalid-source', reason: `Input cannot be parsed: ${String(error)}` };
  }
  const suppressions = compilerSuppressions(parsed);
  if (suppressions.length === 0) {
    return {
      ...base,
      status: 'ineligible',
      reason: 'No valid compiler-relevant React ESLint suppression was found.',
    };
  }
  const directives = parsed.program.body.map(statement => (statement as { directive?: string }).directive);
  if (directives.includes('use memo')) {
    return {
      ...base,
      suppressions,
      status: 'conflict',
      reason: 'Existing module-level "use memo" conflicts with suppression protection; no source was changed.',
    };
  }
  if (directives.includes('use no memo')) {
    return {
      ...base,
      suppressions,
      status: 'already-protected',
      reason: 'Existing module-level "use no memo" is preserved unchanged.',
    };
  }
  const triggers = suppressions.map(
    suppression =>
      `${suppression.rules === null ? 'all-rules' : suppression.relevantRules.join(',')} at ${
        suppression.commentSpan.start.line
      }:${suppression.commentSpan.start.column + 1}`,
  );
  const reason = `${SUPPRESSION_PROTECTION_REASON}; conservative whole-module opt-out for ${triggers.join('; ')}`;
  const firstString = parsed.program.body.find(
    statement => (statement as { directive?: string }).directive || statement.type === 'ImportDeclaration',
  );
  const literalQuote = firstString && source.slice(firstString.start, firstString.end).match(/['"]/);
  const quote = options.quote === 'double' ? '"' : options.quote === 'single' ? "'" : literalQuote?.[0] ?? "'";
  const eol = source.match(/\r\n|[\n\r\u2028\u2029]/)?.[0] ?? '\n';
  const offset = insertionOffset(parsed);
  const prefix = offset > 0 && !/[\n\r\u2028\u2029\ufeff]/.test(source[offset - 1]) ? eol : '';
  const text = `${prefix}${quote}use no memo${quote}; // justified: ${reason}${eol}`;
  const preview = source.slice(0, offset) + text + source.slice(offset);
  parseSource(preview, filePath);
  return { ...base, suppressions, status: 'eligible', reason, edit: { offset, text }, preview };
}

/**
 * Preflight the complete write set before writing any file. Dry-run has the same
 * stale-source and parse checks and returns the exact planned source.
 */
export async function applySuppressionProtection(
  plans: SuppressionProtectionPlan[],
  options: { dryRun?: boolean } = {},
): Promise<SuppressionProtectionResult> {
  const ordered = [...plans].sort((a, b) => compareText(a.filePath, b.filePath));
  if (new Set(ordered.map(plan => plan.filePath)).size !== ordered.length) {
    throw new Error('Duplicate file in suppression protection plan');
  }
  const outputs = new Map<string, string>();
  for (const plan of ordered) {
    if (plan.status !== 'eligible') {
      continue;
    }
    const source = await readFile(plan.filePath, 'utf8');
    if (fingerprintText(source) !== plan.sourceHash) {
      throw new Error(`stale source: '${plan.filePath}' changed after planning suppression protection`);
    }
    const canonical = planSuppressionProtection(source, plan.filePath, {
      quote: plan.edit?.text.includes('"use no memo"') ? 'double' : 'single',
    });
    if (
      canonical.status !== 'eligible' ||
      canonical.edit?.offset !== plan.edit?.offset ||
      canonical.edit?.text !== plan.edit?.text ||
      canonical.preview !== plan.preview
    ) {
      throw new Error(`Invalid suppression protection edit plan for '${plan.filePath}'`);
    }
    parseSource(canonical.preview!, plan.filePath);
    outputs.set(plan.filePath, canonical.preview!);
  }
  let filesModified = 0;
  for (const [filePath, output] of outputs) {
    if (!options.dryRun) {
      await writeFile(filePath, output, 'utf8');
      filesModified++;
    }
  }
  return {
    filesModified,
    filesPlanned: outputs.size,
    results: ordered.map(plan => ({
      filePath: plan.filePath,
      status: outputs.has(plan.filePath)
        ? options.dryRun
          ? 'would-write'
          : 'written'
        : plan.status === 'conflict'
        ? 'conflict'
        : 'skipped',
      reason: plan.reason,
      suppressions: plan.suppressions,
      ...(outputs.has(plan.filePath) ? { preview: outputs.get(plan.filePath) } : {}),
    })),
  };
}
