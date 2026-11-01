import { readFile, writeFile } from 'node:fs/promises';

import { compareText } from './ordering';
import { fingerprintText } from './stable-json';
import type { DirectiveAnalysis, FixResult } from './types';

type SourceAction =
  | { id: string; kind: 'remove'; startOffset: number; endOffset: number }
  | { id: string; kind: 'justify'; startOffset: number; endOffset: number; reason: string };

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

  const byFile = new Map<string, Map<string, SourceAction>>();
  for (const r of actionable) {
    if (!r.directiveSpan) {
      throw new Error(`cannot safely fix '${r.filePath}:${r.line}': directive span is unavailable`);
    }
    const actions = byFile.get(r.filePath) ?? new Map<string, SourceAction>();
    const id = r.directiveId ?? `${r.filePath}:${r.line}:${r.directiveType}`;
    const span = r.directiveSpan;

    if (r.status === 'redundant' && r.directiveType === 'use-no-memo') {
      actions.set(id, { id, kind: 'remove', startOffset: span.start.offset, endOffset: span.end.offset });
    } else if (r.status === 'active' && r.directiveType === 'use-no-memo') {
      actions.set(id, {
        id,
        kind: 'justify',
        startOffset: span.start.offset,
        endOffset: span.end.offset,
        reason: buildJustification(r),
      });
    } else if (r.status === 'conflicting') {
      if (r.directiveType === 'use-no-memo') {
        actions.set(id, { id, kind: 'remove', startOffset: span.start.offset, endOffset: span.end.offset });
      }
    }

    byFile.set(r.filePath, actions);
  }

  let filesModified = 0;
  let directivesRemoved = 0;
  let directivesJustified = 0;

  const sources = new Map<string, string>();
  for (const [filePath] of byFile) {
    const source = await readFile(filePath, 'utf-8');
    const expected = new Set(
      actionable
        .filter(result => result.filePath === filePath)
        .map(result => result.sourceHash)
        .filter(Boolean),
    );
    if (expected.size > 1 || (expected.size === 1 && !expected.has(fingerprintText(source)))) {
      throw new Error(`stale source: '${filePath}' changed after analysis; rerun before fixing directives`);
    }
    sources.set(filePath, source);
  }

  for (const [filePath, actionsById] of [...byFile.entries()].sort(([a], [b]) => compareText(a, b))) {
    const actions = [...actionsById.values()];
    // A `conflicting` result whose directive is the 'use memo' half contributes no action, so a
    // file can reach here with nothing to do. Rewriting it would report a phantom modification.
    if (actions.length === 0) {
      continue;
    }

    const source = sources.get(filePath)!;
    let output = source;
    const sorted = [...actions].sort(
      (a, b) => b.startOffset - a.startOffset || b.endOffset - a.endOffset || compareText(a.id, b.id),
    );

    for (const action of sorted) {
      if (action.startOffset < 0 || action.endOffset < action.startOffset || action.endOffset > output.length) {
        throw new Error(`cannot safely fix '${filePath}': directive span is outside the source bounds`);
      }

      if (action.kind === 'remove') {
        output = output.slice(0, action.startOffset) + output.slice(action.endOffset);
        directivesRemoved++;
      } else {
        output = addJustification(output, action.endOffset, action.reason);
        directivesJustified++;
      }
    }

    if (output === source) {
      continue;
    }
    await writeFile(filePath, output, 'utf-8');
    filesModified++;
  }

  return { filesModified, directivesRemoved, directivesJustified };
}

function addJustification(source: string, directiveEndOffset: number, reason: string): string {
  const newlineOffset = source.indexOf('\n', directiveEndOffset);
  const lineEndOffset =
    newlineOffset === -1 ? source.length : newlineOffset - (source[newlineOffset - 1] === '\r' ? 1 : 0);
  const trailing = source.slice(directiveEndOffset, lineEndOffset);

  if (trailing.trimStart().startsWith('//')) {
    return source.slice(0, lineEndOffset) + `; justified: ${reason}` + source.slice(lineEndOffset);
  }

  const comment = trailing.trim().length === 0 ? ` // justified: ${reason}` : ` /* justified: ${reason} */`;
  return source.slice(0, directiveEndOffset) + comment + source.slice(directiveEndOffset);
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
