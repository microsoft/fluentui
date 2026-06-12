import { readFile, writeFile } from 'node:fs/promises';

import type { FunctionAnalysis, AnnotateResult, AnnotateMode, RiskFinding } from './types';
import { USE_MEMO_CONTENT_RE, USE_NO_MEMO_CONTENT_RE } from './patterns';

/** Severity ranking so the most serious risk drives the bailout justification. */
const RISK_SEVERITY_ORDER: Record<string, number> = { high: 0, medium: 1 };

/**
 * Build the `'use no memo'; // justified: …` bailout line for a risky function. Picks the
 * highest-severity finding for the justification and keeps the reason compact (rule + symbol),
 * matching the repo's `// justified:` opt-out convention.
 */
function bailoutDirective(indent: string, risks: RiskFinding[]): string {
  const top = [...risks].sort(
    (a, b) => (RISK_SEVERITY_ORDER[a.severity] ?? 9) - (RISK_SEVERITY_ORDER[b.severity] ?? 9),
  )[0];
  const extra = risks.length > 1 ? ` (+${risks.length - 1} more)` : '';
  return `${indent}'use no memo'; // justified: ${top.ruleId} risk via ${top.symbol}${extra} — unsafe to memoize`;
}

/**
 * Apply directive annotations to compilable functions.
 *
 * Modes:
 * - `manual-memo` — annotate `'use memo'` only on functions that compile **and** have manual
 *   memoization (useMemo/useCallback/React.memo).
 * - `all` — annotate `'use memo'` on every function that compiles.
 * - `all-safe` — like `all`, but functions carrying runtime-risk findings get a justified
 *   `'use no memo'` bailout instead, so enabling the compiler doesn't memoize an unsafe pattern.
 *   (Identical to `all` unless risk detection was enabled via `--risk-config`.)
 *
 * All modes require a valid `bodyInsertionLine`. Inserts the directive at the top of the
 * function body, bottom-to-top within each file to preserve line numbers, and is idempotent.
 */
export async function applyAnnotations(results: FunctionAnalysis[], mode: AnnotateMode): Promise<AnnotateResult> {
  // Filter to candidates based on mode
  const candidates = results.filter(r => {
    if (r.status !== 'compiled' || !r.bodyInsertionLine || r.bodyInsertionLine <= 0) {
      return false;
    }
    if (mode === 'manual-memo') {
      return !!r.manualMemo;
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

      // In all-safe mode, a function with risk findings bails out instead of opting in.
      const isBailout = mode === 'all-safe' && !!candidate.risks && candidate.risks.length > 0;

      // Detect indentation from the line at insertion point (or next non-empty line)
      let indent = '  ';
      if (insertIndex < lines.length) {
        const match = lines[insertIndex].match(/^(\s+)/);
        if (match) {
          indent = match[1];
        }
      }

      // Idempotency: skip if the relevant directive is already present near the insertion point.
      // Look from just above the brace down a few lines to tolerate blank lines / comments.
      const surroundingStart = Math.max(0, insertIndex - 1);
      const surroundingEnd = Math.min(lines.length - 1, insertIndex + 4);
      const directiveRe = isBailout ? USE_NO_MEMO_CONTENT_RE : USE_MEMO_CONTENT_RE;
      let alreadyPresent = false;
      for (let i = surroundingStart; i <= surroundingEnd; i++) {
        if (directiveRe.test(lines[i])) {
          alreadyPresent = true;
          break;
        }
      }

      if (alreadyPresent) {
        continue;
      }

      if (isBailout) {
        lines.splice(insertIndex, 0, bailoutDirective(indent, candidate.risks!));
        functionsBailedOut++;
      } else {
        lines.splice(insertIndex, 0, `${indent}'use memo';`);
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
