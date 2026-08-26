import { mkdtempSync, readFileSync, cpSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

import { compileFile } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import type { FunctionAnalysis, AnnotateMode } from '../types';

const FIXTURES_DIR = join(__dirname, '__fixtures__', 'annotate');

function createTempFixture(fixtureName: string): string {
  const tempDir = mkdtempSync(join(tmpdir(), `annotate-test-${fixtureName}-`));
  const inputPath = join(FIXTURES_DIR, fixtureName, 'input.tsx');
  const destPath = join(tempDir, 'input.tsx');
  cpSync(inputPath, destPath);
  return destPath;
}

/** Derive analyses the way the CLI does, so `existingDirectives` reflects the real AST. */
async function analyzeReal(filePath: string): Promise<FunctionAnalysis[]> {
  const compiled = await compileFile({ filePath, packageName: 'test-pkg' }, 'infer', false);
  return deriveCoverage(compiled);
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
    manualMemo: { useMemo: 1, useCallback: 0, reactMemo: false, reactMemoHasComparator: false },
    bodyInsertionLine,
  };
}

describe('applyAnnotations', () => {
  it('inserts use memo into a single function', async () => {
    const filePath = createTempFixture('single-function');
    const results: FunctionAnalysis[] = [makeAnalysis(filePath, 3, 4)];

    const outcome = await applyAnnotations(results, 'manual-memo');

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
        manualMemo: { useMemo: 0, useCallback: 1, reactMemo: false, reactMemoHasComparator: false },
      },
    ];

    const outcome = await applyAnnotations(results, 'manual-memo');

    expect(outcome.filesModified).toBe(1);
    expect(outcome.functionsAnnotated).toBe(2);

    const actual = readFileSync(filePath, 'utf-8');
    const expected = readFileSync(join(FIXTURES_DIR, 'multiple-functions', 'output.tsx'), 'utf-8');
    expect(actual).toBe(expected);
  });

  it('inserts use memo into arrow functions', async () => {
    const filePath = createTempFixture('arrow-function');
    const results: FunctionAnalysis[] = [makeAnalysis(filePath, 3, 4)];

    const outcome = await applyAnnotations(results, 'manual-memo');

    expect(outcome.filesModified).toBe(1);
    expect(outcome.functionsAnnotated).toBe(1);

    const actual = readFileSync(filePath, 'utf-8');
    const expected = readFileSync(join(FIXTURES_DIR, 'arrow-function', 'output.tsx'), 'utf-8');
    expect(actual).toBe(expected);
  });

  it('skips functions that already have use memo directive', async () => {
    const filePath = createTempFixture('already-annotated');

    const outcome = await applyAnnotations(await analyzeReal(filePath), 'manual-memo');

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

    const outcome = await applyAnnotations(results, 'manual-memo');
    expect(outcome.filesModified).toBe(0);
    expect(outcome.functionsAnnotated).toBe(0);
  });

  it("'all' mode annotates compilable functions without manual memoization", async () => {
    const filePath = createTempFixture('compilable-no-memo');
    const results: FunctionAnalysis[] = [
      {
        filePath,
        packageName: 'test-pkg',
        line: 4,
        column: 0,
        functionName: 'RegularComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 5,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 10,
        column: 40,
        functionName: 'ArrowComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 11,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 20,
        column: 0,
        functionName: 'useCounter',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 21,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 27,
        column: 0,
        functionName: 'MultiHookComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 28,
      },
    ];

    const outcome = await applyAnnotations(results, 'all');

    expect(outcome.filesModified).toBe(1);
    expect(outcome.functionsAnnotated).toBe(4);

    const actual = readFileSync(filePath, 'utf-8');
    const expected = readFileSync(join(FIXTURES_DIR, 'compilable-no-memo', 'output.tsx'), 'utf-8');
    expect(actual).toBe(expected);
  });

  it("'all' mode skips non-compiled functions mixed with compilable ones", async () => {
    const filePath = createTempFixture('compilable-no-memo');
    const results: FunctionAnalysis[] = [
      {
        filePath,
        packageName: 'test-pkg',
        line: 4,
        column: 0,
        functionName: 'RegularComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 5,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 10,
        column: 40,
        functionName: 'ArrowComponent',
        status: 'error',
        compilerEvent: 'CompileError',
        reason: 'some error',
        bodyInsertionLine: 11,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 20,
        column: 0,
        functionName: 'useCounter',
        status: 'skipped',
        compilerEvent: 'CompileSkip',
        bodyInsertionLine: 21,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 27,
        column: 0,
        functionName: 'MultiHookComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 28,
      },
    ];

    const outcome = await applyAnnotations(results, 'all');

    // Only the 2 compiled functions should be annotated
    expect(outcome.filesModified).toBe(1);
    expect(outcome.functionsAnnotated).toBe(2);

    const actual = readFileSync(filePath, 'utf-8');
    expect(actual).toContain("export function RegularComponent() {\n  'use memo';");
    expect(actual).toContain("export function MultiHookComponent({ id }: { id: string }) {\n  'use memo';");
    // Error and skipped functions should NOT have 'use memo'
    expect(actual).not.toContain("ArrowComponent = ({ label }: { label: string }) => {\n  'use memo';");
    expect(actual).not.toContain("export function useCounter(initial: number) {\n  'use memo';");
  });

  it("'manual-memo' mode skips compilable functions without manual memoization", async () => {
    const filePath = createTempFixture('compilable-no-memo');
    const results: FunctionAnalysis[] = [
      {
        filePath,
        packageName: 'test-pkg',
        line: 4,
        column: 0,
        functionName: 'RegularComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 5,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 10,
        column: 40,
        functionName: 'ArrowComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 11,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 20,
        column: 0,
        functionName: 'useCounter',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 21,
      },
      {
        filePath,
        packageName: 'test-pkg',
        line: 27,
        column: 0,
        functionName: 'MultiHookComponent',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        bodyInsertionLine: 28,
      },
    ];

    const outcome = await applyAnnotations(results, 'manual-memo');

    expect(outcome.filesModified).toBe(0);
    expect(outcome.functionsAnnotated).toBe(0);

    // File should remain unchanged
    const actual = readFileSync(filePath, 'utf-8');
    const input = readFileSync(join(FIXTURES_DIR, 'compilable-no-memo', 'input.tsx'), 'utf-8');
    expect(actual).toBe(input);
  });

  it('is idempotent — skips already-annotated functions in all mode regardless of quote style', async () => {
    const filePath = createTempFixture('already-annotated-all-mode');
    const results = await analyzeReal(filePath);

    // First run — nothing should be inserted (both already annotated)
    const first = await applyAnnotations(results, 'all');
    expect(first.filesModified).toBe(0);
    expect(first.functionsAnnotated).toBe(0);

    const actual = readFileSync(filePath, 'utf-8');
    const expected = readFileSync(join(FIXTURES_DIR, 'already-annotated-all-mode', 'output.tsx'), 'utf-8');
    expect(actual).toBe(expected);

    // Second run — still idempotent
    const second = await applyAnnotations(results, 'all');
    expect(second.filesModified).toBe(0);
    expect(second.functionsAnnotated).toBe(0);
  });

  it("does not add 'use memo' to a function that already opts out", async () => {
    const filePath = createTempFixture('existing-no-memo');
    const results = await analyzeReal(filePath);

    const outcome = await applyAnnotations(results, 'all');

    expect(outcome.functionsAnnotated).toBe(0);
    expect(outcome.filesModified).toBe(0);
    const actual = readFileSync(filePath, 'utf-8');
    expect(actual).not.toContain('use memo');
    expect(actual).toBe(readFileSync(join(FIXTURES_DIR, 'existing-no-memo', 'output.tsx'), 'utf-8'));
  });

  it('annotates a function whose neighbour carries the directive', async () => {
    // The previous text-window check looked +/- a few lines and would see the *next* function's
    // directive, silently skipping this one.
    const filePath = createTempFixture('directive-on-neighbour');
    const results = await analyzeReal(filePath);

    const outcome = await applyAnnotations(results, 'all');

    expect(outcome.functionsAnnotated).toBe(1);
    const actual = readFileSync(filePath, 'utf-8');
    expect(actual).toBe(readFileSync(join(FIXTURES_DIR, 'directive-on-neighbour', 'output.tsx'), 'utf-8'));
  });

  describe('--quote', () => {
    it('emits double-quoted directives when asked', async () => {
      const filePath = createTempFixture('single-function');
      const outcome = await applyAnnotations(await analyzeReal(filePath), 'all', { quote: 'double' });

      expect(outcome.functionsAnnotated).toBe(1);
      expect(readFileSync(filePath, 'utf-8')).toContain('"use memo";');
    });

    it('stays idempotent across quote styles', async () => {
      const filePath = createTempFixture('single-function');
      await applyAnnotations(await analyzeReal(filePath), 'all', { quote: 'double' });

      // Re-analyze: the file now carries a double-quoted directive. A single-quoted run must
      // recognize it rather than inserting a second one.
      const second = await applyAnnotations(await analyzeReal(filePath), 'all', { quote: 'single' });

      expect(second.functionsAnnotated).toBe(0);
      expect(readFileSync(filePath, 'utf-8').match(/use memo/g)).toHaveLength(1);
    });
  });
});

describe("applyAnnotations — 'all-safe' mode", () => {
  function writeTemp(content: string): string {
    const tempDir = mkdtempSync(join(tmpdir(), 'annotate-all-safe-'));
    const filePath = join(tempDir, 'input.tsx');
    writeFileSync(filePath, content);
    return filePath;
  }

  const SOURCE = [
    'export function Safe() {', // 1
    '  const a = 1;', //          2  ← body insertion
    '  const b = 2;', //          3
    '  return <div>{a + b}</div>;', // 4
    '}', //                       5
    '', //                        6
    '', //                        7
    'export function Risky() {', // 8
    '  const id = getAppStore().getState().id;', // 9  ← body insertion
    '  return <div>{id}</div>;', // 10
    '}', //                       11
    '',
  ].join('\n');

  function safeFn(filePath: string): FunctionAnalysis {
    return {
      filePath,
      packageName: 'test-pkg',
      line: 1,
      column: 0,
      functionName: 'Safe',
      status: 'compiled',
      compilerEvent: 'CompileSuccess',
      bodyInsertionLine: 2,
    };
  }

  function riskyFn(filePath: string): FunctionAnalysis {
    return {
      filePath,
      packageName: 'test-pkg',
      line: 8,
      column: 0,
      functionName: 'Risky',
      status: 'compiled',
      compilerEvent: 'CompileSuccess',
      bodyInsertionLine: 9,
      risks: [
        {
          ruleId: 'nonreactive-store-read',
          severity: 'high',
          line: 9,
          column: 13,
          symbol: 'getAppStore.getState',
          message: 'imperative store snapshot via `.getState()` …',
        },
      ],
    };
  }

  it("annotates safe functions with 'use memo' and bails out risky ones with justified 'use no memo'", async () => {
    const filePath = writeTemp(SOURCE);
    const outcome = await applyAnnotations([safeFn(filePath), riskyFn(filePath)], 'all-safe');

    expect(outcome.filesModified).toBe(1);
    expect(outcome.functionsAnnotated).toBe(1);
    expect(outcome.functionsBailedOut).toBe(1);

    const actual = readFileSync(filePath, 'utf-8');
    expect(actual).toContain("export function Safe() {\n  'use memo';");
    expect(actual).toMatch(
      /export function Risky\(\) \{\n {2}'use no memo'; \/\/ justified: nonreactive-store-read risk via getAppStore\.getState/,
    );
    // The risky function must NOT receive 'use memo'.
    expect(actual).not.toContain("export function Risky() {\n  'use memo';");
  });

  it('ignores risks on functions that did not compile', async () => {
    const filePath = writeTemp(SOURCE);
    // Risk findings now attach to non-compiled functions too; they must not be annotated.
    const notCompiled: FunctionAnalysis = {
      ...riskyFn(filePath),
      status: 'error',
      compilerEvent: 'CompileError',
    };
    const outcome = await applyAnnotations([notCompiled], 'all-safe');

    expect(outcome).toEqual({ filesModified: 0, functionsAnnotated: 0, functionsBailedOut: 0 });
    expect(readFileSync(filePath, 'utf-8')).toBe(SOURCE);
  });

  it("'all' mode annotates the risky function with 'use memo' (no bailout)", async () => {
    const filePath = writeTemp(SOURCE);
    const outcome = await applyAnnotations([safeFn(filePath), riskyFn(filePath)], 'all');

    expect(outcome.functionsAnnotated).toBe(2);
    expect(outcome.functionsBailedOut).toBe(0);
    const actual = readFileSync(filePath, 'utf-8');
    expect(actual).toContain("export function Risky() {\n  'use memo';");
    expect(actual).not.toContain('use no memo');
  });

  it('is idempotent — skips a risky function that already has a bailout directive', async () => {
    const preAnnotated = [
      'export function Risky() {',
      "  'use no memo'; // justified: pre-existing",
      '  const id = getAppStore().getState().id;',
      '  return <div>{id}</div>;',
      '}',
      '',
    ].join('\n');
    const filePath = writeTemp(preAnnotated);
    const fn: FunctionAnalysis = {
      filePath,
      packageName: 'test-pkg',
      line: 1,
      column: 0,
      functionName: 'Risky',
      status: 'compiled',
      compilerEvent: 'CompileSuccess',
      bodyInsertionLine: 2,
      existingDirectives: { useMemo: false, useNoMemo: true },
      risks: [
        {
          ruleId: 'nonreactive-store-read',
          severity: 'high',
          line: 3,
          column: 13,
          symbol: 'getAppStore.getState',
          message: 'imperative store snapshot …',
        },
      ],
    };

    const outcome = await applyAnnotations([fn], 'all-safe');
    expect(outcome.functionsBailedOut).toBe(0);
    expect(outcome.filesModified).toBe(0);
    expect(readFileSync(filePath, 'utf-8')).toBe(preAnnotated);
  });
});

describe("applyAnnotations — 'bailout-only' mode", () => {
  function writeTemp(content: string): string {
    const tempDir = mkdtempSync(join(tmpdir(), 'annotate-bailout-only-'));
    const filePath = join(tempDir, 'input.tsx');
    writeFileSync(filePath, content);
    return filePath;
  }

  const SOURCE = [
    'export function Safe() {',
    '  const a = 1;',
    '  return <div>{a}</div>;',
    '}',
    '',
    'export function Risky() {',
    '  const id = getAppStore().getState().id;',
    '  return <div>{id}</div>;',
    '}',
    '',
  ].join('\n');

  function analysis(overrides: Partial<FunctionAnalysis>): FunctionAnalysis {
    return {
      filePath: '',
      packageName: 'test-pkg',
      line: 1,
      column: 0,
      functionName: 'Fn',
      status: 'compiled',
      compilerEvent: 'CompileSuccess',
      bodyInsertionLine: 2,
      ...overrides,
    };
  }

  it('writes only bailouts, leaving safe functions untouched', async () => {
    const filePath = writeTemp(SOURCE);
    const safe = analysis({ filePath, functionName: 'Safe', line: 1, bodyInsertionLine: 2 });
    const risky = analysis({
      filePath,
      functionName: 'Risky',
      line: 6,
      bodyInsertionLine: 7,
      risks: [
        {
          ruleId: 'nonreactive-store-read',
          severity: 'high',
          line: 7,
          column: 13,
          symbol: 'getAppStore().getState',
          message: 'imperative store snapshot …',
        },
      ],
    });

    const outcome = await applyAnnotations([safe, risky], 'bailout-only');

    expect(outcome.functionsAnnotated).toBe(0);
    expect(outcome.functionsBailedOut).toBe(1);

    const actual = readFileSync(filePath, 'utf-8');
    expect(actual).toContain('export function Safe() {\n  const a = 1;');
    expect(actual).toMatch(/export function Risky\(\) \{\n {2}'use no memo'; \/\/ justified:/);
    expect(actual.match(/'use memo'/g)).toBeNull();
  });

  it('does nothing when risk detection found nothing', async () => {
    const filePath = writeTemp(SOURCE);
    const outcome = await applyAnnotations([analysis({ filePath, functionName: 'Safe' })], 'bailout-only');

    expect(outcome).toEqual({ filesModified: 0, functionsAnnotated: 0, functionsBailedOut: 0 });
    expect(readFileSync(filePath, 'utf-8')).toBe(SOURCE);
  });
});
