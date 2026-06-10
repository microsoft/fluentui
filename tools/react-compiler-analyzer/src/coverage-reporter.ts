import { relative } from 'node:path';

import type { Cell, Formatter } from './formatter';
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
        f.section('success', () => {
          f.heading(3, 'Compiled (will be memoized)', 'success');
          f.blank();
          printFunctionTable(f, compiled, workspaceRoot, true);
        });
      }
      if (skipped.length > 0) {
        f.section('warning', () => {
          f.heading(3, 'Skipped (not a component/hook)', 'warning');
          f.blank();
          printFunctionTable(f, skipped, workspaceRoot, false);
        });
      }
      if (errored.length > 0) {
        f.section('error', () => {
          f.heading(3, 'Errors (compiler bailout)', 'error');
          f.blank();
          printErrorGroups(f, errored, workspaceRoot, fullReasons);
        });
      }
    }
  }
}

function printPackageSummaryTable(f: Formatter, results: FunctionAnalysis[]): void {
  const compiled = results.filter(r => r.status === 'compiled').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  // The compiler emits one event per error, so a function can appear in several error
  // rows. Count distinct functions so the totals reflect functions, not error occurrences.
  const errored = countErroredFunctions(results);
  const total = compiled + skipped + errored;

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
      const reason = r.reason ? truncate(r.reason, TABLE_REASON_MAX_LEN) : '';
      return [`${relPath}:${r.line}`, fn, r.compilerEvent, reason];
    });
    f.table(['Location', 'Function', 'Compiler Event', 'Reason'], rows);
  }
  f.blank();
}

/**
 * Print compiler-bailout errors grouped by the function they occurred in.
 *
 * The React Compiler emits one event per error, so a single function can produce
 * several rows. Grouping keeps all errors for a function together under one heading,
 * making it clear which functions fail and where. When `fullReasons` is set, each
 * function's full code-framed diagnostics are printed right below its summary table.
 */
function printErrorGroups(
  f: Formatter,
  errored: FunctionAnalysis[],
  workspaceRoot: string,
  fullReasons: boolean,
): void {
  // Group by function location (file + line + column + name), preserving first-seen order.
  const groups = new Map<string, FunctionAnalysis[]>();
  for (const r of errored) {
    const key = `${r.filePath}:${r.line}:${r.column}:${r.functionName ?? ''}`;
    const existing = groups.get(key);
    if (existing) {
      existing.push(r);
    } else {
      groups.set(key, [r]);
    }
  }

  for (const group of groups.values()) {
    const first = group[0];
    const relPath = relative(workspaceRoot, first.filePath);
    const fn = first.functionName ?? '(anonymous)';
    const count = group.length;

    f.heading(4, `${relPath}:${first.line} — ${fn} (${count} ${count === 1 ? 'error' : 'errors'})`, 'error');
    f.blank();

    const rows = group.map(r => {
      const at = r.errorLine !== undefined ? `${r.errorLine}:${r.errorColumn ?? 0}` : '';
      return [at, r.compilerEvent, r.reason ? truncate(r.reason, TABLE_REASON_MAX_LEN) : ''];
    });
    f.table(['Line', 'Compiler Event', 'Reason'], rows);
    f.blank();

    if (fullReasons) {
      for (const r of group) {
        if (r.fullReason) {
          f.code(r.fullReason);
          f.blank();
        }
      }
    }
  }
}

/**
 * Print an overall coverage summary.
 */
export function printCoverageSummary(f: Formatter, results: FunctionAnalysis[], verbose: boolean): void {
  const compiledResults = results.filter(r => r.status === 'compiled');
  const compiled = compiledResults.length;
  const migrationCandidates = compiledResults.filter(r => r.manualMemo).length;
  const compilerReady = compiled - migrationCandidates;
  const skipped = results.filter(r => r.status === 'skipped').length;
  // The compiler emits one event per error, so a function can appear in several error
  // rows. Count distinct functions so the totals reflect functions, not error occurrences.
  const errored = countErroredFunctions(results);
  const total = compiled + skipped + errored;

  f.heading(2, 'Summary');
  f.blank();
  f.line(`- **Total functions analyzed:** ${total}`);
  f.line(`- **Compiled** (will be memoized): ${compiled} (${pct(compiled, total)})`);
  f.line(`  - Migration candidates (has manual memoization): ${migrationCandidates}`);
  f.line(`  - Compiler-ready (no manual memoization): ${compilerReady}`);
  f.line(`- **Skipped** (not a component/hook): ${skipped} (${pct(skipped, total)})`);
  f.line(`- **Errors** (compiler bailout): ${errored} (${pct(errored, total)})`);
  f.blank();

  const riskyFunctions = compiledResults.filter(r => r.risks && r.risks.length > 0).length;
  if (riskyFunctions > 0) {
    f.line(
      `> ⚠️ **${riskyFunctions}** compiled function(s) contain runtime-risk patterns that are unsafe to memoize ` +
        '(see **Compiled but Risky**).',
    );
    f.blank();
  }

  if (total === 0) {
    f.line('> No functions were analyzed. The directory may not contain React components or hooks.');
    f.blank();
  } else if (errored > 0) {
    f.line(
      `> **${errored}** function(s) caused compiler errors — these won't be optimized until the patterns are refactored.`,
    );
    if (!verbose) {
      f.line('> Run with `--verbose` to see per-function details.');
    }
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

  f.section('info', () => {
    f.heading(2, 'Migration Candidates', 'info');
    f.blank();
    f.line(
      'Functions that compile successfully and contain manual memoization. ' +
        "These can safely use `'use memo'` and may have their manual hooks removed.",
    );
    f.blank();

    if (safeToRemove.length > 0) {
      f.heading(3, 'Safe to Remove', 'info');
      f.blank();
      f.line(
        '`useMemo`/`useCallback` hooks and `React.memo` wrappers (without comparator) are redundant ' +
          'after compiler adoption and can be removed.',
      );
      f.blank();
      printMigrationTable(f, safeToRemove, workspaceRoot);
    }

    if (needsReview.length > 0) {
      f.heading(3, 'Needs Manual Review', 'warning');
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
  });
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

/** Order risk findings high → low so the most dangerous appear first. */
const RISK_SEVERITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

/**
 * Print a "Compiled but Risky" section — functions the compiler accepts (`CompileSuccess`)
 * that contain patterns known to break at runtime once memoized. These are exactly the
 * cases the compiler's own analysis cannot catch: stale `getState()` snapshot reads and
 * fresh inline arguments to external selector hooks (the `areHookInputsEqual` crash).
 *
 * Unlike compiler errors, these functions will be silently memoized — so they are the
 * highest-value rows in the report for anyone enabling the compiler ring-by-ring.
 */
export function printRuntimeRisks(f: Formatter, results: FunctionAnalysis[], workspaceRoot: string): void {
  const risky = results.filter(r => r.status === 'compiled' && r.risks && r.risks.length > 0);

  if (risky.length === 0) {
    return;
  }

  const totalFindings = risky.reduce((sum, r) => sum + (r.risks?.length ?? 0), 0);

  f.section('warning', () => {
    f.heading(2, 'Compiled but Risky', 'warning');
    f.blank();
    f.line(
      'These functions **compile successfully** but contain patterns that break at runtime ' +
        'once memoized — the compiler cannot detect them. Review each before opting into the ' +
        "compiler, or add a justified `'use no memo'` opt-out.",
    );
    f.blank();

    const rows: Cell[][] = [];
    for (const r of risky) {
      const relPath = relative(workspaceRoot, r.filePath);
      const fn = r.functionName ?? '(anonymous)';
      const sorted = [...r.risks!].sort(
        (a, b) => (RISK_SEVERITY_ORDER[a.severity] ?? 9) - (RISK_SEVERITY_ORDER[b.severity] ?? 9),
      );
      for (const risk of sorted) {
        rows.push([
          `${relPath}:${risk.line}`,
          fn,
          risk.severity,
          risk.ruleId,
          // Risk messages are short, single-line strings we author ourselves — show them
          // in full rather than truncating like unbounded compiler diagnostics.
          risk.message,
        ]);
      }
    }

    f.table(['Location', 'Function', 'Severity', 'Rule', 'Reason'], rows);
    f.blank();
    f.line(`> **${totalFindings}** runtime-risk finding(s) across **${risky.length}** compiled function(s).`);
    f.blank();
  });
}

function pct(count: number, total: number): string {
  if (total === 0) {
    return '0%';
  }
  return `${((count / total) * 100).toFixed(1)}%`;
}

/**
 * Count distinct functions among errored results. The React Compiler emits one event
 * per error, so a single function can produce multiple `status: 'error'` rows; these
 * are de-duplicated by function location (file + line + column + name).
 */
function countErroredFunctions(results: FunctionAnalysis[]): number {
  const seen = new Set<string>();
  for (const r of results) {
    if (r.status === 'error') {
      seen.add(`${r.filePath}:${r.line}:${r.column}:${r.functionName ?? ''}`);
    }
  }
  return seen.size;
}

function truncate(str: string, maxLen: number): string {
  const cleaned = str.replace(/\n/g, ' ');
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen - 3) + '...' : cleaned;
}
