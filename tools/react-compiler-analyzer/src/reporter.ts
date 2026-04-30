import { relative } from 'node:path';

import type { DirectiveAnalysis } from './types';

const TABLE_REASON_MAX_LEN = 80;

/**
 * Print a markdown-formatted report of all directive analyses, grouped by package and status.
 */
export function printReport(results: DirectiveAnalysis[], workspaceRoot: string, fullReasons: boolean): void {
  if (results.length === 0) {
    console.log("\nNo 'use no memo' directives found.");
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
    const active = pkgResults.filter(r => r.status === 'active');
    const redundant = pkgResults.filter(r => r.status === 'redundant');
    const skipped = pkgResults.filter(r => r.status === 'skipped');

    console.log(`\n## ${pkg}\n`);

    if (active.length > 0) {
      console.log('### Active (needs `// justified:` comment)\n');
      printTable(active, workspaceRoot, fullReasons);
    }

    if (redundant.length > 0) {
      console.log('### Redundant (removable)\n');
      printTable(redundant, workspaceRoot, fullReasons);
    }

    if (skipped.length > 0) {
      console.log('### Skipped (already justified)\n');
      printTable(skipped, workspaceRoot, fullReasons);
    }
  }
}

function printTable(results: DirectiveAnalysis[], workspaceRoot: string, fullReasons: boolean): void {
  console.log('| Location | Function | Compiler Event | Reason |');
  console.log('|----------|----------|----------------|--------|');

  for (const r of results) {
    const relPath = relative(workspaceRoot, r.filePath);
    const fn = r.functionName ?? '(unknown)';
    const reason = r.reason ? (fullReasons ? escapeTableCell(r.reason) : truncate(r.reason, TABLE_REASON_MAX_LEN)) : '';
    console.log(`| ${relPath}:${r.line} | ${fn} | ${r.compilerEvent} | ${reason} |`);
  }
  console.log('');

  if (fullReasons) {
    // Print full reasons as details blocks below the table for readability
    const withReasons = results.filter(r => r.reason && r.reason.includes('\n'));
    if (withReasons.length > 0) {
      console.log('<details><summary>Full compiler output</summary>\n');
      for (const r of withReasons) {
        const relPath = relative(workspaceRoot, r.filePath);
        const fn = r.functionName ?? '(unknown)';
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
 * Print a summary of the analysis results.
 */
export function printSummary(results: DirectiveAnalysis[]): void {
  const total = results.length;
  const redundant = results.filter(r => r.status === 'redundant').length;
  const active = results.filter(r => r.status === 'active').length;
  const skipped = results.filter(r => r.status === 'skipped').length;

  console.log('## Summary\n');
  console.log(`- **Total directives:** ${total}`);
  console.log(`- **Redundant** (removable): ${redundant}`);
  console.log(`- **Active** (needs \`// justified:\` comment): ${active}`);
  console.log(`- **Skipped** (already justified): ${skipped}`);
  console.log('');

  if (redundant > 0 && active > 0) {
    console.log(`> **${redundant}** redundant directive(s) can be safely removed.`);
    console.log(
      `> **${active}** active directive(s) need a \`// justified: <reason>\` comment — the compiler would optimize these functions without the directive.`,
    );
    console.log('>');
    console.log('> Run with `--fix` to auto-remove redundant directives and annotate active ones.\n');
  } else if (redundant > 0) {
    console.log(`> **${redundant}** redundant \`'use no memo'\` directive(s) found.`);
    console.log('> Run with `--fix` to auto-remove them.\n');
  } else if (active > 0) {
    console.log(`> **${active}** active directive(s) need a \`// justified: <reason>\` comment.`);
    console.log('> Run with `--fix` to annotate them.\n');
  } else {
    console.log('> All directives are justified. Nothing to do.\n');
  }
}

function truncate(str: string, maxLen: number): string {
  const cleaned = str.replace(/\n/g, ' ');
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen - 3) + '...' : cleaned;
}

function escapeTableCell(str: string): string {
  // For table cells, collapse to single line
  return str.replace(/\n/g, ' ').replace(/\|/g, '\\|');
}
