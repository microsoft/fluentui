import {
  printCoverageReport as printCoverageReportImpl,
  printCoverageSummary as printCoverageSummaryImpl,
  printMigrationCandidates as printMigrationCandidatesImpl,
} from '../coverage-reporter';
import { createFormatter } from '../formatter';
import type { FunctionAnalysis } from '../types';

/** Render via the markdown formatter so existing snapshots stay stable. */
function printCoverageReport(
  results: FunctionAnalysis[],
  workspaceRoot: string,
  verbose: boolean,
  fullReasons: boolean,
): void {
  printCoverageReportImpl(createFormatter('md'), results, workspaceRoot, verbose, fullReasons);
}

/** Render via the markdown formatter so existing snapshots stay stable. */
function printCoverageSummary(results: FunctionAnalysis[], verbose: boolean): void {
  printCoverageSummaryImpl(createFormatter('md'), results, verbose);
}

/** Render via the markdown formatter so existing snapshots stay stable. */
function printMigrationCandidates(results: FunctionAnalysis[], workspaceRoot: string): void {
  printMigrationCandidatesImpl(createFormatter('md'), results, workspaceRoot);
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
  const originalLog = console.log;

  beforeEach(() => {
    logOutput = [];
    console.log = (...args: unknown[]) => {
      logOutput.push(args.join(' '));
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  it('prints safe-to-remove candidates in a table', () => {
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
    expect(output).toContain('## Migration Candidates');
    expect(output).toContain('### Safe to Remove');
    expect(output).toContain('| src/Component.tsx:5 | MyComponent | 2 | 1 | no | 3 |');
    expect(output).toContain('| src/Other.tsx:10 | OtherComponent | 0 | 0 | yes | 1 |');
    expect(output).toContain('**2** migration candidate(s) found');
    expect(output).not.toContain('### Needs Manual Review');
  });

  it('prints needs-review candidates separately when comparator is present', () => {
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
    expect(output).toContain('### Safe to Remove');
    expect(output).toContain('| src/Safe.tsx:5 | SafeComponent | 1 | 0 | no | 2 |');
    expect(output).toContain('### Needs Manual Review');
    expect(output).toContain('| src/Comparator.tsx:8 | ComparatorComponent | 0 | 0 | yes (comparator) | 1 |');
    expect(output).toContain('**2** migration candidate(s) found');
    expect(output).toContain('**1** need manual review due to custom comparator');
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
  const originalLog = console.log;

  beforeEach(() => {
    logOutput = [];
    console.log = (...args: unknown[]) => {
      logOutput.push(args.join(' '));
    };
  });

  afterEach(() => {
    console.log = originalLog;
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

    printCoverageReport(results, '/workspace', false, false);

    const output = logOutput.join('\n');
    expect(output).toMatchInlineSnapshot(`
      "
      ## @scope/pkg-alpha

      | Status | Count | Percentage |
      |--------|-------|------------|
      | Compiled | 1 | 100.0% |
      | Skipped | 0 | 0.0% |
      | Errors | 0 | 0.0% |
      | **Total** | **1** |  |


      ## @scope/pkg-beta

      | Status | Count | Percentage |
      |--------|-------|------------|
      | Compiled | 1 | 100.0% |
      | Skipped | 0 | 0.0% |
      | Errors | 0 | 0.0% |
      | **Total** | **1** |  |
      "
    `);
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

      - **Total functions analyzed:** 3
      - **Compiled** (will be memoized): 2 (66.7%)
        - Migration candidates (has manual memoization): 0
        - Compiler-ready (no manual memoization): 2
      - **Skipped** (opted out or not a component/hook): 0 (0.0%)
      - **Errors** (compiler bailout): 1 (33.3%)

      > **1** function(s) caused compiler errors — these won't be optimized until the patterns are refactored.
      > Run with \`--verbose\` to see per-function details.
      "
    `);
    expect(output).not.toContain('All recognized functions compile successfully');
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

  it('printMigrationCandidates includes candidates from multiple packages', () => {
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

    printMigrationCandidates(results, '/workspace');

    const output = logOutput.join('\n');
    expect(output).toMatchInlineSnapshot(`
      "## Migration Candidates (2)

      Functions that compile successfully and contain manual memoization. These can safely use \`'use memo'\` and may have their manual hooks removed.

      ### Safe to Remove

      \`useMemo\`/\`useCallback\` hooks and \`React.memo\` wrappers (without comparator) are redundant after compiler adoption and can be removed.

      | Location | Function | useMemo | useCallback | React.memo | Memo Slots |
      |----------|----------|---------|-------------|------------|------------|
      | a/src/A.tsx:5 | CompA | 1 | 0 | no | 2 |
      | b/src/B.tsx:10 | CompB | 0 | 1 | no | 2 |

      > **2** migration candidate(s) found
      "
    `);
    expect(output).not.toContain('Needs Manual Review');
  });
});

describe('printCoverageReport — error grouping', () => {
  let logOutput: string[];
  const originalLog = console.log;

  beforeEach(() => {
    logOutput = [];
    console.log = (...args: unknown[]) => {
      logOutput.push(args.join(' '));
    };
  });

  afterEach(() => {
    console.log = originalLog;
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

    printCoverageReport(results, '/workspace', true, false);

    const output = logOutput.join('\n');
    // The function heading appears exactly once with the error count.
    expect(output).toContain('#### src/useThing.ts:10 — useThing (2 errors)');
    expect(output.match(/— useThing/g)).toHaveLength(1);
    // Each error gets its own Line cell so the rows are distinguishable.
    expect(output).toContain('| Line | Compiler Event | Reason |');
    expect(output).toContain('| 12:4 | CompileError | first problem |');
    expect(output).toContain('| 18:2 | CompileError | second problem |');
  });

  it('inlines full code-framed diagnostics under the error group with --full-reasons', () => {
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

    printCoverageReport(results, '/workspace', true, true);

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
    printCoverageReport(results, '/workspace', false, false);
    const reportOutput = logOutput.join('\n');
    expect(reportOutput).toContain('| Errors | 1 | 50.0% |');
    expect(reportOutput).toContain('| **Total** | **2** |  |');

    // Summary callout: 1 function, not 2 error occurrences.
    logOutput.length = 0;
    printCoverageSummary(results, false);
    const summaryOutput = logOutput.join('\n');
    expect(summaryOutput).toContain('- **Errors** (compiler bailout): 1 (50.0%)');
    expect(summaryOutput).toContain('**1** function(s) caused compiler errors');
  });
});
