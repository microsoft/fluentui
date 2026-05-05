import { readFileSync } from 'fs';
import { join } from 'path';

import { transformAsync } from '@babel/core';

import { manualMemoPlugin, ManualMemoEntry, ManualMemoPluginOptions } from '../manual-memo-plugin';

const FIXTURES_DIR = join(__dirname, '__fixtures__', 'manual-memo');

async function runPlugin(fixtureName: string): Promise<Map<string, ManualMemoEntry>> {
  const filePath = join(FIXTURES_DIR, fixtureName);
  const source = readFileSync(filePath, 'utf-8');
  const results = new Map<string, ManualMemoEntry>();

  await transformAsync(source, {
    filename: filePath,
    ast: false,
    code: false,
    babelrc: false,
    configFile: false,
    presets: [[require.resolve('@babel/preset-typescript'), { isTSX: true, allExtensions: true }]],
    plugins: [[manualMemoPlugin, { results } as ManualMemoPluginOptions]],
  });

  return results;
}

describe('manualMemoPlugin', () => {
  describe('import styles', () => {
    it.each(['named-import.tsx', 'namespace-import.tsx', 'default-import.tsx'])(
      'detects useMemo, useCallback, and memo in %s',
      async fixture => {
        const results = await runPlugin(fixture);
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
      const results = await runPlugin('mixed-hooks.tsx');
      expect(results.size).toBe(1);
      const entry = [...results.values()][0];
      expect(entry.useMemo).toBe(2);
      expect(entry.useCallback).toBe(1);
      expect(entry.reactMemo).toBe(false);
    });

    it('detects memoization in nested functions separately', async () => {
      const results = await runPlugin('nested-functions.tsx');
      expect(results.size).toBe(2);
      const entries = [...results.values()];
      const outer = entries.find(e => e.useMemo > 0);
      const inner = entries.find(e => e.useCallback > 0);
      expect(outer).toEqual(expect.objectContaining({ useMemo: 1, useCallback: 0 }));
      expect(inner).toEqual(expect.objectContaining({ useMemo: 0, useCallback: 1 }));
    });

    it('skips functions that already have "use memo" directive', async () => {
      const results = await runPlugin('already-annotated.tsx');
      expect(results.size).toBe(0);
    });

    it('returns empty map when no memoization is present', async () => {
      const results = await runPlugin('no-memo.tsx');
      expect(results.size).toBe(0);
    });

    it('ignores useMemo/useCallback not imported from react', async () => {
      const results = await runPlugin('non-react-memo.tsx');
      expect(results.size).toBe(0);
    });

    it('detects reactMemoHasComparator when memo is called with a custom comparator', async () => {
      const results = await runPlugin('memo-with-comparator.tsx');
      expect(results.size).toBe(1);
      const entry = [...results.values()][0];
      expect(entry.reactMemo).toBe(true);
      expect(entry.reactMemoHasComparator).toBe(true);
    });
  });
});
