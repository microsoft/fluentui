import type { CandidateEntry } from './candidates';
import type { Cell, Formatter, StatusKind } from './formatter';
import { memoCacheOutcome } from './memo-cache-outcome';
import { compareRiskFindings, compareText } from './ordering';
import { toWorkspacePath } from './path-utils';
import type { CandidateAction, CandidateReadiness, FunctionAnalysis } from './types';

const TABLE_REASON_MAX_LEN = 80;

const CANDIDATE_ACTION_DESCRIPTIONS: Record<CandidateAction, string> = {
  'hook-lowering-review': 'Manual useMemo/useCallback detected; verify behavior before removing or lowering it.',
  'default-wrapper-review':
    'React.memo has no comparator; review the wrapper separately from the accepted inner function.',
  'custom-comparator-retain':
    'React.memo has a custom comparator; retain it by default unless behavior proves it redundant.',
};

const CANDIDATE_READINESS_DESCRIPTIONS: Record<CandidateReadiness, string> = {
  reviewable: 'Risk analysis ran, no known risk was found, and function kind is known.',
  'risk-unassessed': 'Runtime-risk analysis was not configured for this run.',
  'needs-kind-review': 'The source function kind is unknown and needs manual classification.',
  'blocked-known-risk': 'A known runtime-risk finding blocks migration until addressed.',
};

/**
 * Print a coverage report of all function analyses, grouped by package.
 * Always prints a summary table. With `verbose`, also prints a per-function table.
 */
export function printCoverageReport(
  f: Formatter,
  results: FunctionAnalysis[],
  workspaceRoot: string,
  verbose: boolean,
  candidates: CandidateEntry[] = [],
): void {
  if (results.length === 0) {
    f.blank();
    f.line('No functions analyzed by the compiler.');
    return;
  }

  if (verbose && candidates.length > 0) {
    f.blank();
    printCandidateLegend(f);
  }

  // Group by package
  const byPackage = new Map<string | null, FunctionAnalysis[]>();
  for (const r of results) {
    const existing = byPackage.get(r.packageName) ?? [];
    existing.push(r);
    byPackage.set(r.packageName, existing);
  }

  const sortedPackages = [...byPackage.keys()].sort((a, b) => compareText(a ?? '', b ?? ''));

  for (const pkg of sortedPackages) {
    const pkgResults = byPackage.get(pkg)!;
    const packageCandidates = candidates.filter(candidate => candidate.analysis.packageName === pkg);
    f.blank();
    const packageLabel = pkg ?? '(unpackaged)';
    f.groupHeading(packageLabel);
    f.blank();
    printPackageSummaryTable(f, pkgResults, packageCandidates.length);

    if (verbose) {
      const accepted = pkgResults.filter(r => r.status === 'compiled');
      const skipped = pkgResults.filter(r => r.status === 'skipped');
      const errored = pkgResults.filter(r => r.status === 'error');

      const acceptedSections: Array<{ title: string; results: FunctionAnalysis[]; status?: StatusKind }> = [
        {
          title: 'Compiler accepted (memo cache emitted)',
          results: accepted.filter(result => memoCacheOutcome(result) === 'emitted'),
          status: 'success',
        },
        {
          title: 'Compiler accepted (no memo cache emitted)',
          results: accepted.filter(result => memoCacheOutcome(result) === 'not-emitted'),
        },
        {
          title: 'Compiler accepted (memo cache not reported)',
          results: accepted.filter(result => memoCacheOutcome(result) === 'unknown'),
          status: 'warning',
        },
      ];

      for (const section of acceptedSections) {
        if (section.results.length > 0) {
          f.foldableSection(
            {
              title: section.title,
              status: section.status,
              count: section.results.length,
              level: 3,
              group: packageLabel,
            },
            () => {
              printFunctionTable(f, section.results, workspaceRoot, true);
            },
          );
        }
      }
      if (skipped.length > 0) {
        f.foldableSection(
          {
            title: 'Skipped (opted out or not a component/hook)',
            status: 'warning',
            count: skipped.length,
            level: 3,
            group: packageLabel,
          },
          () => {
            printFunctionTable(f, skipped, workspaceRoot, false);
          },
        );
      }
      if (errored.length > 0) {
        f.foldableSection(
          {
            title: 'Errors (compiler bailout)',
            status: 'error',
            count: countErroredFunctions(errored),
            level: 3,
            group: packageLabel,
          },
          () => {
            printErrorGroups(f, errored, workspaceRoot);
          },
        );
      }
    }

    if (verbose) {
      printMigrationCandidates(f, packageCandidates, workspaceRoot, packageLabel);
    }
  }
}

function printPackageSummaryTable(f: Formatter, results: FunctionAnalysis[], migrationCandidateCount: number): void {
  const accepted = results.filter(r => r.status === 'compiled');
  const memoCacheEmitted = accepted.filter(r => memoCacheOutcome(r) === 'emitted').length;
  const noMemoCacheEmitted = accepted.filter(r => memoCacheOutcome(r) === 'not-emitted').length;
  const memoCacheUnknown = accepted.filter(r => memoCacheOutcome(r) === 'unknown').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  // The compiler emits one event per error, so a function can appear in several error
  // rows. Count distinct functions so the totals reflect functions, not error occurrences.
  const errored = countErroredFunctions(results);
  const total = accepted.length + skipped + errored;
  const rows: Cell[][] = [
    ['Compiler accepted (memo cache emitted)', memoCacheEmitted, pct(memoCacheEmitted, total)],
    ['Compiler accepted (no memo cache emitted)', noMemoCacheEmitted, pct(noMemoCacheEmitted, total)],
  ];
  if (memoCacheUnknown > 0) {
    rows.push(['Compiler accepted (memo cache not reported)', memoCacheUnknown, pct(memoCacheUnknown, total)]);
  }
  rows.push([
    'Manual Memo Migration Candidates',
    migrationCandidateCount,
    accepted.length === 0 ? 'n/a' : `${pct(migrationCandidateCount, accepted.length)} of accepted`,
  ]);
  rows.push(
    ['Skipped', skipped, pct(skipped, total)],
    ['Errors', errored, pct(errored, total)],
    ['**Total**', `**${total}**`, ''],
  );

  f.table(['Status', 'Count', 'Percentage'], rows);
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
      const relPath = toWorkspacePath(workspaceRoot, r.filePath);
      const fn = r.functionName ?? '(anonymous)';
      const stats = r.memoStats;
      return [
        `${relPath}:${r.line}`,
        fn,
        stats?.memoSlots ?? 'unknown',
        stats?.memoBlocks ?? 'unknown',
        stats?.memoValues ?? 'unknown',
      ];
    });
    f.table(['Location', 'Function', 'Memo Slots', 'Memo Blocks', 'Memo Values'], rows);
  } else {
    const rows = results.map(r => {
      const relPath = toWorkspacePath(workspaceRoot, r.filePath);
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
 * making it clear which functions fail and where. In verbose reports, each function's
 * full code-framed diagnostics are printed right below its summary table.
 */
function printErrorGroups(f: Formatter, errored: FunctionAnalysis[], workspaceRoot: string): void {
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
    const relPath = toWorkspacePath(workspaceRoot, first.filePath);
    const fn = first.functionName ?? '(anonymous)';
    const diagnostics = group.flatMap(result => result.diagnostics ?? []);
    const count = diagnostics.length || group.length;

    f.heading(4, `${relPath}:${first.line} — ${fn} (${count} ${count === 1 ? 'error' : 'errors'})`, 'error');
    f.blank();

    const rows =
      diagnostics.length > 0
        ? diagnostics.map(diagnostic => [
            diagnostic.span ? `${diagnostic.span.start.line}:${diagnostic.span.start.column}` : '',
            diagnostic.kind,
            truncate(diagnostic.reason, TABLE_REASON_MAX_LEN),
          ])
        : group.map(r => {
            const at = r.errorLine !== undefined ? `${r.errorLine}:${r.errorColumn ?? 0}` : '';
            return [at, r.compilerEvent, r.reason ? truncate(r.reason, TABLE_REASON_MAX_LEN) : ''];
          });
    f.table(['Line', 'Compiler Event', 'Reason'], rows);
    f.blank();

    const fullDiagnostics =
      diagnostics.length > 0 ? diagnostics.map(diagnostic => diagnostic.fullReason) : group.map(r => r.fullReason);
    for (const fullReason of fullDiagnostics) {
      if (fullReason) {
        f.code(fullReason);
        f.blank();
      }
    }
  }
}

/**
 * Print an overall coverage summary.
 */
export function printCoverageSummary(
  f: Formatter,
  results: FunctionAnalysis[],
  verbose: boolean,
  unparseableCount = 0,
): void {
  const acceptedResults = results.filter(r => r.status === 'compiled');
  const accepted = acceptedResults.length;
  const memoCacheEmitted = acceptedResults.filter(r => memoCacheOutcome(r) === 'emitted').length;
  const noMemoCacheEmitted = acceptedResults.filter(r => memoCacheOutcome(r) === 'not-emitted').length;
  const memoCacheUnknown = acceptedResults.filter(r => memoCacheOutcome(r) === 'unknown').length;
  const migrationCandidates = acceptedResults.filter(r => r.manualMemo && !r.existingDirectives?.useNoMemo).length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  // The compiler emits one event per error, so a function can appear in several error
  // rows. Count distinct functions so the totals reflect functions, not error occurrences.
  const errored = countErroredFunctions(results);
  const total = accepted + skipped + errored;

  f.heading(2, 'Summary');
  f.blank();
  if (!verbose) {
    const rows: Cell[][] = [
      ['Compiler accepted (memo cache emitted)', memoCacheEmitted, pct(memoCacheEmitted, total)],
      ['Compiler accepted (no memo cache emitted)', noMemoCacheEmitted, pct(noMemoCacheEmitted, total)],
    ];
    if (memoCacheUnknown > 0) {
      rows.push(['Compiler accepted (memo cache not reported)', memoCacheUnknown, pct(memoCacheUnknown, total)]);
    }
    rows.push(
      [
        'Manual Memo Migration Candidates',
        migrationCandidates,
        accepted === 0 ? 'n/a' : `${pct(migrationCandidates, accepted)} of accepted`,
      ],
      ['Skipped', skipped, pct(skipped, total)],
      ['Errors', errored, pct(errored, total)],
      ['**Total functions**', `**${total}**`, ''],
    );
    if (unparseableCount > 0) {
      rows.push(['Not analyzed', `${unparseableCount} file(s)`, 'n/a']);
    }
    f.table(['Status', 'Count', 'Percentage'], rows);
    f.blank();
    return;
  }

  f.line(`- **Total functions analyzed:** ${total}`);
  f.line(`- **Compiler accepted:** ${accepted} (${pct(accepted, total)})`);
  f.line(`  - Memo cache emitted: ${memoCacheEmitted} (${pct(memoCacheEmitted, total)} of total)`);
  f.line(`  - No memo cache emitted: ${noMemoCacheEmitted} (${pct(noMemoCacheEmitted, total)} of total)`);
  if (memoCacheUnknown > 0) {
    f.line(`  - Memo cache not reported: ${memoCacheUnknown} (${pct(memoCacheUnknown, total)} of total)`);
  }
  f.line(`- **Skipped** (opted out or not a component/hook): ${skipped} (${pct(skipped, total)})`);
  f.line(`- **Errors** (compiler bailout): ${errored} (${pct(errored, total)})`);
  f.line(`- **Manual memo migration candidates:** ${migrationCandidates}`);
  if (unparseableCount > 0) {
    f.line(`- **Not analyzed** (file could not be parsed): ${unparseableCount} file(s)`);
  }
  f.blank();

  const riskyFunctions = acceptedResults.filter(r => r.risks && r.risks.length > 0).length;
  if (riskyFunctions > 0) {
    f.line(
      `> ⚠️ **${riskyFunctions}** compiler-accepted function(s) contain runtime-risk patterns that are unsafe if memoized ` +
        '(see **Compiled but Risky**).',
    );
    f.blank();
  }

  if (total === 0) {
    f.line('> No functions were analyzed. The directory may not contain React components or hooks.');
    f.blank();
  } else if (errored > 0) {
    f.line(`> **${errored}** function(s) caused compiler errors and were not accepted by the compiler.`);
    if (!verbose) {
      f.line('> Run with `--verbose` to see per-function details.');
    }
    f.blank();
  } else {
    f.line('> No compiler errors were reported.');
    f.blank();
  }

  f.heading(3, 'Legend');
  f.blank();
  f.table(
    ['Term', 'Meaning'],
    [
      [
        '**Memo Slots**',
        'Number of retained runtime cache slots reported by the compiler. Zero means the function was accepted without emitting a memo cache.',
      ],
      [
        '**Memo Blocks**',
        'Number of retained code blocks (JSX elements, conditional branches, etc.) wrapped with cache checks.',
      ],
      ['**Memo Values**', 'Number of retained values (variables, expressions, hook results) cached between renders.'],
    ],
  );
  f.blank();
  f.line('> Memo counters describe emitted compiler output; they do not rank expected performance benefit.');
  f.blank();
}

/** Print the unscored manual-memo migration candidates for one package. */
export function printMigrationCandidates(
  f: Formatter,
  candidates: CandidateEntry[],
  workspaceRoot: string,
  packageLabel?: string,
): void {
  if (candidates.length === 0) {
    return;
  }

  f.foldableSection(
    {
      title: 'Manual Memo Migration Candidates',
      status: 'info',
      count: candidates.length,
      ...(packageLabel ? { level: 3, group: packageLabel } : {}),
    },
    () => {
      f.line(
        'Compiler-accepted functions with detected useMemo, useCallback, or React.memo usage. ' +
          'This is an unscored migration review list, not a performance ranking; compiler acceptance does not ' +
          'prove that a React.memo wrapper is redundant.',
      );
      f.blank();

      printMigrationTable(f, candidates, workspaceRoot);
      f.line(
        `> **${candidates.length}** manual memo migration candidate(s) found. ` +
          'Retain custom comparators by default; default wrappers and hook APIs require review.',
      );
      f.blank();
    },
  );
}

function printCandidateLegend(f: Formatter): void {
  f.foldableSection(
    {
      title: 'Candidate Legend',
      status: 'info',
      defaultOpen: true,
    },
    () => {
      f.table(
        ['Column', 'Value', 'Meaning'],
        [
          ...Object.entries(CANDIDATE_ACTION_DESCRIPTIONS).map(([value, meaning]) => ['Action', value, meaning]),
          ...Object.entries(CANDIDATE_READINESS_DESCRIPTIONS).map(([value, meaning]) => ['Readiness', value, meaning]),
        ],
      );
      f.blank();
    },
  );
}

function printMigrationTable(f: Formatter, entries: CandidateEntry[], workspaceRoot: string): void {
  const rows = entries.map(({ analysis, candidate }) => {
    const relPath = toWorkspacePath(workspaceRoot, analysis.filePath);
    const memo = analysis.manualMemo;
    const memoLabel = memo?.reactMemo ? (memo.reactMemoHasComparator ? 'yes (comparator)' : 'yes') : 'no';
    return [
      `${relPath}:${analysis.line}`,
      analysis.functionName ?? '(anonymous)',
      {
        value: candidate.action,
        title: CANDIDATE_ACTION_DESCRIPTIONS[candidate.action],
      },
      {
        value: candidate.readiness,
        title: CANDIDATE_READINESS_DESCRIPTIONS[candidate.readiness],
      },
      memo?.useMemo ?? 0,
      memo?.useCallback ?? 0,
      memoLabel,
    ];
  });

  f.table(
    [
      'Location',
      'Function',
      {
        value: 'Action',
        title: 'Recommended review treatment for the detected manual memoization.',
      },
      {
        value: 'Readiness',
        title: 'Whether configured risk analysis and source classification allow review to proceed.',
      },
      'useMemo',
      'useCallback',
      'React.memo',
    ],
    rows,
  );
  f.blank();
}

/** A file the parser rejected outright, so it contributed no functions to the report. */
export interface UnparseableFile {
  file: string;
  error: string;
}

/**
 * Print the files that could not be parsed at all.
 *
 * Without this the totals silently shrink: a file that fails to parse yields no functions, so a
 * report can look clean simply because nothing was read. The React Compiler's own loaders parse
 * with a fixed plugin set (`jsx`, `typescript`), so a file rejected here is equally invisible to a
 * real build — it is a genuine coverage hole, not an analyzer quirk.
 */
export function printUnparseableFiles(f: Formatter, files: UnparseableFile[], workspaceRoot: string): void {
  if (files.length === 0) {
    return;
  }

  f.foldableSection({ title: 'Not Analyzed', status: 'warning', count: files.length }, () => {
    f.line(
      'These files could not be parsed, so they contributed **no functions** to the counts above. ' +
        'The React Compiler cannot process them in a real build either.',
    );
    f.blank();

    const rows: Cell[][] = files.map(u => [
      toWorkspacePath(workspaceRoot, u.file),
      // Babel prefixes the absolute path onto the message; the location suffix is the useful part.
      u.error.split('\n')[0].replace(/^.*?:\s*/, ''),
    ]);

    f.table(['File', 'Reason'], rows);
    f.blank();
  });
}

/** Order risk findings high → medium so the most dangerous appear first. */
const RISK_SEVERITY_ORDER: Record<string, number> = { high: 0, medium: 1 };

/**
 * Print a "Compiled but Risky" section — functions the compiler accepts (`CompileSuccess`)
 * that contain a non-reactive store-snapshot read (`store.getState()` / `getXStore().field`).
 * The compiler memoizes such reads behind a compute-once cache slot, so they run on the first
 * render and never again — freezing the value across store transitions, a bug the
 * `CompileSuccess` verdict cannot reveal.
 *
 * Unlike compiler errors, these functions will be silently memoized — so they are the
 * highest-value rows in the report for anyone enabling the compiler ring-by-ring.
 *
 * Risky functions that did *not* compile are reported in companion sections, split by why they are
 * dormant: a `'use no memo'` opt-out that is actively holding the risk back, versus a compile
 * failure. The two demand opposite actions, so they must not be conflated.
 */
export function printRuntimeRisks(f: Formatter, results: FunctionAnalysis[], workspaceRoot: string): void {
  const withRisks = results.filter(r => r.risks && r.risks.length > 0);
  const risky = withRisks.filter(r => r.status === 'compiled');
  const notCompiled = withRisks.filter(r => r.status !== 'compiled');
  const suppressed = notCompiled.filter(r => r.existingDirectives?.useNoMemo);
  const pending = notCompiled.filter(r => !r.existingDirectives?.useNoMemo);

  if (risky.length > 0) {
    printRiskTable(f, risky, workspaceRoot, {
      title: 'Compiled but Risky',
      intro:
        'These functions **compile successfully** but contain patterns that break at runtime ' +
        'once memoized — the compiler cannot detect them. Review each before opting into the ' +
        "compiler, or add a justified `'use no memo'` opt-out.",
      subject: 'compiled function(s)',
    });
  }

  if (suppressed.length > 0) {
    printRiskTable(f, suppressed, workspaceRoot, {
      title: "Suppressed by 'use no memo'",
      intro:
        "These functions carry a `'use no memo'` opt-out **and** still contain a runtime-risk " +
        'pattern, so the directive is load-bearing: removing it makes the finding live. They are ' +
        'listed separately because an unnecessary opt-out and a working one otherwise look ' +
        'identical — both simply produce no live finding.',
      subject: 'opted-out function(s)',
    });
  }

  if (pending.length > 0) {
    printRiskTable(f, pending, workspaceRoot, {
      title: 'Risky but Not Compiled',
      intro:
        'These functions contain the same runtime-risk patterns but are **not memoized today** ' +
        '(the compiler errored or skipped them), so they are not hazardous yet. They become ' +
        'live the moment the compile error is fixed.',
      subject: 'non-compiled function(s)',
    });
  }
}

interface RiskTableCopy {
  title: string;
  intro: string;
  subject: string;
}

function printRiskTable(f: Formatter, entries: FunctionAnalysis[], workspaceRoot: string, copy: RiskTableCopy): void {
  const totalFindings = entries.reduce((sum, r) => sum + (r.risks?.length ?? 0), 0);

  f.foldableSection({ title: copy.title, status: 'warning', count: totalFindings }, () => {
    f.line(copy.intro);
    f.blank();

    const rows: Cell[][] = [];
    for (const r of entries) {
      const relPath = toWorkspacePath(workspaceRoot, r.filePath);
      const fn = r.functionName ?? '(anonymous)';
      const sorted = [...r.risks!].sort(
        (a, b) =>
          (RISK_SEVERITY_ORDER[a.severity] ?? 9) - (RISK_SEVERITY_ORDER[b.severity] ?? 9) || compareRiskFindings(a, b),
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
    f.line(`> **${totalFindings}** runtime-risk finding(s) across **${entries.length}** ${copy.subject}.`);
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
      seen.add(r.sourceFunctionId ?? `${r.filePath}:${r.line}:${r.column}:${r.functionName ?? ''}`);
    }
  }
  return seen.size;
}

function truncate(str: string, maxLen: number): string {
  const cleaned = str.replace(/\n/g, ' ');
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen - 3) + '...' : cleaned;
}
