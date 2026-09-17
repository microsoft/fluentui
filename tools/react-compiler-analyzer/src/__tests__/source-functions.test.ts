import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { compileFile } from '../compiler';

describe('SourceFunctionIndex', () => {
  function fixture(source: string) {
    const root = mkdtempSync(join(tmpdir(), 'rca-source-functions-'));
    const src = join(root, 'src');
    mkdirSync(src);
    const filePath = join(src, 'fixture.tsx');
    writeFileSync(filePath, source);
    return compileFile(
      { filePath, packageName: 'fixture', packageRoot: root },
      'all',
      false,
      { detectGetStateReads: true },
      undefined,
      [],
      root,
    );
  }

  it('resolves declaration and body spans to one deterministic ID', async () => {
    const result = await fixture('export function Component() { return <div />; }');
    const fn = result.sourceFunctions.values()[0];
    expect(result.sourceFunctions.resolveSpan(fn.declarationSpan)?.id).toBe(fn.id);
    expect(result.sourceFunctions.resolveSpan(fn.bodySpan)?.id).toBe(fn.id);
    expect(fn.id).toMatch(/^src\/fixture\.tsx#\d+-\d+$/);
  });

  it('selects the smallest containing nested function', async () => {
    const result = await fixture(`
export function Outer() {
  return function Inner() {
    return <div />;
  };
}`);
    const [, inner] = result.sourceFunctions.values();
    expect(result.sourceFunctions.resolveSpan(inner.bodySpan)?.id).toBe(inner.id);
  });

  it('keeps same-named and anonymous functions addressable', async () => {
    const result = await fixture(`
const first = function Same() { return 1; };
const second = function Same() { return 2; };
[1].map(function () { return 3; });
`);
    const functions = result.sourceFunctions.values();
    expect(new Set(functions.map(fn => fn.id)).size).toBe(3);
    expect(functions.some(fn => fn.name === null)).toBe(true);
  });

  it('classifies hooks, components, other functions, and unknown functions', async () => {
    const result = await fixture(`
import * as React from 'react';
export function useThing() { return 1; }
export function Component() { return <div />; }
function helper() { return 1; }
export const Wrapped = React.forwardRef((props, ref) => <div ref={ref} />);
[1].map(function () { return 1; });
`);
    expect(new Set(result.sourceFunctions.values().map(fn => fn.kind))).toEqual(
      new Set(['hook', 'component', 'other', 'unknown']),
    );
  });

  it('uses the same identity for manual memoization and risk findings', async () => {
    const result = await fixture(`
import { useMemo } from 'react';
declare const store: { getState(): { value: number } };
export function Component() {
  const value = store.getState().value;
  return useMemo(() => <div>{value}</div>, [value]);
}`);
    const fn = result.sourceFunctions.values().find(candidate => candidate.name === 'Component')!;
    expect(fn.manualMemo?.useMemo).toBe(1);
    expect(fn.findings).toHaveLength(1);
    expect(result.risks.get(fn.id)).toHaveLength(1);
  });

  it('does not resolve a null compiler span', async () => {
    const result = await fixture('export function Component() { return <div />; }');
    expect(result.sourceFunctions.resolveRawLocation(null)).toBeNull();
  });
});
