import { readFile, writeFile } from 'node:fs/promises';

import type { FunctionAnalysis, AnnotateResult } from './types';

/**
 * Apply 'use memo' annotations to functions that are migration candidates.
 * A migration candidate is a function that:
 * - Has CompileSuccess status (compiler can optimize it)
 * - Has manual memoization (useMemo/useCallback/React.memo)
 * - Has a valid bodyInsertionLine
 *
 * Inserts 'use memo'; directive at the top of the function body.
 * Processes insertions bottom-to-top within each file to preserve line numbers.
 */
export async function applyAnnotations(results: FunctionAnalysis[]): Promise<AnnotateResult> {
  // Filter to migration candidates
  const candidates = results.filter(
    r => r.status === 'compiled' && r.manualMemo && r.bodyInsertionLine && r.bodyInsertionLine > 0,
  );

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
      const surroundingStart = Math.max(0, insertIndex - 1);
      const surroundingEnd = Math.min(lines.length - 1, insertIndex + 1);
      let alreadyPresent = false;
      for (let i = surroundingStart; i <= surroundingEnd; i++) {
        if (lines[i].includes("'use memo'")) {
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
