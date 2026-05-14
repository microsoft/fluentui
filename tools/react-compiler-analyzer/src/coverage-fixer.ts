import { readFile, writeFile } from 'node:fs/promises';

import type { FunctionAnalysis, AnnotateResult, AnnotateMode } from './types';
import { USE_MEMO_CONTENT_RE } from './patterns';

/**
 * Apply 'use memo' annotations to compilable functions.
 *
 * When mode is 'manual-memo', only annotates functions that:
 * - Have CompileSuccess status (compiler can optimize it)
 * - Have manual memoization (useMemo/useCallback/React.memo)
 * - Have a valid bodyInsertionLine
 *
 * When mode is 'all', annotates all functions that:
 * - Have CompileSuccess status
 * - Have a valid bodyInsertionLine
 *
 * Inserts 'use memo'; directive at the top of the function body.
 * Processes insertions bottom-to-top within each file to preserve line numbers.
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
    return { filesModified: 0, functionsAnnotated: 0 };
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

      // Detect indentation from the line at insertion point (or next non-empty line)
      let indent = '  ';
      if (insertIndex < lines.length) {
        const match = lines[insertIndex].match(/^(\s+)/);
        if (match) {
          indent = match[1];
        }
      }

      // Check if 'use memo' is already present nearby (idempotent)
      // Look from the insertion point down a few lines to handle blank lines / comments
      // between the opening brace and the directive. Match both quote styles.
      const surroundingStart = Math.max(0, insertIndex - 1);
      const surroundingEnd = Math.min(lines.length - 1, insertIndex + 4);
      let alreadyPresent = false;
      for (let i = surroundingStart; i <= surroundingEnd; i++) {
        if (USE_MEMO_CONTENT_RE.test(lines[i])) {
          alreadyPresent = true;
          break;
        }
      }

      if (alreadyPresent) {
        continue;
      }

      lines.splice(insertIndex, 0, `${indent}'use memo';`);
      modified = true;
      functionsAnnotated++;
    }

    if (modified) {
      await writeFile(filePath, lines.join('\n'), 'utf-8');
      filesModified++;
    }
  }

  return { filesModified, functionsAnnotated };
}
