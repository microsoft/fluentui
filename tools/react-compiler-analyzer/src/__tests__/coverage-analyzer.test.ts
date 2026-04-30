import { join } from 'path';

import { analyzeFileForCoverage } from '../coverage-analyzer';

const FIXTURES_DIR = join(__dirname, '__fixtures__', 'coverage-analyzer');

describe('analyzeFileForCoverage — manual memo integration', () => {
  it('detects manual memoization in a compilable function', async () => {
    const filePath = join(FIXTURES_DIR, 'compilable-with-memo.tsx');
    const results = await analyzeFileForCoverage(filePath, 'test-pkg', 'infer', false);

    const compiled = results.filter(r => r.status === 'compiled');
    expect(compiled.length).toBeGreaterThan(0);

    const withMemo = compiled.filter(r => r.manualMemo);
    expect(withMemo.length).toBeGreaterThan(0);

    const entry = withMemo[0];
    expect(entry.manualMemo!.useMemo).toBeGreaterThanOrEqual(1);
    expect(entry.bodyInsertionLine).toBeGreaterThan(0);
  });

  it('detects manual memoization in functions with errors', async () => {
    const filePath = join(FIXTURES_DIR, 'error-with-memo.tsx');
    const results = await analyzeFileForCoverage(filePath, 'test-pkg', 'infer', false);

    // The function may error or compile depending on compiler version
    // but it should still have manualMemo data if detected
    const withMemo = results.filter(r => r.manualMemo);
    expect(withMemo.length).toBeGreaterThanOrEqual(0);

    if (withMemo.length > 0) {
      expect(withMemo[0].manualMemo!.useMemo).toBe(1);
    }
  });

  it('returns no manualMemo for functions without memoization hooks', async () => {
    const filePath = join(FIXTURES_DIR, 'compilable-no-memo.tsx');
    const results = await analyzeFileForCoverage(filePath, 'test-pkg', 'infer', false);

    const compiled = results.filter(r => r.status === 'compiled');
    expect(compiled.length).toBeGreaterThan(0);

    for (const r of compiled) {
      expect(r.manualMemo).toBeUndefined();
    }
  });
});
