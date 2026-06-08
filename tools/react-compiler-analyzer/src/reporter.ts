import { relative } from 'node:path';

import type { Formatter } from './formatter';
import type { DirectiveAnalysis } from './types';

const TABLE_REASON_MAX_LEN = 80;

/**
 * Print a report of all directive analyses, grouped by package and status.
 */
export function printReport(
  f: Formatter,
  results: DirectiveAnalysis[],
  workspaceRoot: string,
  fullReasons: boolean,
): void {
  if (results.length === 0) {
    f.blank();
    f.line('No directives found.');
    return;
  }

  // Group by package
  const byPackage = new Map<string, DirectiveAnalysis[]>();
  for (const r of results) {
    const existing = byPackage.get(r.packageName) ?? [];
    existing.push(r);
    byPackage.set(r.packageName, existing);
  }

  // Sort packages alphabetically
  const sortedPackages = [...byPackage.keys()].sort();

  for (const pkg of sortedPackages) {
    const pkgResults = byPackage.get(pkg)!;
    const activeNoMemo = pkgResults.filter(r => r.status === 'active' && r.directiveType === 'use-no-memo');
    const activeMemo = pkgResults.filter(r => r.status === 'active' && r.directiveType === 'use-memo');
    const redundant = pkgResults.filter(r => r.status === 'redundant');
    const skipped = pkgResults.filter(r => r.status === 'skipped');

    f.blank();
    f.heading(2, pkg);
    f.blank();

    if (activeNoMemo.length > 0) {
      f.heading(3, 'Active (needs `// justified:` comment)');
      f.blank();
      printTable(f, activeNoMemo, workspaceRoot, fullReasons);
    }

    if (activeMemo.length > 0) {
      f.heading(3, 'Active (compilable)');
      f.blank();
      printTable(f, activeMemo, workspaceRoot, fullReasons);
    }

    if (redundant.length > 0) {
      f.heading(3, 'Redundant (removable)');
      f.blank();
      printTable(f, redundant, workspaceRoot, fullReasons);
    }

    if (skipped.length > 0) {
      f.heading(3, 'Skipped (already justified)');
      f.blank();
      printTable(f, skipped, workspaceRoot, fullReasons);
    }
  }
}

function printTable(f: Formatter, results: DirectiveAnalysis[], workspaceRoot: string, fullReasons: boolean): void {
  const rows = results.map(r => {
    const relPath = relative(workspaceRoot, r.filePath);
    const fn = r.functionName ?? '(unknown)';
    const reason = r.reason ? truncate(r.reason, TABLE_REASON_MAX_LEN) : '';
    return [`${relPath}:${r.line}`, fn, r.compilerEvent, reason];
  });

  f.table(['Location', 'Function', 'Compiler Event', 'Reason'], rows);
  f.blank();

  if (fullReasons) {
    // Print the full code-framed diagnostics as details blocks below the table for readability
    const withFull = results.filter(r => r.fullReason);
    if (withFull.length > 0) {
      f.details('Full compiler output', () => {
        for (const r of withFull) {
          const relPath = relative(workspaceRoot, r.filePath);
          const fn = r.functionName ?? '(unknown)';
          f.heading(4, `${relPath}:${r.line} — ${fn}`);
          f.blank();
          f.code(r.fullReason!);
          f.blank();
        }
      });
    }
  }
}

/**
 * Print a summary of the analysis results.
 */
export function printSummary(f: Formatter, results: DirectiveAnalysis[]): void {
  const total = results.length;
  const redundant = results.filter(r => r.status === 'redundant').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const broken = results.filter(r => r.status === 'broken').length;
  const conflicting = results.filter(r => r.status === 'conflicting').length;

  const activeNoMemo = results.filter(r => r.status === 'active' && r.directiveType === 'use-no-memo').length;
  const activeMemo = results.filter(r => r.status === 'active' && r.directiveType === 'use-memo').length;

  f.heading(2, 'Summary');
  f.blank();
  f.line(`- **Total directives:** ${total}`);
  f.line(`- **Redundant** (removable): ${redundant}`);
  if (activeNoMemo > 0) {
    f.line(`- **Active** \`'use no memo'\` (needs \`// justified:\` comment): ${activeNoMemo}`);
  }
  if (activeMemo > 0) {
    f.line(`- **Active** \`'use memo'\` (compilable): ${activeMemo}`);
  }
  f.line(`- **Skipped** (already justified): ${skipped}`);
  if (broken > 0) {
    f.line(`- **Broken** ('use memo' on non-compilable): ${broken}`);
  }
  if (conflicting > 0) {
    f.line(`- **Conflicting** (both directives on same function): ${conflicting}`);
  }
  f.blank();

  // Actionable messaging based on directive types
  const redundantNoMemo = results.filter(r => r.status === 'redundant' && r.directiveType === 'use-no-memo').length;

  if (redundantNoMemo > 0 && activeNoMemo > 0) {
    f.line(`> **${redundantNoMemo}** redundant \`'use no memo'\` directive(s) can be safely removed.`);
    f.line(`> **${activeNoMemo}** active \`'use no memo'\` directive(s) need a \`// justified: <reason>\` comment.`);
    f.line('>');
    f.line('> Run with `--fix` to auto-remove redundant directives and annotate active ones.');
    f.blank();
  } else if (redundantNoMemo > 0) {
    f.line(`> **${redundantNoMemo}** redundant \`'use no memo'\` directive(s) found.`);
    f.line('> Run with `--fix` to auto-remove them.');
    f.blank();
  } else if (activeNoMemo > 0) {
    f.line(`> **${activeNoMemo}** active \`'use no memo'\` directive(s) need a \`// justified: <reason>\` comment.`);
    f.line('> Run with `--fix` to annotate them.');
    f.blank();
  } else if (broken === 0 && conflicting === 0 && redundant === 0) {
    f.line('> All directives are valid. Nothing to do.');
    f.blank();
  }

  if (broken > 0) {
    f.line(`> ⚠ **${broken}** broken \`'use memo'\` directive(s) — function cannot be compiled.`);
    f.blank();
  }
  if (conflicting > 0) {
    f.line(`> ⚠ **${conflicting}** conflicting directive(s) — both 'use no memo' and 'use memo' on same function.`);
    f.blank();
  }
}

/**
 * Print a compact one-liner directive summary for use in the `analyze` command.
 */
export function printDirectiveSummary(f: Formatter, results: DirectiveAnalysis[]): void {
  if (results.length === 0) {
    f.blank();
    f.line('Directives: none found');
    return;
  }

  const noMemoResults = results.filter(r => r.directiveType === 'use-no-memo');
  const memoResults = results.filter(r => r.directiveType === 'use-memo');

  const parts: string[] = [];

  if (noMemoResults.length > 0) {
    const noMemoRedundant = noMemoResults.filter(r => r.status === 'redundant').length;
    const noMemoActive = noMemoResults.filter(r => r.status === 'active').length;
    const noMemoSkipped = noMemoResults.filter(r => r.status === 'skipped').length;
    const subParts = [`${noMemoResults.length} 'use no memo'`];
    if (noMemoRedundant > 0) {
      subParts.push(`${noMemoRedundant} redundant`);
    }
    if (noMemoActive > 0) {
      subParts.push(`${noMemoActive} active`);
    }
    if (noMemoSkipped > 0) {
      subParts.push(`${noMemoSkipped} justified`);
    }
    parts.push(subParts.join(' — '));
  }

  if (memoResults.length > 0) {
    const memoRedundant = memoResults.filter(r => r.status === 'redundant').length;
    const memoActive = memoResults.filter(r => r.status === 'active').length;
    const memoBroken = memoResults.filter(r => r.status === 'broken').length;
    const subParts = [`${memoResults.length} 'use memo'`];
    if (memoRedundant > 0) {
      subParts.push(`${memoRedundant} redundant`);
    }
    if (memoActive > 0) {
      subParts.push(`${memoActive} active`);
    }
    if (memoBroken > 0) {
      subParts.push(`${memoBroken} broken`);
    }
    parts.push(subParts.join(' — '));
  }

  const conflicting = results.filter(r => r.status === 'conflicting').length;
  if (conflicting > 0) {
    parts.push(`${conflicting} conflicting`);
  }

  f.blank();
  f.line(`Directives: ${parts.join('; ')}`);
}

function truncate(str: string, maxLen: number): string {
  const cleaned = str.replace(/\n/g, ' ');
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen - 3) + '...' : cleaned;
}
