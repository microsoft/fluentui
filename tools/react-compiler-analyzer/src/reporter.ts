import type { Formatter } from './formatter';
import { compareText } from './ordering';
import { toWorkspacePath } from './path-utils';
import type { DirectiveAnalysis } from './types';

const TABLE_REASON_MAX_LEN = 80;

function isPreservedFileOptOut(result: DirectiveAnalysis): boolean {
  return result.status === 'skipped' && result.directiveType === 'use-no-memo' && result.sourceFunctionId === null;
}

/**
 * Print a report of all directive analyses, grouped by package and status.
 */
export function printReport(f: Formatter, results: DirectiveAnalysis[], workspaceRoot: string, verbose: boolean): void {
  if (results.length === 0) {
    f.blank();
    f.line('No directives found.');
    return;
  }

  // Group by package
  const byPackage = new Map<string | null, DirectiveAnalysis[]>();
  for (const r of results) {
    const existing = byPackage.get(r.packageName) ?? [];
    existing.push(r);
    byPackage.set(r.packageName, existing);
  }

  // Sort packages alphabetically
  const sortedPackages = [...byPackage.keys()].sort((a, b) => compareText(a ?? '', b ?? ''));

  for (const pkg of sortedPackages) {
    const pkgResults = byPackage.get(pkg)!;
    const activeNoMemo = pkgResults.filter(r => r.status === 'active' && r.directiveType === 'use-no-memo');
    const activeMemo = pkgResults.filter(r => r.status === 'active' && r.directiveType === 'use-memo');
    const redundant = pkgResults.filter(r => r.status === 'redundant');
    const skipped = pkgResults.filter(r => r.status === 'skipped');
    const broken = pkgResults.filter(r => r.status === 'broken');
    const conflicting = pkgResults.filter(r => r.status === 'conflicting');

    f.blank();
    const packageLabel = pkg ?? '(unpackaged)';
    f.heading(2, packageLabel);
    f.blank();

    if (activeNoMemo.length > 0) {
      f.foldableSection(
        {
          title: activeNoMemo.some(r => r.revalidated)
            ? 'Active opt-outs (unjustified: add justification; justified: report-only)'
            : 'Active (needs `// justified:` comment)',
          status: 'warning',
          count: activeNoMemo.length,
          level: 3,
          group: packageLabel,
        },
        () => printTable(f, activeNoMemo, workspaceRoot, verbose),
      );
    }

    if (activeMemo.length > 0) {
      f.foldableSection(
        { title: 'Active (compilable)', status: 'success', count: activeMemo.length, level: 3, group: packageLabel },
        () => printTable(f, activeMemo, workspaceRoot, verbose),
      );
    }

    if (broken.length > 0) {
      f.foldableSection(
        {
          title: broken.some(result => result.directiveType === 'use-no-memo')
            ? 'Broken (compilation or probe failed)'
            : "Broken (`'use memo'` on non-compilable)",
          status: 'error',
          count: broken.length,
          level: 3,
          group: packageLabel,
        },
        () => printTable(f, broken, workspaceRoot, verbose),
      );
    }

    if (conflicting.length > 0) {
      f.foldableSection(
        {
          title: 'Conflicting (both directives on same function)',
          status: 'error',
          count: conflicting.length,
          level: 3,
          group: packageLabel,
        },
        () => printTable(f, conflicting, workspaceRoot, verbose),
      );
    }

    if (redundant.length > 0) {
      f.foldableSection(
        {
          title: redundant.some(r => r.revalidated)
            ? 'Redundant (unjustified: removable; justified: manual review)'
            : 'Redundant (removable)',
          status: 'warning',
          count: redundant.length,
          level: 3,
          group: packageLabel,
        },
        () => printTable(f, redundant, workspaceRoot, verbose),
      );
    }

    if (skipped.length > 0) {
      f.foldableSection(
        {
          title: skipped.some(isPreservedFileOptOut)
            ? 'Skipped (justified or file-level opt-out)'
            : 'Skipped (already justified)',
          status: 'info',
          count: skipped.length,
          level: 3,
          group: packageLabel,
        },
        () => printTable(f, skipped, workspaceRoot, verbose),
      );
    }
  }
}

function printTable(f: Formatter, results: DirectiveAnalysis[], workspaceRoot: string, verbose: boolean): void {
  const rows = results.map(r => {
    const relPath = toWorkspacePath(workspaceRoot, r.filePath);
    const fn = r.functionName ?? '(unknown)';
    // In verbose output, keep the full reason while collapsing newlines so the table stays valid.
    const reason = r.reason ? (verbose ? r.reason.replace(/\n/g, ' ') : truncate(r.reason, TABLE_REASON_MAX_LEN)) : '';
    return [`${relPath}:${r.line}`, fn, r.compilerEvent, reason];
  });

  f.table(['Location', 'Function', 'Compiler Event', 'Reason'], rows);
  f.blank();

  if (verbose) {
    // Print the full code-framed diagnostics as details blocks below the table for readability
    const withFull = results.filter(r => r.fullReason);
    if (withFull.length > 0) {
      f.details('Full compiler output', () => {
        for (const r of withFull) {
          const relPath = toWorkspacePath(workspaceRoot, r.filePath);
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
  const failedProbe = results.some(r => r.status === 'broken' && r.directiveType === 'use-no-memo');
  const skippedLabel = results.some(isPreservedFileOptOut) ? 'justified or file-level opt-out' : 'already justified';

  const activeNoMemo = results.filter(r => r.status === 'active' && r.directiveType === 'use-no-memo').length;
  const activeMemo = results.filter(r => r.status === 'active' && r.directiveType === 'use-memo').length;

  f.heading(2, 'Summary');
  f.blank();
  f.line(`- **Total directives:** ${total}`);
  const protectedResults = results.some(r => r.revalidated);
  const protectedRedundant = results.some(r => r.revalidated && r.status === 'redundant');
  f.line(
    `- **Redundant** (${
      protectedRedundant ? 'unjustified: removable; justified: manual review' : 'removable'
    }): ${redundant}`,
  );
  if (activeNoMemo > 0) {
    f.line(
      `- **Active** \`'use no memo'\` (${
        results.some(r => r.revalidated && r.status === 'active' && r.directiveType === 'use-no-memo')
          ? 'unjustified: add justification; justified: report-only'
          : 'needs `// justified:` comment'
      }): ${activeNoMemo}`,
    );
  }
  if (activeMemo > 0) {
    f.line(`- **Active** \`'use memo'\` (compilable): ${activeMemo}`);
  }
  f.line(`- **Skipped** (${skippedLabel}): ${skipped}`);
  if (broken > 0) {
    const brokenLabel = failedProbe ? 'compilation or probe failed' : "'use memo' on non-compilable";
    f.line(`- **Broken** (${brokenLabel}): ${broken}`);
  }
  if (conflicting > 0) {
    f.line(`- **Conflicting** (both directives on same function): ${conflicting}`);
  }
  f.blank();

  // Actionable messaging based on directive types
  const redundantNoMemo = results.filter(
    r => !r.justified && r.status === 'redundant' && r.directiveType === 'use-no-memo',
  ).length;
  const actionableActiveNoMemo = results.filter(
    r => !r.justified && r.status === 'active' && r.directiveType === 'use-no-memo',
  ).length;
  if (protectedResults) {
    f.line('> Revalidated justified directives are report-only and will not be changed by `--fix`.');
    f.blank();
  }
  if (protectedRedundant) {
    f.line(
      '> Review redundant justified directives against the applicable build before manually removing or updating them; `--fix` leaves them untouched.',
    );
    f.blank();
  }

  if (redundantNoMemo > 0 && actionableActiveNoMemo > 0) {
    f.line(`> **${redundantNoMemo}** redundant \`'use no memo'\` directive(s) can be safely removed.`);
    f.line(
      `> **${actionableActiveNoMemo}** active \`'use no memo'\` directive(s) need a \`// justified: <reason>\` comment.`,
    );
    f.line('>');
    f.line('> Run with `--fix` to auto-remove redundant directives and annotate active ones.');
    f.blank();
  } else if (redundantNoMemo > 0) {
    f.line(`> **${redundantNoMemo}** redundant \`'use no memo'\` directive(s) found.`);
    f.line('> Run with `--fix` to auto-remove them.');
    f.blank();
  } else if (actionableActiveNoMemo > 0) {
    f.line(
      `> **${actionableActiveNoMemo}** active \`'use no memo'\` directive(s) need a \`// justified: <reason>\` comment.`,
    );
    f.line('> Run with `--fix` to annotate them.');
    f.blank();
  } else if (broken === 0 && conflicting === 0 && redundant === 0) {
    f.line('> All directives are valid. Nothing to do.');
    f.blank();
  }

  if (broken > 0) {
    f.line(
      failedProbe
        ? `> **${broken}** broken directive(s). Compilation or opt-out probing failed; no automatic fix is available.`
        : `> ⚠ **${broken}** broken \`'use memo'\` directive(s) — function cannot be compiled.`,
    );
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
    const noMemoSkipped = noMemoResults.filter(r => r.status === 'skipped' && !isPreservedFileOptOut(r)).length;
    const noMemoPreserved = noMemoResults.filter(isPreservedFileOptOut).length;
    const noMemoBroken = noMemoResults.filter(r => r.status === 'broken').length;
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
    if (noMemoPreserved > 0) {
      subParts.push(`${noMemoPreserved} preserved`);
    }
    if (noMemoBroken > 0) {
      subParts.push(`${noMemoBroken} broken`);
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
