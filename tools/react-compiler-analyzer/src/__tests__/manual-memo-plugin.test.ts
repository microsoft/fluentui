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
  it('detects useMemo in a basic component', async () => {
    const results = await runPlugin('use-memo-basic.tsx');
    expect(results.size).toBe(1);
    const entry = [...results.values()][0];
    expect(entry.useMemo).toBe(1);
    expect(entry.useCallback).toBe(0);
    expect(entry.reactMemo).toBe(false);
    expect(entry.bodyInsertionLine).toBeGreaterThan(0);
  });

  it('detects useCallback in a basic component', async () => {
    const results = await runPlugin('use-callback-basic.tsx');
    expect(results.size).toBe(1);
    const entry = [...results.values()][0];
    expect(entry.useMemo).toBe(0);
    expect(entry.useCallback).toBe(1);
    expect(entry.reactMemo).toBe(false);
  });

  it('detects React.memo wrapper', async () => {
    const results = await runPlugin('react-memo-wrapper.tsx');
    // React.memo at module level resolves the wrapped function (InnerComponent)
    expect(results.size).toBe(1);
    const entry = [...results.values()][0];
    expect(entry.useMemo).toBe(0);
    expect(entry.useCallback).toBe(0);
    expect(entry.reactMemo).toBe(true);
  });

  it('detects memo() import shorthand', async () => {
    const results = await runPlugin('memo-import.tsx');
    // memo() at module scope resolves the wrapped function (InnerComponent)
    expect(results.size).toBe(1);
    const entry = [...results.values()][0];
    expect(entry.useMemo).toBe(0);
    expect(entry.useCallback).toBe(0);
    expect(entry.reactMemo).toBe(true);
  });

  it('detects mixed useMemo + useCallback in one function', async () => {
    const results = await runPlugin('mixed-hooks.tsx');
    expect(results.size).toBe(1);
    const entry = [...results.values()][0];
    expect(entry.useMemo).toBe(2);
    expect(entry.useCallback).toBe(1);
    expect(entry.reactMemo).toBe(false);
  });

  it('skips functions that already have use memo directive', async () => {
    const results = await runPlugin('already-annotated.tsx');
    expect(results.size).toBe(0);
  });

  it('returns empty map when no memoization is present', async () => {
    const results = await runPlugin('no-memo.tsx');
    expect(results.size).toBe(0);
  });

  it('detects memoization in nested functions separately', async () => {
    const results = await runPlugin('nested-functions.tsx');
    expect(results.size).toBe(2);
    const entries = [...results.values()];
    // Outer has useMemo, inner has useCallback
    const outer = entries.find(e => e.useMemo > 0);
    const inner = entries.find(e => e.useCallback > 0);
    expect(outer).toBeDefined();
    expect(outer!.useMemo).toBe(1);
    expect(inner).toBeDefined();
    expect(inner!.useCallback).toBe(1);
  });

  it('detects React.useMemo and React.useCallback via namespace', async () => {
    const results = await runPlugin('react-namespace-hooks.tsx');
    // TestButton has React.useCallback + React.useMemo; CountDisplay is wrapped in React.memo (inline fn expression)
    expect(results.size).toBe(2);
    const entries = [...results.values()];
    const withHooks = entries.find(e => e.useMemo > 0 || e.useCallback > 0);
    const withMemo = entries.find(e => e.reactMemo);
    expect(withHooks).toBeDefined();
    expect(withHooks!.useMemo).toBe(1);
    expect(withHooks!.useCallback).toBe(1);
    expect(withMemo).toBeDefined();
    expect(withMemo!.reactMemo).toBe(true);
  });

  it('ignores useMemo/useCallback not imported from react', async () => {
    const results = await runPlugin('non-react-memo.tsx');
    expect(results.size).toBe(0);
  });
});
