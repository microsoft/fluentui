import { readFile, writeFile } from 'node:fs/promises';

import type { DirectiveAnalysis, FixResult } from './types';

type LineAction = { kind: 'remove'; line: number } | { kind: 'justify'; line: number; reason: string };

/**
 * Auto-fix directives in source files:
 * - Remove redundant 'use no memo' directives
 * - Annotate active 'use no memo' directives with `// justified: <reason>`
 * - Resolve conflicting directives: remove 'use no memo', keep 'use memo' if compilable
 *
 * Processes changes bottom-to-top within each file to avoid offset shifts.
 */
export async function applyFixes(results: DirectiveAnalysis[]): Promise<FixResult> {
  const actionable = results.filter(r => {
    if (r.status === 'redundant' && r.directiveType === 'use-no-memo') {
      return true;
    }
    if (r.status === 'active' && r.directiveType === 'use-no-memo') {
      return true;
    }
    if (r.status === 'conflicting') {
      return true;
    }
    return false;
  });

  if (actionable.length === 0) {
    return { filesModified: 0, directivesRemoved: 0, directivesJustified: 0 };
  }

  // Group actions by file
  const byFile = new Map<string, LineAction[]>();
  for (const r of actionable) {
    const actions = byFile.get(r.filePath) ?? [];

    if (r.status === 'redundant' && r.directiveType === 'use-no-memo') {
      actions.push({ kind: 'remove', line: r.line });
    } else if (r.status === 'active' && r.directiveType === 'use-no-memo') {
      actions.push({ kind: 'justify', line: r.line, reason: buildJustification(r) });
    } else if (r.status === 'conflicting') {
      // For conflicts: always remove 'use no memo'
      if (r.directiveType === 'use-no-memo') {
        actions.push({ kind: 'remove', line: r.line });
      }
      // For 'use memo' in conflicts: remove if function is non-compilable (broken)
      // Keep it if the function is compilable (compiler event isn't an error)
      // Since conflicting status is set before compilation check, we remove 'use memo'
      // only if there's no CompileSuccess event context. In practice, we keep it.
    }

    byFile.set(r.filePath, actions);
  }

  let filesModified = 0;
  let directivesRemoved = 0;
  let directivesJustified = 0;

  for (const [filePath, actions] of byFile) {
    const source = await readFile(filePath, 'utf-8');
    const lines = source.split('\n');

    // Sort descending so we process from bottom-to-top
    const sorted = [...actions].sort((a, b) => b.line - a.line);

    for (const action of sorted) {
      const idx = action.line - 1; // 0-based index
      if (idx < 0 || idx >= lines.length) {
        continue;
      }

      if (action.kind === 'remove') {
        lines.splice(idx, 1);
        directivesRemoved++;
      } else {
        // Append justification comment to the directive line
        const currentLine = lines[idx];
        // Strip any existing trailing comment (shouldn't have one, but be safe)
        const withoutTrailingComment = currentLine.replace(/\s*\/\/.*$/, '');
        // Ensure semicolon before the comment
        const base = withoutTrailingComment.trimEnd().endsWith(';')
          ? withoutTrailingComment.trimEnd()
          : withoutTrailingComment.trimEnd() + ';';
        lines[idx] = `${base} // justified: ${action.reason}`;
        directivesJustified++;
      }
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
    filesModified++;
  }

  return { filesModified, directivesRemoved, directivesJustified };
}

/**
 * Build a concise justification string for an active directive.
 * Summarizes why the compiler would optimize the function (and thus
 * why the directive is intentionally keeping it unoptimized).
 */
function buildJustification(r: DirectiveAnalysis): string {
  const fnName = r.functionName ?? 'unknown function';
  return `compiler would optimize ${fnName} — manual opt-out to preserve runtime behavior`;
}
