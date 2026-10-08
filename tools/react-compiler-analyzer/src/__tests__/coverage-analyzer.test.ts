import { join } from 'path';

import { compileFile } from '../compiler';
import { deriveCompilerAnalysis, deriveCoverage } from '../coverage-analyzer';
import type { FileEntry } from '../types';

const FIXTURES_DIR = join(__dirname, '__fixtures__', 'coverage-analyzer');

async function analyzeFixture(fileName: string) {
  const filePath = join(FIXTURES_DIR, fileName);
  const entry: FileEntry = { filePath, packageName: 'test-pkg' };
  const compiled = await compileFile(entry, 'infer', false);
  return deriveCoverage(compiled);
}

describe('deriveCoverage — manual memo integration', () => {
  it('does not silently discard an unattributed compiler failure', async () => {
    const filePath = join(FIXTURES_DIR, 'compilable-no-memo.tsx');
    const compiled = await compileFile({ filePath, packageName: 'test-pkg' }, 'infer', false);
    const failed = {
      ...compiled,
      events: [...compiled.events, { kind: 'PipelineError', fnLoc: null, data: 'pipeline crashed' }],
    };

    expect(deriveCompilerAnalysis(failed).unattributedErrors).toMatchObject([
      { kind: 'PipelineError', reason: 'pipeline crashed' },
    ]);
    expect(() => deriveCoverage(failed)).toThrow(/PipelineError: pipeline crashed/);
  });

  it('distinguishes a rejected parser input from a transform failure', async () => {
    const filePath = join(FIXTURES_DIR, 'compilable-no-memo.tsx');
    const compiled = await compileFile({ filePath, packageName: 'test-pkg' }, 'infer', false);
    expect(() => deriveCoverage({ ...compiled, error: new Error('plugin crashed') })).toThrow(
      /Compiler failed .* plugin crashed/,
    );

    const parseError = Object.assign(new Error('invalid syntax'), { code: 'BABEL_PARSE_ERROR' });
    expect(deriveCoverage({ ...compiled, error: parseError })).toEqual([]);
  });

  it('detects manual memoization in a compilable function', async () => {
    const results = await analyzeFixture('compilable-with-memo.tsx');

    const compiled = results.filter(r => r.status === 'compiled');
    expect(compiled.length).toBeGreaterThan(0);

    const withMemo = compiled.filter(r => r.manualMemo);
    expect(withMemo.length).toBeGreaterThan(0);

    const entry = withMemo[0];
    expect(entry.manualMemo!.useMemo).toBeGreaterThanOrEqual(1);
    expect(entry.bodyInsertionLine).toBeGreaterThan(0);
  });

  it('detects manual memoization in functions with errors', async () => {
    const results = await analyzeFixture('error-with-memo.tsx');

    expect(results.find(result => result.functionName === 'ErrorWithMemo')).toMatchObject({
      status: 'error',
      compilerEvent: 'CompileError',
      manualMemo: { useMemo: 1 },
    });
  });

  it('returns no manualMemo for functions without memoization hooks', async () => {
    const results = await analyzeFixture('compilable-no-memo.tsx');

    const compiled = results.filter(r => r.status === 'compiled');
    expect(compiled.length).toBeGreaterThan(0);

    for (const r of compiled) {
      expect(r.manualMemo).toBeUndefined();
    }
  });

  it('detects reactMemoHasComparator for React.memo with custom comparator', async () => {
    const results = await analyzeFixture('memo-with-comparator.tsx');

    const withMemo = results.filter(r => r.manualMemo?.reactMemo);
    expect(withMemo.length).toBeGreaterThan(0);

    // Compiler compiles the wrapped function body, but React.memo with a custom
    // comparator cannot simply be removed — the comparator provides custom equality logic.
    const entry = withMemo[0];
    expect(entry.status).toBe('compiled');
    expect(entry.manualMemo!.reactMemo).toBe(true);
    expect(entry.manualMemo!.reactMemoHasComparator).toBe(true);
  });
});
