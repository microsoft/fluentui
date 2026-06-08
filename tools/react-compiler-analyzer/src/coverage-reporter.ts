import { relative } from 'node:path';

import type { Formatter } from './formatter';
import type { FunctionAnalysis } from './types';

const TABLE_REASON_MAX_LEN = 80;

/**
 * Print a coverage report of all function analyses, grouped by package.
 * Always prints a summary table. With `verbose`, also prints a per-function table.
 */
export function printCoverageReport(
  f: Formatter,
  results: FunctionAnalysis[],
  workspaceRoot: string,
  verbose: boolean,
  fullReasons: boolean,
): void {
  if (results.length === 0) {
    f.blank();
    f.line('No functions analyzed by the compiler.');
    return;
  }

  // Group by package
  const byPackage = new Map<string, FunctionAnalysis[]>();
  for (const r of results) {
    const existing = byPackage.get(r.packageName) ?? [];
    existing.push(r);
    byPackage.set(r.packageName, existing);
  }

  const sortedPackages = [...byPackage.keys()].sort();

  for (const pkg of sortedPackages) {
    const pkgResults = byPackage.get(pkg)!;
    f.blank();
    f.heading(2, pkg);
    f.blank();
    printPackageSummaryTable(f, pkgResults);

    if (verbose) {
      const compiled = pkgResults.filter(r => r.status === 'compiled');
      const skipped = pkgResults.filter(r => r.status === 'skipped');
      const errored = pkgResults.filter(r => r.status === 'error');

      if (compiled.length > 0) {
        f.heading(3, 'Compiled (will be memoized)');
        f.blank();
        printFunctionTable(f, compiled, workspaceRoot, fullReasons, true);
      }
      if (skipped.length > 0) {
        f.heading(3, 'Skipped (not a component/hook)');
        f.blank();
        printFunctionTable(f, skipped, workspaceRoot, fullReasons, false);
      }
      if (errored.length > 0) {
        f.heading(3, 'Errors (compiler bailout)');
        f.blank();
        printFunctionTable(f, errored, workspaceRoot, fullReasons, false);
      }
    }
  }
}

function printPackageSummaryTable(f: Formatter, results: FunctionAnalysis[]): void {
  const total = results.length;
  const compiled = results.filter(r => r.status === 'compiled').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const errored = results.filter(r => r.status === 'error').length;

  f.table(
    ['Status', 'Count', 'Percentage'],
    [
      ['Compiled', compiled, pct(compiled, total)],
      ['Skipped', skipped, pct(skipped, total)],
      ['Errors', errored, pct(errored, total)],
      ['**Total**', `**${total}**`, ''],
    ],
  );
  f.blank();
}

function printFunctionTable(
  f: Formatter,
  results: FunctionAnalysis[],
  workspaceRoot: string,
  fullReasons: boolean,
  showMemoStats: boolean,
): void {
  if (showMemoStats) {
    const rows = results.map(r => {
      const relPath = relative(workspaceRoot, r.filePath);
      const fn = r.functionName ?? '(anonymous)';
      const stats = r.memoStats;
      return [`${relPath}:${r.line}`, fn, stats?.memoSlots ?? 0, stats?.memoBlocks ?? 0, stats?.memoValues ?? 0];
    });
    f.table(['Location', 'Function', 'Memo Slots', 'Memo Blocks', 'Memo Values'], rows);
  } else {
    const rows = results.map(r => {
      const relPath = relative(workspaceRoot, r.filePath);
      const fn = r.functionName ?? '(anonymous)';
      const reason = r.reason
        ? fullReasons
          ? escapeTableCell(r.reason)
          : truncate(r.reason, TABLE_REASON_MAX_LEN)
        : '';
      return [`${relPath}:${r.line}`, fn, r.compilerEvent, reason];
    });
    f.table(['Location', 'Function', 'Compiler Event', 'Reason'], rows);
  }
  f.blank();

  if (fullReasons) {
    const withReasons = results.filter(r => r.reason && r.reason.includes('\n'));
    if (withReasons.length > 0) {
      f.details('Full compiler output', () => {
        for (const r of withReasons) {
          const relPath = relative(workspaceRoot, r.filePath);
          const fn = r.functionName ?? '(anonymous)';
          f.heading(4, `${relPath}:${r.line} — ${fn}`);
          f.blank();
          f.code(r.reason!);
          f.blank();
        }
      });
    }
  }
}

/**
 * Print an overall coverage summary.
 */
export function printCoverageSummary(f: Formatter, results: FunctionAnalysis[], verbose: boolean): void {
  const total = results.length;
  const compiledResults = results.filter(r => r.status === 'compiled');
  const compiled = compiledResults.length;
  const migrationCandidates = compiledResults.filter(r => r.manualMemo).length;
  const compilerReady = compiled - migrationCandidates;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const errored = results.filter(r => r.status === 'error').length;

  f.heading(2, 'Summary');
  f.blank();
  f.line(`- **Total functions analyzed:** ${total}`);
  f.line(`- **Compiled** (will be memoized): ${compiled} (${pct(compiled, total)})`);
  f.line(`  - Migration candidates (has manual memoization): ${migrationCandidates}`);
  f.line(`  - Compiler-ready (no manual memoization): ${compilerReady}`);
  f.line(`- **Skipped** (not a component/hook): ${skipped} (${pct(skipped, total)})`);
  f.line(`- **Errors** (compiler bailout): ${errored} (${pct(errored, total)})`);
  f.blank();

  if (total === 0) {
    f.line('> No functions were analyzed. The directory may not contain React components or hooks.');
    f.blank();
  } else if (errored > 0) {
    f.line(
      `> **${errored}** function(s) caused compiler errors — these won't be optimized until the patterns are refactored.`,
    );
    f.line('> Run with `--verbose` to see per-function details.');
    f.blank();
  } else {
    f.line('> All recognized functions compile successfully.');
    f.blank();
  }

  if (verbose) {
    f.heading(3, 'Legend');
    f.blank();
    f.table(
      ['Term', 'Meaning'],
      [
        [
          '**Memo Slots**',
          'Total number of cache slots the compiler allocates for a function. Each memoized value or block occupies one slot.',
        ],
        [
          '**Memo Blocks**',
          'Number of memoized code blocks (JSX elements, conditional branches, etc.) that the compiler wraps with cache checks.',
        ],
        [
          '**Memo Values**',
          'Number of individual memoized values (variables, expressions, hook results) that the compiler caches between renders.',
        ],
      ],
    );
    f.blank();
  }
}

/**
 * Print a "Migration Candidates" section — functions that compile successfully
 * and also use manual memoization (useMemo, useCallback, React.memo).
 * These are candidates for adding 'use memo' and removing manual hooks.
 *
 * Buckets:
 * 1. **Safe to remove** — useMemo/useCallback hooks and React.memo without comparator
 * 2. **Needs manual review** — React.memo with custom comparator (custom equality logic)
 */
export function printMigrationCandidates(f: Formatter, results: FunctionAnalysis[], workspaceRoot: string): void {
  const candidates = results.filter(r => r.status === 'compiled' && r.manualMemo);

  if (candidates.length === 0) {
    return;
  }

  const safeToRemove = candidates.filter(r => !r.manualMemo!.reactMemoHasComparator);
  const needsReview = candidates.filter(r => r.manualMemo!.reactMemoHasComparator);

  f.heading(2, 'Migration Candidates');
  f.blank();
  f.line(
    'Functions that compile successfully and contain manual memoization. ' +
      "These can safely use `'use memo'` and may have their manual hooks removed.",
  );
  f.blank();

  if (safeToRemove.length > 0) {
    f.heading(3, 'Safe to Remove');
    f.blank();
    f.line(
      '`useMemo`/`useCallback` hooks and `React.memo` wrappers (without comparator) are redundant ' +
        'after compiler adoption and can be removed.',
    );
    f.blank();
    printMigrationTable(f, safeToRemove, workspaceRoot);
  }

  if (needsReview.length > 0) {
    f.heading(3, 'Needs Manual Review');
    f.blank();
    f.line(
      '`React.memo` with a custom comparator cannot be automatically removed — the comparator ' +
        'provides custom equality logic not replicated by the compiler. The function body is still ' +
        'optimized, but the wrapper requires human judgment.',
    );
    f.blank();
    printMigrationTable(f, needsReview, workspaceRoot);
  }

  f.line(`> **${candidates.length}** migration candidate(s) found`);
  if (needsReview.length > 0) {
    f.line(`> (**${needsReview.length}** need manual review due to custom comparator).`);
  }
  f.blank();
}

function printMigrationTable(f: Formatter, entries: FunctionAnalysis[], workspaceRoot: string): void {
  const rows = entries.map(r => {
    const relPath = relative(workspaceRoot, r.filePath);
    const fn = r.functionName ?? '(anonymous)';
    const memo = r.manualMemo!;
    const slots = r.memoStats?.memoSlots ?? 0;
    const memoLabel = memo.reactMemo ? (memo.reactMemoHasComparator ? 'yes (comparator)' : 'yes') : 'no';
    return [`${relPath}:${r.line}`, fn, memo.useMemo, memo.useCallback, memoLabel, slots];
  });

  f.table(['Location', 'Function', 'useMemo', 'useCallback', 'React.memo', 'Memo Slots'], rows);
  f.blank();
}

function pct(count: number, total: number): string {
  if (total === 0) {
    return '0%';
  }
  return `${((count / total) * 100).toFixed(1)}%`;
}

function truncate(str: string, maxLen: number): string {
  const cleaned = str.replace(/\n/g, ' ');
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen - 3) + '...' : cleaned;
}

function escapeTableCell(str: string): string {
  return str.replace(/\n/g, ' ').replace(/\|/g, '\\|');
}
