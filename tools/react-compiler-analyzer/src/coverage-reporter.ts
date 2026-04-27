import { relative } from 'node:path';

import type { FunctionAnalysis } from './types';

const TABLE_REASON_MAX_LEN = 80;

/**
 * Print a coverage report of all function analyses, grouped by package.
 * Always prints a summary table. With `verbose`, also prints a per-function table.
 */
export function printCoverageReport(
  results: FunctionAnalysis[],
  workspaceRoot: string,
  verbose: boolean,
  fullReasons: boolean,
): void {
  if (results.length === 0) {
    console.log('\nNo functions analyzed by the compiler.');
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
    console.log(`\n## ${pkg}\n`);
    printPackageSummaryTable(pkgResults);

    if (verbose) {
      const compiled = pkgResults.filter(r => r.status === 'compiled');
      const skipped = pkgResults.filter(r => r.status === 'skipped');
      const errored = pkgResults.filter(r => r.status === 'error');

      if (compiled.length > 0) {
        console.log('### Compiled (will be memoized)\n');
        printFunctionTable(compiled, workspaceRoot, fullReasons, true);
      }
      if (skipped.length > 0) {
        console.log('### Skipped (not a component/hook)\n');
        printFunctionTable(skipped, workspaceRoot, fullReasons, false);
      }
      if (errored.length > 0) {
        console.log('### Errors (compiler bailout)\n');
        printFunctionTable(errored, workspaceRoot, fullReasons, false);
      }
    }
  }
}

function printPackageSummaryTable(results: FunctionAnalysis[]): void {
  const total = results.length;
  const compiled = results.filter(r => r.status === 'compiled').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const errored = results.filter(r => r.status === 'error').length;

  console.log('| Status | Count | Percentage |');
  console.log('|--------|-------|------------|');
  console.log(`| Compiled | ${compiled} | ${pct(compiled, total)} |`);
  console.log(`| Skipped | ${skipped} | ${pct(skipped, total)} |`);
  console.log(`| Errors | ${errored} | ${pct(errored, total)} |`);
  console.log(`| **Total** | **${total}** | |`);
  console.log('');
}

function printFunctionTable(
  results: FunctionAnalysis[],
  workspaceRoot: string,
  fullReasons: boolean,
  showMemoStats: boolean,
): void {
  if (showMemoStats) {
    console.log('| File | Line | Function | Memo Slots | Memo Blocks | Memo Values |');
    console.log('|------|------|----------|------------|-------------|-------------|');
    for (const r of results) {
      const relPath = relative(workspaceRoot, r.filePath);
      const fn = r.functionName ?? '(anonymous)';
      const stats = r.memoStats;
      console.log(
        `| ${relPath} | ${r.line} | ${fn} | ${stats?.memoSlots ?? 0} | ${stats?.memoBlocks ?? 0} | ${
          stats?.memoValues ?? 0
        } |`,
      );
    }
  } else {
    console.log('| File | Line | Function | Compiler Event | Reason |');
    console.log('|------|------|----------|----------------|--------|');
    for (const r of results) {
      const relPath = relative(workspaceRoot, r.filePath);
      const fn = r.functionName ?? '(anonymous)';
      const reason = r.reason
        ? fullReasons
          ? escapeTableCell(r.reason)
          : truncate(r.reason, TABLE_REASON_MAX_LEN)
        : '';
      console.log(`| ${relPath} | ${r.line} | ${fn} | ${r.compilerEvent} | ${reason} |`);
    }
  }
  console.log('');

  if (fullReasons) {
    const withReasons = results.filter(r => r.reason && r.reason.includes('\n'));
    if (withReasons.length > 0) {
      console.log('<details><summary>Full compiler output</summary>\n');
      for (const r of withReasons) {
        const relPath = relative(workspaceRoot, r.filePath);
        const fn = r.functionName ?? '(anonymous)';
        console.log(`#### ${relPath}:${r.line} — ${fn}\n`);
        console.log('```');
        console.log(r.reason);
        console.log('```\n');
      }
      console.log('</details>\n');
    }
  }
}

/**
 * Print an overall coverage summary.
 */
export function printCoverageSummary(results: FunctionAnalysis[]): void {
  const total = results.length;
  const compiled = results.filter(r => r.status === 'compiled').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const errored = results.filter(r => r.status === 'error').length;

  console.log('## Summary\n');
  console.log(`- **Total functions analyzed:** ${total}`);
  console.log(`- **Compiled** (will be memoized): ${compiled} (${pct(compiled, total)})`);
  console.log(`- **Skipped** (not a component/hook): ${skipped} (${pct(skipped, total)})`);
  console.log(`- **Errors** (compiler bailout): ${errored} (${pct(errored, total)})`);
  console.log('');

  if (total === 0) {
    console.log('> No functions were analyzed. The directory may not contain React components or hooks.\n');
  } else if (errored > 0) {
    console.log(
      `> **${errored}** function(s) caused compiler errors — these won't be optimized until the patterns are refactored.`,
    );
    console.log('> Run with `--verbose` to see per-function details.\n');
  } else {
    console.log('> All recognized functions compile successfully.\n');
  }

  console.log('### Legend\n');
  console.log('| Term | Meaning |');
  console.log('|------|---------|');
  console.log(
    '| **Memo Slots** | Total number of cache slots the compiler allocates for a function. Each memoized value or block occupies one slot. |',
  );
  console.log(
    '| **Memo Blocks** | Number of memoized code blocks (JSX elements, conditional branches, etc.) that the compiler wraps with cache checks. |',
  );
  console.log(
    '| **Memo Values** | Number of individual memoized values (variables, expressions, hook results) that the compiler caches between renders. |',
  );
  console.log('');
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
