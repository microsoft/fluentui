import { readFile, writeFile } from 'node:fs/promises';

import type { FunctionAnalysis, AnnotateResult, AnnotateMode, QuoteStyle, RiskFinding } from './types';

/** Severity ranking so the most serious risk drives the bailout justification. */
const RISK_SEVERITY_ORDER: Record<string, number> = { high: 0, medium: 1 };

function quoted(text: string, quote: QuoteStyle): string {
  return quote === 'double' ? `"${text}"` : `'${text}'`;
}

/**
 * Build the `'use no memo'; // justified: …` bailout line for a risky function. Picks the
 * highest-severity finding for the justification and keeps the reason compact (rule + symbol),
 * matching the repo's `// justified:` opt-out convention.
 */
function bailoutDirective(indent: string, risks: RiskFinding[], quote: QuoteStyle): string {
  const top = [...risks].sort(
    (a, b) => (RISK_SEVERITY_ORDER[a.severity] ?? 9) - (RISK_SEVERITY_ORDER[b.severity] ?? 9),
  )[0];
  const extra = risks.length > 1 ? ` (+${risks.length - 1} more)` : '';
  return `${indent}${quoted('use no memo', quote)}; // justified: ${top.ruleId} risk via ${
    top.symbol
  }${extra} — unsafe to memoize`;
}

export interface AnnotateOptions {
  /** Quote style for emitted directives. Defaults to single. */
  quote?: QuoteStyle;
}

function hasRisks(r: FunctionAnalysis): boolean {
  return !!r.risks && r.risks.length > 0;
}

/**
 * Apply directive annotations to compilable functions.
 *
 * Modes:
 * - `manual-memo` — `'use memo'` only on functions that compile **and** have manual
 *   memoization (useMemo/useCallback/React.memo).
 * - `all` — `'use memo'` on every function that compiles.
 * - `all-safe` — like `all`, but functions carrying runtime-risk findings get a justified
 *   `'use no memo'` bailout instead of the opt-in.
 * - `bailout-only` — **only** the justified `'use no memo'` bailouts; no opt-ins are written.
 *
 * Which one you want depends on the compilation mode your **build** will run, not the `--mode`
 * used to discover these functions. A build running `infer` or `all` compiles them regardless, so
 * `'use memo'` is redundant there and `bailout-only` is the right choice; a build running
 * `annotation` compiles nothing without the opt-in, so it needs `all-safe`.
 *
 * All modes require a valid `bodyInsertionLine`, skip functions that already declare either memo
 * directive, insert bottom-to-top within each file to preserve line numbers, and are idempotent.
 */
export async function applyAnnotations(
  results: FunctionAnalysis[],
  mode: AnnotateMode,
  options: AnnotateOptions = {},
): Promise<AnnotateResult> {
  const quote = options.quote ?? 'single';

  const candidates = results.filter(r => {
    if (r.status !== 'compiled' || !r.bodyInsertionLine || r.bodyInsertionLine <= 0) {
      return false;
    }
    // A function that already declares either directive is left alone — adding the other one
    // would leave contradictory directives on a single function.
    if (r.existingDirectives?.useMemo || r.existingDirectives?.useNoMemo) {
      return false;
    }
    if (mode === 'manual-memo') {
      return !!r.manualMemo;
    }
    if (mode === 'bailout-only') {
      return hasRisks(r);
    }
    return true;
  });

  if (candidates.length === 0) {
    return { filesModified: 0, functionsAnnotated: 0, functionsBailedOut: 0 };
  }

  // Group by file
  const byFile = new Map<string, FunctionAnalysis[]>();
  for (const c of candidates) {
    const existing = byFile.get(c.filePath) ?? [];
    existing.push(c);
    byFile.set(c.filePath, existing);
  }

  let filesModified = 0;
  let functionsAnnotated = 0;
  let functionsBailedOut = 0;

  for (const [filePath, fileCandidates] of byFile) {
    const source = await readFile(filePath, 'utf-8');
    const lines = source.split('\n');

    // Sort by bodyInsertionLine descending to insert bottom-to-top
    const sorted = [...fileCandidates].sort((a, b) => b.bodyInsertionLine! - a.bodyInsertionLine!);

    let modified = false;
    for (const candidate of sorted) {
      const insertLine = candidate.bodyInsertionLine!;
      // insertLine is 1-based, array is 0-based
      const insertIndex = insertLine - 1;

      if (insertIndex < 0 || insertIndex > lines.length) {
        continue;
      }

      const isBailout = (mode === 'all-safe' || mode === 'bailout-only') && hasRisks(candidate);

      // Detect indentation from the line at insertion point (or next non-empty line)
      let indent = '  ';
      if (insertIndex < lines.length) {
        const match = lines[insertIndex].match(/^(\s+)/);
        if (match) {
          indent = match[1];
        }
      }

      if (isBailout) {
        lines.splice(insertIndex, 0, bailoutDirective(indent, candidate.risks!, quote));
        functionsBailedOut++;
      } else {
        lines.splice(insertIndex, 0, `${indent}${quoted('use memo', quote)};`);
        functionsAnnotated++;
      }
      modified = true;
    }

    if (modified) {
      await writeFile(filePath, lines.join('\n'), 'utf-8');
      filesModified++;
    }
  }

  return { filesModified, functionsAnnotated, functionsBailedOut };
}
