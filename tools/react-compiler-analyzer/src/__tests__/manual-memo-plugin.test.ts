import { readFileSync } from 'fs';
import { join } from 'path';

import { transformAsync } from '@babel/core';

import { manualMemoPlugin, ManualMemoEntry, ManualMemoPluginOptions } from '../manual-memo-plugin';
import { SourceFunctionIndex } from '../source-functions';

const FIXTURES_DIR = join(__dirname, '__fixtures__', 'manual-memo');

async function runPlugin(
  fixtureName: string,
): Promise<{ results: Map<string, ManualMemoEntry>; bodyInsertionLines: Map<string, number> }> {
  const filePath = join(FIXTURES_DIR, fixtureName);
  const source = readFileSync(filePath, 'utf-8');
  return runSource(source, filePath);
}

async function runSource(source: string, filePath = join(FIXTURES_DIR, 'wrapped.tsx')) {
  const results = new Map<string, ManualMemoEntry>();
  const bodyInsertionLines = new Map<string, number>();
  const sourceFunctions = new SourceFunctionIndex(source, { filePath, packageName: 'fixture' }, FIXTURES_DIR);

  await transformAsync(source, {
    filename: filePath,
    ast: false,
    code: false,
    babelrc: false,
    configFile: false,
    presets: [[require.resolve('@babel/preset-typescript'), { isTSX: true, allExtensions: true }]],
    plugins: [[manualMemoPlugin, { results, bodyInsertionLines, sourceFunctions } as ManualMemoPluginOptions]],
  });

  return { results, bodyInsertionLines, sourceFunctions };
}

describe('manualMemoPlugin', () => {
  describe('memo and forwardRef wrappers', () => {
    it.each([
      ["import React from 'react';", 'React.memo', 'React.forwardRef'],
      ["import * as React from 'react';", 'React.memo', 'React.forwardRef'],
      ["import { memo, forwardRef } from 'react';", 'memo', 'forwardRef'],
      ["import { memo as cache, forwardRef as withRef } from 'react';", 'cache', 'withRef'],
    ])('resolves inline and identifier wrappers with %s', async (imports, memo, forwardRef) => {
      for (const inline of [true, false]) {
        for (const comparator of [false, true]) {
          const render = '(props, ref) => { return <div ref={ref}>{props.value}</div>; }';
          const wrapped = `${forwardRef}(${render})`;
          const source = `${imports}
${inline ? '' : `const Inner = ${wrapped};`}
export const Wrapped = ${memo}(${inline ? wrapped : 'Inner'}${comparator ? ', (a, b) => a.value === b.value' : ''});
`;
          const { results, bodyInsertionLines, sourceFunctions } = await runSource(source);
          const fn = sourceFunctions.values().find(candidate => candidate.name === (inline ? 'Wrapped' : 'Inner'))!;
          expect(fn).toBeDefined();
          expect(fn.kind).toBe('component');
          const expectedMemo = {
            useMemo: 0,
            useCallback: 0,
            reactMemo: true,
            reactMemoHasComparator: comparator,
          };
          const key = `${fn.declarationSpan.start.line}:${fn.declarationSpan.start.column}`;
          expect([...results]).toEqual([[key, { ...expectedMemo, bodyInsertionLine: fn.bodyInsertionLine }]]);
          expect(bodyInsertionLines.get(key)).toBe(fn.bodyInsertionLine);
          expect(sourceFunctions.values().filter(candidate => candidate.manualMemo)).toEqual([
            expect.objectContaining({ id: fn.id, manualMemo: expectedMemo }),
          ]);
        }
      }
    });

    it('follows identifier aliases to a separately declared render function', async () => {
      const { results, sourceFunctions } = await runSource(`
import { memo, forwardRef } from 'react';
function Render(props, ref) { return <div ref={ref}>{props.value}</div>; }
const Inner = forwardRef(Render);
const Alias = Inner;
export const Wrapped = memo(Alias);
`);
      expect(results.size).toBe(1);
      expect(sourceFunctions.values()).toEqual([
        expect.objectContaining({ name: 'Render', manualMemo: expect.objectContaining({ reactMemo: true }) }),
      ]);
    });

    it('retains comparator flags across nested and repeated memo wrappers', async () => {
      const { results, sourceFunctions } = await runSource(`
import { memo, forwardRef } from 'react';
const Inner = forwardRef(function Render(props, ref) { return <div ref={ref}>{props.value}</div>; });
const Compared = memo(Inner, (a, b) => a.value === b.value);
export const Wrapped = memo(memo(Compared));
export const Other = memo(Inner);
`);
      expect([...results.values()]).toEqual([
        expect.objectContaining({ reactMemo: true, reactMemoHasComparator: true }),
      ]);
      expect(sourceFunctions.values().find(fn => fn.name === 'Render')?.manualMemo).toEqual(
        expect.objectContaining({ reactMemo: true, reactMemoHasComparator: true }),
      );
    });

    it.each([
      `import { forwardRef } from 'other'; const Inner = forwardRef(() => { return <div />; }); React.memo(Inner);`,
      `const forwardRef = fn => fn; React.memo(forwardRef(() => { return <div />; }));`,
      `const Inner = React.forwardRef(() => { return <div />; }); const memo = 'memo'; React[memo](Inner);`,
      `const First = Second; const Second = First; React.memo(First);`,
      `let Inner = React.forwardRef(() => { return <div />; }); Inner = other; React.memo(Inner);`,
    ])('does not infer a target from unrelated, dynamic, cyclic or reassigned wrappers: %s', async source => {
      const { results, sourceFunctions } = await runSource(`import React from 'react';\n${source}`);
      expect(results.size).toBe(0);
      expect(sourceFunctions.values().some(fn => fn.manualMemo)).toBe(false);
    });
  });

  describe('import styles', () => {
    it.each(['named-import.tsx', 'namespace-import.tsx', 'default-import.tsx'])(
      'detects useMemo, useCallback, and memo in %s',
      async fixture => {
        const { results } = await runPlugin(fixture);
        expect(results.size).toBe(4);

        const entries = [...results.values()];
        const withUseMemo = entries.find(e => e.useMemo > 0);
        const withUseCallback = entries.find(e => e.useCallback > 0);
        const withReactMemo = entries.filter(e => e.reactMemo);

        expect(withUseMemo).toEqual(expect.objectContaining({ useMemo: 1, useCallback: 0, reactMemo: false }));
        expect(withUseCallback).toEqual(expect.objectContaining({ useMemo: 0, useCallback: 1, reactMemo: false }));
        // Both reference-based memo(InnerComponent) and inline memo(() => {...}) detected
        expect(withReactMemo).toHaveLength(2);
        for (const entry of withReactMemo) {
          expect(entry).toEqual(
            expect.objectContaining({ useMemo: 0, useCallback: 0, reactMemo: true, reactMemoHasComparator: false }),
          );
        }

        // All entries should have valid bodyInsertionLine
        for (const entry of entries) {
          expect(entry.bodyInsertionLine).toBeGreaterThan(0);
        }
      },
    );
  });

  describe('edge cases', () => {
    it('counts multiple useMemo + useCallback in one function', async () => {
      const { results } = await runPlugin('mixed-hooks.tsx');
      expect(results.size).toBe(1);
      const entry = [...results.values()][0];
      expect(entry.useMemo).toBe(2);
      expect(entry.useCallback).toBe(1);
      expect(entry.reactMemo).toBe(false);
    });

    it('detects memoization in nested functions separately', async () => {
      const { results } = await runPlugin('nested-functions.tsx');
      expect(results.size).toBe(2);
      const entries = [...results.values()];
      const outer = entries.find(e => e.useMemo > 0);
      const inner = entries.find(e => e.useCallback > 0);
      expect(outer).toEqual(expect.objectContaining({ useMemo: 1, useCallback: 0 }));
      expect(inner).toEqual(expect.objectContaining({ useMemo: 0, useCallback: 1 }));
    });

    it('records cleanup inventory inside functions that already have "use memo"', async () => {
      const { results } = await runPlugin('already-annotated.tsx');
      expect(results.size).toBe(1);
      expect([...results.values()][0].useMemo).toBeGreaterThan(0);
    });

    it('returns empty map when no memoization is present', async () => {
      const { results } = await runPlugin('no-memo.tsx');
      expect(results.size).toBe(0);
    });

    it('ignores useMemo/useCallback not imported from react', async () => {
      const { results } = await runPlugin('non-react-memo.tsx');
      expect(results.size).toBe(0);
    });

    it('detects reactMemoHasComparator when memo is called with a custom comparator', async () => {
      const { results } = await runPlugin('memo-with-comparator.tsx');
      expect(results.size).toBe(1);
      const entry = [...results.values()][0];
      expect(entry.reactMemo).toBe(true);
      expect(entry.reactMemoHasComparator).toBe(true);
    });

    it('does not record a bodyInsertionLine for expression-body arrow functions', async () => {
      // Expression-body arrows (e.g. `const X = () => <div />`) have no block where a
      // `'use memo';` directive could be safely inserted. Recording an insertion line
      // for them causes the fixer to splice the directive into the surrounding
      // declaration, corrupting the source file.
      const { bodyInsertionLines } = await runPlugin('expression-body-arrow.tsx');

      expect(bodyInsertionLines.size).toBe(0);
    });
  });
});
