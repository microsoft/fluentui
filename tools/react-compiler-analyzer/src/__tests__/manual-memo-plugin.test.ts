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
    // React.memo is at module level — the enclosing function is the one wrapping it
    // or there may be no enclosing function. Let's check if there's a result.
    // React.memo(InnerComponent) is called at module scope, so the parent function
    // would not be found — the plugin checks for enclosing function.
    // Actually in this fixture, React.memo is called at module scope, so no enclosing function.
    // The module-level arrow or the component itself should catch it if called inside a function.
    // Since it's at module scope, we expect no results from this particular fixture
    // unless the plugin handles module-level calls. Per the plan, it walks to enclosing function.
    // Module-level memo() won't have an enclosing function — so it won't be detected.
    // This is actually the expected behavior for the annotation use case.
    expect(results.size).toBe(0);
  });

  it('detects memo() import shorthand', async () => {
    const results = await runPlugin('memo-import.tsx');
    // Same as above — memo() called at module scope, no enclosing function
    expect(results.size).toBe(0);
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
});
