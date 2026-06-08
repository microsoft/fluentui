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
      - **Skipped** (not a component/hook): 0 (0.0%)
      - **Errors** (compiler bailout): 1 (33.3%)

      > **1** function(s) caused compiler errors — these won't be optimized until the patterns are refactored.
      > Run with \`--verbose\` to see per-function details.
      "
    `);
    expect(output).not.toContain('All recognized functions compile successfully');
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
      "## Migration Candidates

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
