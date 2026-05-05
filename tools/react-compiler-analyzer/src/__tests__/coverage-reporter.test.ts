import { printMigrationCandidates } from '../coverage-reporter';
import type { FunctionAnalysis } from '../types';

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
