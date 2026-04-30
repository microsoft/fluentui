import { mkdtempSync, readFileSync, cpSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

import { applyAnnotations } from '../coverage-fixer';
import type { FunctionAnalysis } from '../types';

const FIXTURES_DIR = join(__dirname, '__fixtures__', 'annotate');

function createTempFixture(fixtureName: string): string {
  const tempDir = mkdtempSync(join(tmpdir(), `annotate-test-${fixtureName}-`));
  const inputPath = join(FIXTURES_DIR, fixtureName, 'input.tsx');
  const destPath = join(tempDir, 'input.tsx');
  cpSync(inputPath, destPath);
  return destPath;
}

function makeAnalysis(filePath: string, line: number, bodyInsertionLine: number): FunctionAnalysis {
  return {
    filePath,
    packageName: 'test-pkg',
    line,
    column: 0,
    functionName: 'TestComponent',
    status: 'compiled',
    compilerEvent: 'CompileSuccess',
    manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false },
    bodyInsertionLine,
  };
}

describe('applyAnnotations', () => {
  it('inserts use memo into a single function', async () => {
    const filePath = createTempFixture('single-function');
    const results: FunctionAnalysis[] = [makeAnalysis(filePath, 3, 4)];

    const outcome = await applyAnnotations(results);

    expect(outcome.filesModified).toBe(1);
    expect(outcome.functionsAnnotated).toBe(1);

    const actual = readFileSync(filePath, 'utf-8');
    const expected = readFileSync(join(FIXTURES_DIR, 'single-function', 'output.tsx'), 'utf-8');
    expect(actual).toBe(expected);
  });

  it('inserts use memo into multiple functions', async () => {
    const filePath = createTempFixture('multiple-functions');
    const results: FunctionAnalysis[] = [
      makeAnalysis(filePath, 3, 4),
      {
        ...makeAnalysis(filePath, 8, 9),
        manualMemo: { useMemo: 0, useCallback: 1, reactMemo: false },
      },
    ];

    const outcome = await applyAnnotations(results);

    expect(outcome.filesModified).toBe(1);
    expect(outcome.functionsAnnotated).toBe(2);

    const actual = readFileSync(filePath, 'utf-8');
    const expected = readFileSync(join(FIXTURES_DIR, 'multiple-functions', 'output.tsx'), 'utf-8');
    expect(actual).toBe(expected);
  });

  it('inserts use memo into arrow functions', async () => {
    const filePath = createTempFixture('arrow-function');
    const results: FunctionAnalysis[] = [makeAnalysis(filePath, 3, 4)];

    const outcome = await applyAnnotations(results);

    expect(outcome.filesModified).toBe(1);
    expect(outcome.functionsAnnotated).toBe(1);

    const actual = readFileSync(filePath, 'utf-8');
    const expected = readFileSync(join(FIXTURES_DIR, 'arrow-function', 'output.tsx'), 'utf-8');
    expect(actual).toBe(expected);
  });

  it('skips functions that already have use memo directive', async () => {
    const filePath = createTempFixture('already-annotated');
    const results: FunctionAnalysis[] = [makeAnalysis(filePath, 3, 4)];

    const outcome = await applyAnnotations(results);

    expect(outcome.filesModified).toBe(0);
    expect(outcome.functionsAnnotated).toBe(0);

    const actual = readFileSync(filePath, 'utf-8');
    const expected = readFileSync(join(FIXTURES_DIR, 'already-annotated', 'output.tsx'), 'utf-8');
    expect(actual).toBe(expected);
  });

  it('returns zeros when no candidates exist', async () => {
    const results: FunctionAnalysis[] = [
      {
        filePath: '/nonexistent/file.tsx',
        packageName: 'test-pkg',
        line: 1,
        column: 0,
        functionName: 'Foo',
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'some error',
      },
    ];

    const outcome = await applyAnnotations(results);
    expect(outcome.filesModified).toBe(0);
    expect(outcome.functionsAnnotated).toBe(0);
  });
});
