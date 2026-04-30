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

  it('prints migration candidates table when candidates exist', () => {
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
        manualMemo: { useMemo: 2, useCallback: 1, reactMemo: false },
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
        manualMemo: { useMemo: 0, useCallback: 0, reactMemo: true },
        bodyInsertionLine: 11,
      },
    ];

    printMigrationCandidates(results, '/workspace');

    const output = logOutput.join('\n');
    expect(output).toContain('## Migration Candidates');
    expect(output).toContain('| src/Component.tsx:5 | MyComponent | 2 | 1 | no | 3 |');
    expect(output).toContain('| src/Other.tsx:10 | OtherComponent | 0 | 0 | yes | 1 |');
    expect(output).toContain('**2** migration candidate(s) found.');
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
        manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false },
        bodyInsertionLine: 6,
      },
    ];

    printMigrationCandidates(results, '/workspace');

    expect(logOutput.length).toBe(0);
  });
});
