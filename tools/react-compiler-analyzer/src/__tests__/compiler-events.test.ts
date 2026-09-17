import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { compileFile, type CompilerEvent } from '../compiler';
import { normalizeCompilerEvents } from '../compiler-events';

describe('normalizeCompilerEvents', () => {
  async function setup() {
    const root = mkdtempSync(join(tmpdir(), 'rca-compiler-events-'));
    const src = join(root, 'src');
    mkdirSync(src);
    const filePath = join(src, 'fixture.tsx');
    writeFileSync(filePath, 'export function Component() { return <div />; }');
    const compiled = await compileFile(
      { filePath, packageName: 'fixture', packageRoot: root },
      'all',
      false,
      {},
      undefined,
      [],
      root,
    );
    const fn = compiled.sourceFunctions.values()[0];
    const fnLoc = {
      start: { line: fn.declarationSpan.start.line, column: fn.declarationSpan.start.column },
      end: { line: fn.declarationSpan.end.line, column: fn.declarationSpan.end.column },
    };
    const normalize = (events: CompilerEvent[]) =>
      normalizeCompilerEvents(events, compiled.source, compiled.sourceFunctions, {
        sourceHash: compiled.sourceHash,
      });
    return { fn, fnLoc, normalize };
  }

  it('keeps two diagnostics on one errored function', async () => {
    const { fnLoc, normalize } = await setup();
    const result = normalize([
      { kind: 'CompileError', fnLoc, detail: { reason: 'first', loc: { start: { line: 1, column: 10 } } } },
      { kind: 'CompileError', fnLoc, detail: { reason: 'second', loc: { start: { line: 1, column: 20 } } } },
    ]);
    expect(result.analyses).toHaveLength(1);
    expect(result.analyses[0].diagnostics).toHaveLength(2);
    expect(result.analyses[0].status).toBe('error');
  });

  it('retains full diagnostics when requested', async () => {
    const { fnLoc, normalize } = await setup();
    const result = normalize([
      {
        kind: 'CompileError',
        fnLoc,
        detail: {
          reason: 'cannot modify',
          printErrorMessage: () => '  > 1 | state.x = 1;\n      | ^ cannot modify',
        },
      },
    ]);

    expect(result.analyses[0].diagnostics?.[0]?.fullReason).toContain('state.x = 1');
  });

  it('recognizes error-then-success as a successful retry', async () => {
    const { fnLoc, normalize } = await setup();
    const result = normalize([
      { kind: 'CompileError', fnLoc, detail: { reason: 'retry me' } },
      { kind: 'CompileSuccess', fnLoc, memoSlots: 0 },
    ]);
    expect(result.analyses[0]).toMatchObject({
      status: 'compiled',
      memoStats: { memoSlots: 0, memoBlocks: null },
    });
  });

  it('keeps success-then-error as an error', async () => {
    const { fnLoc, normalize } = await setup();
    const result = normalize([
      { kind: 'CompileSuccess', fnLoc, memoSlots: 1 },
      { kind: 'CompileError', fnLoc, detail: { reason: 'terminal failure' } },
    ]);
    expect(result.analyses[0]).toMatchObject({
      status: 'error',
      memoStats: null,
      reason: 'terminal failure',
    });
  });

  it('recognizes the final success after multiple attempts', async () => {
    const { fnLoc, normalize } = await setup();
    const result = normalize([
      { kind: 'CompileSuccess', fnLoc },
      { kind: 'CompileError', fnLoc, detail: { reason: 'retry again' } },
      { kind: 'CompileSuccess', fnLoc, memoSlots: 2 },
    ]);
    expect(result.analyses[0]).toMatchObject({
      status: 'compiled',
      memoStats: { memoSlots: 2 },
    });
  });

  it('uses the final skip as the terminal outcome', async () => {
    const { fnLoc, normalize } = await setup();
    const result = normalize([
      { kind: 'CompileSuccess', fnLoc },
      { kind: 'CompileSkip', fnLoc, data: 'opted out' },
    ]);
    expect(result.analyses[0]).toMatchObject({
      status: 'skipped',
      compilerEvent: 'CompileSkip',
      memoStats: null,
    });
  });

  it('collapses exact duplicate events without duplicating the function', async () => {
    const { fnLoc, normalize } = await setup();
    const result = normalize([
      { kind: 'CompileSuccess', fnLoc },
      { kind: 'CompileSuccess', fnLoc },
    ]);
    expect(result.analyses).toHaveLength(1);
    expect(result.analyses[0].status).toBe('compiled');
  });

  it('does not collapse identical events separated by another terminal outcome', async () => {
    const { fnLoc, normalize } = await setup();
    const result = normalize([
      { kind: 'CompileSuccess', fnLoc },
      { kind: 'CompileError', fnLoc, detail: { reason: 'retry' } },
      { kind: 'CompileSuccess', fnLoc },
    ]);
    expect(result.analyses[0].status).toBe('compiled');
  });

  it('keeps missing counters null and genuine zero as zero', async () => {
    const { fnLoc, normalize } = await setup();
    expect(normalize([{ kind: 'CompileSuccess', fnLoc }]).analyses[0].memoStats).toEqual({
      memoSlots: null,
      memoBlocks: null,
      memoValues: null,
      prunedMemoBlocks: null,
      prunedMemoValues: null,
    });
    expect(normalize([{ kind: 'CompileSuccess', fnLoc, memoSlots: 0 }]).analyses[0].memoStats?.memoSlots).toBe(0);
  });

  it('ignores terminal events that cannot be attributed to a source function', async () => {
    const { normalize } = await setup();
    const result = normalize([{ kind: 'PipelineError', fnLoc: null, data: 'file failure' }]);
    expect(result.analyses).toHaveLength(0);
  });

  it('omits full diagnostics when the caller does not need them', async () => {
    const { fnLoc, fn } = await setup();
    const root = mkdtempSync(join(tmpdir(), 'rca-compiler-events-'));
    const filePath = join(root, 'fixture.tsx');
    writeFileSync(filePath, 'export function Component() { return <div />; }');
    const compiled = await compileFile(
      { filePath, packageName: 'fixture', packageRoot: root },
      'all',
      false,
      {},
      undefined,
      [],
      root,
    );
    const result = normalizeCompilerEvents(
      [
        {
          kind: 'CompileError',
          fnLoc,
          detail: {
            reason: 'cannot modify',
            printErrorMessage: () => 'large code frame',
          },
        },
      ],
      compiled.source,
      compiled.sourceFunctions,
      { includeFullDiagnostics: false },
    );
    expect(fn).toBeDefined();
    expect(result.analyses[0].diagnostics?.[0]?.fullReason).toBeUndefined();
  });
});
