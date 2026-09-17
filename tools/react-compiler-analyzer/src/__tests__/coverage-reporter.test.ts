import {
  printCoverageReport as printCoverageReportImpl,
  printCoverageSummary as printCoverageSummaryImpl,
  printMigrationCandidates as printMigrationCandidatesImpl,
  printRuntimeRisks as printRuntimeRisksImpl,
  printUnparseableFiles as printUnparseableFilesImpl,
} from '../coverage-reporter';
import { deriveCandidates, type CandidateEntry } from '../candidates';
import { createFormatter } from '../formatter';
import type { FunctionAnalysis, RiskFinding } from '../types';
import { captureConsole } from './helpers/output';

function candidatesFromAnalyses(results: FunctionAnalysis[], riskConfigured: boolean): CandidateEntry[] {
  return deriveCandidates(results, riskConfigured);
}

/** Render via the markdown formatter so existing snapshots stay stable. */
function printCoverageReport(results: FunctionAnalysis[], workspaceRoot: string, verbose: boolean): void {
  printCoverageReportImpl(
    createFormatter('md'),
    results,
    workspaceRoot,
    verbose,
    candidatesFromAnalyses(results, false),
  );
}

/** Render via the markdown formatter so existing snapshots stay stable. */
function printCoverageSummary(results: FunctionAnalysis[], verbose: boolean): void {
  printCoverageSummaryImpl(createFormatter('md'), results, verbose);
}

/** Render via the markdown formatter so existing snapshots stay stable. */
function printMigrationCandidates(results: FunctionAnalysis[], workspaceRoot: string, riskConfigured = false): void {
  printMigrationCandidatesImpl(createFormatter('md'), candidatesFromAnalyses(results, riskConfigured), workspaceRoot);
}

/** Render via the markdown formatter so existing snapshots stay stable. */
function printRuntimeRisks(results: FunctionAnalysis[], workspaceRoot: string): void {
  printRuntimeRisksImpl(createFormatter('md'), results, workspaceRoot);
}

function makeRisk(overrides: Partial<RiskFinding> = {}): RiskFinding {
  return {
    ruleId: 'nonreactive-store-read',
    severity: 'high',
    line: 7,
    column: 2,
    symbol: 'getAppStore',
    message: 'non-reactive store read',
    ...overrides,
  };
}

function makeFunctionAnalysis(overrides: Partial<FunctionAnalysis>): FunctionAnalysis {
  return {
    filePath: '/workspace/src/Component.tsx',
    packageName: 'test-pkg',
    line: 5,
    column: 0,
    functionName: 'MyComponent',
    status: 'compiled',
    compilerEvent: 'CompileSuccess',
    memoStats: { memoSlots: 2, memoBlocks: 1, memoValues: 1, prunedMemoBlocks: 0, prunedMemoValues: 0 },
    bodyInsertionLine: 6,
    ...overrides,
  };
}

describe('printMigrationCandidates', () => {
  let logOutput: string[];
  let logSpy: ReturnType<typeof captureConsole>;

  beforeEach(() => {
    logOutput = [];
    logSpy = captureConsole('log', logOutput);
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('prints manual-memo candidates without claiming automatic safety', () => {
    const results: FunctionAnalysis[] = [
      {
        filePath: '/workspace/src/Component.tsx',
        packageName: 'test-pkg',
        line: 5,
        column: 0,
        functionName: 'MyComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        memoStats: { memoSlots: 3, memoBlocks: 1, memoValues: 2, prunedMemoBlocks: 0, prunedMemoValues: 0 },
        manualMemo: { useMemo: 2, useCallback: 1, reactMemo: false, reactMemoHasComparator: false },
        bodyInsertionLine: 6,
      },
      {
        filePath: '/workspace/src/Other.tsx',
        packageName: 'test-pkg',
        line: 10,
        column: 0,
        functionName: 'OtherComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        memoStats: { memoSlots: 1, memoBlocks: 0, memoValues: 1, prunedMemoBlocks: 0, prunedMemoValues: 0 },
        manualMemo: { useMemo: 0, useCallback: 0, reactMemo: true, reactMemoHasComparator: false },
        bodyInsertionLine: 11,
      },
    ];

    printMigrationCandidates(results, '/workspace');

    const output = logOutput.join('\n');
    expect(output).toContain('## Manual Memo Migration Candidates');
    expect(output).toContain(
      '| src/Component.tsx:5 | MyComponent | hook-lowering-review | risk-unassessed | 2 | 1 | no |',
    );
    expect(output).toContain(
      '| src/Other.tsx:10 | OtherComponent | default-wrapper-review | risk-unassessed | 0 | 0 | yes |',
    );
    expect(output).not.toContain('Candidate Legend');
    expect(output).toContain('**2** manual memo migration candidate(s) found');
    expect(output).not.toContain('Safe to Remove');
  });

  it('marks comparator-bearing wrappers for retention', () => {
    const results: FunctionAnalysis[] = [
      {
        filePath: '/workspace/src/Safe.tsx',
        packageName: 'test-pkg',
        line: 5,
        column: 0,
        functionName: 'SafeComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        memoStats: { memoSlots: 2, memoBlocks: 1, memoValues: 1, prunedMemoBlocks: 0, prunedMemoValues: 0 },
        manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false, reactMemoHasComparator: false },
        bodyInsertionLine: 6,
      },
      {
        filePath: '/workspace/src/Comparator.tsx',
        packageName: 'test-pkg',
        line: 8,
        column: 0,
        functionName: 'ComparatorComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        memoStats: { memoSlots: 1, memoBlocks: 0, memoValues: 1, prunedMemoBlocks: 0, prunedMemoValues: 0 },
        manualMemo: { useMemo: 0, useCallback: 0, reactMemo: true, reactMemoHasComparator: true },
        bodyInsertionLine: 9,
      },
    ];

    printMigrationCandidates(results, '/workspace');

    const output = logOutput.join('\n');
    expect(output).toContain(
      '| src/Safe.tsx:5 | SafeComponent | hook-lowering-review | risk-unassessed | 1 | 0 | no |',
    );
    expect(output).toContain(
      '| src/Comparator.tsx:8 | ComparatorComponent | custom-comparator-retain | risk-unassessed | 0 | 0 | yes (comparator) |',
    );
    expect(output).toContain('Retain custom comparators by default');
  });

  it('uses canonical readiness ordering and blockers', () => {
    const results = [
      makeFunctionAnalysis({
        filePath: '/workspace/src/Risky.tsx',
        functionName: 'Risky',
        functionKind: 'component',
        line: 10,
        manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false, reactMemoHasComparator: false },
        risks: [makeRisk()],
      }),
      makeFunctionAnalysis({
        filePath: '/workspace/src/Ready.tsx',
        functionName: 'Ready',
        functionKind: 'component',
        manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false, reactMemoHasComparator: false },
      }),
    ];

    printMigrationCandidates(results, '/workspace', true);

    const output = logOutput.join('\n');
    expect(output).toContain('| src/Ready.tsx:5 | Ready | hook-lowering-review | reviewable |');
    expect(output).toContain('| src/Risky.tsx:10 | Risky | hook-lowering-review | blocked-known-risk |');
    expect(output.indexOf('src/Ready.tsx')).toBeLessThan(output.indexOf('src/Risky.tsx'));
  });

  it('prints nothing when no candidates exist', () => {
    const results: FunctionAnalysis[] = [
      {
        filePath: '/workspace/src/Component.tsx',
        packageName: 'test-pkg',
        line: 5,
        column: 0,
        functionName: 'MyComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        memoStats: { memoSlots: 1, memoBlocks: 0, memoValues: 1, prunedMemoBlocks: 0, prunedMemoValues: 0 },
      },
    ];

    printMigrationCandidates(results, '/workspace');

    expect(logOutput.length).toBe(0);
  });

  it('excludes errored functions with manual memo from candidates', () => {
    const results: FunctionAnalysis[] = [
      {
        filePath: '/workspace/src/Component.tsx',
        packageName: 'test-pkg',
        line: 5,
        column: 0,
        functionName: 'MyComponent',
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'some error',
        manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false, reactMemoHasComparator: false },
        bodyInsertionLine: 6,
      },
    ];

    printMigrationCandidates(results, '/workspace');

    expect(logOutput.length).toBe(0);
  });
});

describe('multi-path coverage reporting', () => {
  let logOutput: string[];
  let logSpy: ReturnType<typeof captureConsole>;

  beforeEach(() => {
    logOutput = [];
    logSpy = captureConsole('log', logOutput);
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('printCoverageReport groups results by package in alphabetical order', () => {
    const results: FunctionAnalysis[] = [
      makeFunctionAnalysis({
        packageName: '@scope/pkg-beta',
        functionName: 'BetaComp',
        filePath: '/workspace/beta/src/B.tsx',
      }),
      makeFunctionAnalysis({
        packageName: '@scope/pkg-alpha',
        functionName: 'AlphaComp',
        filePath: '/workspace/alpha/src/A.tsx',
      }),
    ];

    printCoverageReport(results, '/workspace', false);

    const output = logOutput.join('\n');
    expect(output).toMatchInlineSnapshot(`
      "
      ## @scope/pkg-alpha

      | Status | Count | Percentage |
      |--------|-------|------------|
      | Compiler accepted (memo cache emitted) | 1 | 100.0% |
      | Compiler accepted (no memo cache emitted) | 0 | 0.0% |
      | Manual Memo Migration Candidates | 0 | 0.0% of accepted |
      | Skipped | 0 | 0.0% |
      | Errors | 0 | 0.0% |
      | **Total** | **1** |  |


      ## @scope/pkg-beta

      | Status | Count | Percentage |
      |--------|-------|------------|
      | Compiler accepted (memo cache emitted) | 1 | 100.0% |
      | Compiler accepted (no memo cache emitted) | 0 | 0.0% |
      | Manual Memo Migration Candidates | 0 | 0.0% of accepted |
      | Skipped | 0 | 0.0% |
      | Errors | 0 | 0.0% |
      | **Total** | **1** |  |
      "
    `);
  });

  it('separates accepted functions by whether a memo cache is emitted', () => {
    const results: FunctionAnalysis[] = [
      makeFunctionAnalysis({
        functionName: 'Cached',
        memoStats: { memoSlots: 2, memoBlocks: 1, memoValues: 1, prunedMemoBlocks: 0, prunedMemoValues: 0 },
      }),
      makeFunctionAnalysis({
        functionName: 'Pruned',
        line: 10,
        memoStats: { memoSlots: 0, memoBlocks: 0, memoValues: 0, prunedMemoBlocks: 1, prunedMemoValues: 1 },
      }),
      makeFunctionAnalysis({
        functionName: 'Unreported',
        line: 15,
        memoStats: undefined,
      }),
    ];

    printCoverageReport(results, '/workspace', true);

    const output = logOutput.join('\n');
    expect(output).toContain('### Compiler accepted (memo cache emitted) (1)');
    expect(output).toContain('### Compiler accepted (no memo cache emitted) (1)');
    expect(output).toContain('### Compiler accepted (memo cache not reported) (1)');
    expect(output).toContain('| Compiler accepted (memo cache emitted) | 1 | 33.3% |');
    expect(output).toContain('| Compiler accepted (no memo cache emitted) | 1 | 33.3% |');
    expect(output).toContain('| Compiler accepted (memo cache not reported) | 1 | 33.3% |');
    expect(output).toContain('| Manual Memo Migration Candidates | 0 | 0.0% of accepted |');
    expect(output).toContain('| src/Component.tsx:5 | Cached | 2 | 1 | 1 |');
    expect(output).toContain('| src/Component.tsx:10 | Pruned | 0 | 0 | 0 |');
    expect(output).toContain('| src/Component.tsx:15 | Unreported | unknown | unknown | unknown |');
  });

  it('uses muted HTML styling for accepted functions without emitted memo caches', () => {
    const output: string[] = [];
    printCoverageReportImpl(
      createFormatter('html', line => output.push(line)),
      [
        makeFunctionAnalysis({
          functionName: 'Pruned',
          memoStats: { memoSlots: 0, memoBlocks: 0, memoValues: 0, prunedMemoBlocks: 1, prunedMemoValues: 1 },
        }),
      ],
      '/workspace',
      true,
    );

    const html = output.join('\n');
    expect(html).toContain(
      '<details class="fold" id="test-pkg--compiler-accepted-no-memo-cache-emitted" data-title="Compiler accepted (no memo cache emitted)"',
    );
    expect(html).not.toContain(
      '<details class="fold status-success" id="test-pkg--compiler-accepted-no-memo-cache-emitted"',
    );
  });

  it('printCoverageSummary aggregates counts across multiple packages', () => {
    const results: FunctionAnalysis[] = [
      makeFunctionAnalysis({ packageName: 'pkg-a', status: 'compiled' }),
      makeFunctionAnalysis({
        packageName: 'pkg-b',
        status: 'compiled',
        functionName: 'CompB',
      }),
      makeFunctionAnalysis({
        packageName: 'pkg-b',
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'err',
        functionName: 'CompC',
      }),
    ];

    printCoverageSummary(results, false);

    const output = logOutput.join('\n');
    expect(output).toMatchInlineSnapshot(`
      "## Summary

      | Status | Count | Percentage |
      |--------|-------|------------|
      | Compiler accepted (memo cache emitted) | 2 | 66.7% |
      | Compiler accepted (no memo cache emitted) | 0 | 0.0% |
      | Manual Memo Migration Candidates | 0 | 0.0% of accepted |
      | Skipped | 0 | 0.0% |
      | Errors | 1 | 33.3% |
      | **Total functions** | **3** |  |
      "
    `);
    expect(output).not.toContain('No compiler errors were reported');
  });

  it('summarizes accepted functions by emitted memo-cache outcome', () => {
    const results: FunctionAnalysis[] = [
      makeFunctionAnalysis({
        functionName: 'Cached',
        memoStats: { memoSlots: 2, memoBlocks: 1, memoValues: 1, prunedMemoBlocks: 0, prunedMemoValues: 0 },
      }),
      makeFunctionAnalysis({
        functionName: 'Pruned',
        memoStats: { memoSlots: 0, memoBlocks: 0, memoValues: 0, prunedMemoBlocks: 1, prunedMemoValues: 1 },
      }),
      makeFunctionAnalysis({
        functionName: 'Unreported',
        memoStats: undefined,
      }),
    ];

    printCoverageSummary(results, false);

    const output = logOutput.join('\n');
    expect(output).toContain('| Compiler accepted (memo cache emitted) | 1 | 33.3% |');
    expect(output).toContain('| Compiler accepted (no memo cache emitted) | 1 | 33.3% |');
    expect(output).toContain('| Compiler accepted (memo cache not reported) | 1 | 33.3% |');
    expect(output).not.toContain('will be memoized');
  });

  it('omits the "--verbose" hint in the error summary when already verbose', () => {
    const results: FunctionAnalysis[] = [
      makeFunctionAnalysis({
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'err',
        memoStats: undefined,
      }),
    ];

    printCoverageSummary(results, true);

    const output = logOutput.join('\n');
    expect(output).toContain('**1** function(s) caused compiler errors');
    expect(output).not.toContain('Run with `--verbose`');
  });

  it('renders one package-scoped candidate section per package', () => {
    const results: FunctionAnalysis[] = [
      makeFunctionAnalysis({
        packageName: 'pkg-a',
        functionName: 'CompA',
        filePath: '/workspace/a/src/A.tsx',
        manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false, reactMemoHasComparator: false },
      }),
      makeFunctionAnalysis({
        packageName: 'pkg-b',
        functionName: 'CompB',
        filePath: '/workspace/b/src/B.tsx',
        line: 10,
        manualMemo: { useMemo: 0, useCallback: 1, reactMemo: false, reactMemoHasComparator: false },
      }),
    ];

    printCoverageReport(results, '/workspace', true);

    const output = logOutput.join('\n');
    const legend = output.indexOf('## Candidate Legend');
    const packageA = output.indexOf('## pkg-a');
    const candidateA = output.indexOf('### Manual Memo Migration Candidates (1)', packageA);
    const packageB = output.indexOf('## pkg-b');
    const candidateB = output.indexOf('### Manual Memo Migration Candidates (1)', packageB);

    expect(legend).toBeGreaterThanOrEqual(0);
    expect(legend).toBeLessThan(packageA);
    expect(output.match(/Candidate Legend/g)).toHaveLength(1);
    expect(output).toContain('| Action | hook-lowering-review | Manual useMemo/useCallback detected;');
    expect(output).toContain(
      '| Readiness | risk-unassessed | Runtime-risk analysis was not configured for this run. |',
    );
    expect(packageA).toBeGreaterThanOrEqual(0);
    expect(candidateA).toBeGreaterThan(packageA);
    expect(packageB).toBeGreaterThan(candidateA);
    expect(candidateB).toBeGreaterThan(packageB);
    expect(output.slice(candidateA, packageB)).toContain('| a/src/A.tsx:5 | CompA |');
    expect(output.slice(packageA, packageB)).toContain('| Manual Memo Migration Candidates | 1 | 100.0% of accepted |');
    expect(output.slice(candidateA, packageB)).not.toContain('b/src/B.tsx');
    expect(output.slice(candidateB)).toContain('| b/src/B.tsx:10 | CompB |');
    expect(output.slice(packageB)).toContain('| Manual Memo Migration Candidates | 1 | 100.0% of accepted |');
    expect(output.match(/Manual Memo Migration Candidates \(1\)/g)).toHaveLength(2);
  });

  it('adds HTML titles to candidate Action and Readiness columns and values', () => {
    const analysis = makeFunctionAnalysis({
      manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false, reactMemoHasComparator: false },
    });
    const output: string[] = [];

    printCoverageReportImpl(
      createFormatter('html', line => output.push(line)),
      [analysis],
      '/workspace',
      true,
      candidatesFromAnalyses([analysis], false),
    );

    const html = output.join('\n');
    expect(html).toContain('<th title="Recommended review treatment for the detected manual memoization.">Action</th>');
    expect(html).toContain(
      '<th title="Whether configured risk analysis and source classification allow review to proceed.">Readiness</th>',
    );
    expect(html).toContain(
      '<td title="Manual useMemo/useCallback detected; verify behavior before removing or lowering it.">hook-lowering-review</td>',
    );
    expect(html).toContain('<td title="Runtime-risk analysis was not configured for this run.">risk-unassessed</td>');
  });
});

describe('printCoverageReport — error grouping', () => {
  let logOutput: string[];
  let logSpy: ReturnType<typeof captureConsole>;

  beforeEach(() => {
    logOutput = [];
    logSpy = captureConsole('log', logOutput);
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('groups multiple errors for the same function under one heading', () => {
    const results: FunctionAnalysis[] = [
      makeFunctionAnalysis({
        functionName: 'useThing',
        filePath: '/workspace/src/useThing.ts',
        line: 10,
        column: 0,
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'first problem',
        errorLine: 12,
        errorColumn: 4,
        memoStats: undefined,
      }),
      makeFunctionAnalysis({
        functionName: 'useThing',
        filePath: '/workspace/src/useThing.ts',
        line: 10,
        column: 0,
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'second problem',
        errorLine: 18,
        errorColumn: 2,
        memoStats: undefined,
      }),
    ];

    printCoverageReport(results, '/workspace', true);

    const output = logOutput.join('\n');
    // The function heading appears exactly once with the error count.
    expect(output).toContain('#### src/useThing.ts:10 — useThing (2 errors)');
    expect(output.match(/— useThing/g)).toHaveLength(1);
    // Each error gets its own Line cell so the rows are distinguishable.
    expect(output).toContain('| Line | Compiler Event | Reason |');
    expect(output).toContain('| 12:4 | CompileError | first problem |');
    expect(output).toContain('| 18:2 | CompileError | second problem |');
  });

  it('inlines full code-framed diagnostics under the error group with --verbose', () => {
    const results: FunctionAnalysis[] = [
      makeFunctionAnalysis({
        functionName: 'useThing',
        filePath: '/workspace/src/useThing.ts',
        line: 10,
        column: 0,
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'cannot modify',
        fullReason: '  > 50 | state.x = 1;\n       | ^^^ cannot modify',
        memoStats: undefined,
      }),
    ];

    printCoverageReport(results, '/workspace', true);

    const output = logOutput.join('\n');
    expect(output).toContain('#### src/useThing.ts:10 — useThing (1 error)');
    // Full diagnostic is inlined as a code block right below the group, not in a separate
    // "Full compiler output" details section.
    expect(output).toContain('> 50 | state.x = 1;');
    expect(output).not.toContain('Full compiler output');
  });

  it('counts distinct functions (not error occurrences) in the summary and package table', () => {
    const erroredTwice = [
      makeFunctionAnalysis({
        functionName: 'useThing',
        filePath: '/workspace/src/useThing.ts',
        line: 10,
        column: 0,
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'first problem',
        memoStats: undefined,
      }),
      makeFunctionAnalysis({
        functionName: 'useThing',
        filePath: '/workspace/src/useThing.ts',
        line: 10,
        column: 0,
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'second problem',
        memoStats: undefined,
      }),
    ];
    const compiledOne = makeFunctionAnalysis({
      functionName: 'useOk',
      filePath: '/workspace/src/useOk.ts',
      line: 3,
      column: 0,
      status: 'compiled',
    });

    const results: FunctionAnalysis[] = [...erroredTwice, compiledOne];

    // Package table: 1 compiled + 1 errored function = 2 total (not 3 rows).
    printCoverageReport(results, '/workspace', false);
    const reportOutput = logOutput.join('\n');
    expect(reportOutput).toContain('| Errors | 1 | 50.0% |');
    expect(reportOutput).toContain('| **Total** | **2** |  |');

    // Summary callout: 1 function, not 2 error occurrences.
    logOutput.length = 0;
    printCoverageSummary(results, false);
    const summaryOutput = logOutput.join('\n');
    expect(summaryOutput).toContain('| Errors | 1 | 50.0% |');
    expect(summaryOutput).not.toContain('function(s) caused compiler errors');
  });
});

describe('printUnparseableFiles', () => {
  let logOutput: string[];
  let logSpy: ReturnType<typeof captureConsole>;

  beforeEach(() => {
    logOutput = [];
    logSpy = captureConsole('log', logOutput);
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('prints nothing when every file parsed', () => {
    printUnparseableFilesImpl(createFormatter('md'), [], '/workspace');
    expect(logOutput.join('\n')).toBe('');
  });

  it('lists each rejected file with a workspace-relative path and reason', () => {
    printUnparseableFilesImpl(
      createFormatter('md'),
      [
        {
          file: '/workspace/src/Legacy.tsx',
          error: "/workspace/src/Legacy.tsx: Support for 'decorators' isn't enabled (9:1)",
        },
      ],
      '/workspace',
    );

    const output = logOutput.join('\n');
    expect(output).toContain('Not Analyzed');
    expect(output).toContain('src/Legacy.tsx');
    expect(output).toContain("Support for 'decorators' isn't enabled (9:1)");
    // The absolute path Babel prefixes onto the message is noise in a table cell.
    expect(output).not.toContain('/workspace/src/Legacy.tsx:');
  });

  it('reports the count in the summary so it is visible without expanding', () => {
    printCoverageSummaryImpl(createFormatter('md'), [makeFunctionAnalysis({})], false, 3);
    expect(logOutput.join('\n')).toContain('| Not analyzed | 3 file(s) | n/a |');
  });

  it('omits the summary line when nothing was skipped', () => {
    printCoverageSummaryImpl(createFormatter('md'), [makeFunctionAnalysis({})], false, 0);
    expect(logOutput.join('\n')).not.toContain('Not analyzed');
  });
});

describe('printRuntimeRisks', () => {
  let logOutput: string[];
  let logSpy: ReturnType<typeof captureConsole>;

  beforeEach(() => {
    logOutput = [];
    logSpy = captureConsole('log', logOutput);
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('prints nothing when no result carries a risk', () => {
    printRuntimeRisks([makeFunctionAnalysis({})], '/workspace');
    expect(logOutput.join('\n')).toBe('');
  });

  it('lists compiled risky functions under "Compiled but Risky"', () => {
    printRuntimeRisks([makeFunctionAnalysis({ risks: [makeRisk()] })], '/workspace');
    const output = logOutput.join('\n');
    expect(output).toContain('Compiled but Risky');
    expect(output).not.toContain('Risky but Not Compiled');
    expect(output).toContain('src/Component.tsx:7');
  });

  it('separates risky functions that did not compile into their own section', () => {
    printRuntimeRisks(
      [
        makeFunctionAnalysis({
          functionName: 'ErroredRisky',
          status: 'error',
          compilerEvent: 'CompileError',
          memoStats: undefined,
          risks: [makeRisk()],
        }),
      ],
      '/workspace',
    );
    const output = logOutput.join('\n');
    expect(output).toContain('Risky but Not Compiled');
    expect(output).toContain('not hazardous yet');
    expect(output).not.toContain('Compiled but Risky');
  });

  it('renders both sections when compiled and non-compiled risks coexist', () => {
    printRuntimeRisks(
      [
        makeFunctionAnalysis({ functionName: 'CompiledRisky', risks: [makeRisk()] }),
        makeFunctionAnalysis({
          functionName: 'SkippedRisky',
          status: 'skipped',
          compilerEvent: 'CompileSkip',
          memoStats: undefined,
          risks: [makeRisk({ severity: 'medium' })],
        }),
      ],
      '/workspace',
    );
    const output = logOutput.join('\n');
    expect(output).toContain('Compiled but Risky');
    expect(output).toContain('Risky but Not Compiled');
    expect(output).toContain('**1** runtime-risk finding(s) across **1** compiled function(s).');
    expect(output).toContain('**1** runtime-risk finding(s) across **1** non-compiled function(s).');
  });

  it('gives directive-suppressed risks their own section', () => {
    printRuntimeRisks(
      [
        makeFunctionAnalysis({
          functionName: 'Guarded',
          status: 'skipped',
          compilerEvent: 'CompileSkip',
          memoStats: undefined,
          existingDirectives: { useMemo: false, useNoMemo: true },
          risks: [makeRisk()],
        }),
      ],
      '/workspace',
    );
    const output = logOutput.join('\n');
    expect(output).toContain("Suppressed by 'use no memo'");
    expect(output).not.toContain('Risky but Not Compiled');
    expect(output).toContain('**1** runtime-risk finding(s) across **1** opted-out function(s).');
  });

  it('keeps an uncompiled risk without a directive out of the suppressed section', () => {
    printRuntimeRisks(
      [
        makeFunctionAnalysis({
          functionName: 'ErroredRisky',
          status: 'error',
          compilerEvent: 'CompileError',
          memoStats: undefined,
          risks: [makeRisk()],
        }),
      ],
      '/workspace',
    );
    const output = logOutput.join('\n');
    expect(output).toContain('Risky but Not Compiled');
    expect(output).not.toContain("Suppressed by 'use no memo'");
  });
});
