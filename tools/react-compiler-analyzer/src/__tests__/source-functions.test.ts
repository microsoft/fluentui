import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { compileFile } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import { deriveCandidates } from '../candidates';
import type { CompilationMode } from '../types';

describe('SourceFunctionIndex', () => {
  const roots: string[] = [];

  afterEach(() => {
    for (const root of roots.splice(0)) {
      rmSync(root, { recursive: true, force: true });
    }
  });

  function fixture(source: string, mode: CompilationMode = 'all') {
    const root = mkdtempSync(join(tmpdir(), 'rca-source-functions-'));
    roots.push(root);
    const src = join(root, 'src');
    mkdirSync(src);
    const filePath = join(src, 'fixture.tsx');
    writeFileSync(filePath, source);
    return compileFile(
      { filePath, packageName: 'fixture', packageRoot: root },
      mode,
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

  it.each([
    ['(props, ref) => { return <div ref={ref}>{props.value}</div>; }', 'Wrapped'],
    ['function (props, ref) { return <div ref={ref}>{props.value}</div>; }', 'Wrapped'],
    ['function Render(props, ref) { return <div ref={ref}>{props.value}</div>; }', 'Render'],
  ])('names a nested wrapped render function without naming its comparator: %s', async (render, name) => {
    const result = await fixture(`
import * as React from 'react';
export const Wrapped = React.memo(React.forwardRef(${render}), (a, b) => a.value === b.value);
`);
    expect(result.sourceFunctions.values().map(fn => ({ name: fn.name, kind: fn.kind }))).toEqual([
      { name, kind: 'component' },
      { name: null, kind: 'unknown' },
    ]);
  });

  it.each([false, true])('annotates only the wrapped render body (comparator: %s)', async comparator => {
    const render = '(props, ref) => {\n  return <div ref={ref}>{props.value}</div>;\n}';
    const comparison = comparator ? ', (a, b) => a.value === b.value' : '';
    const source = `import * as React from 'react';
export const Inline = React.memo(React.forwardRef(${render})${comparison});
const Inner = React.forwardRef(${render});
export const Referenced = React.memo(Inner${comparison});
export const Expression = React.memo(React.forwardRef((props, ref) => <div ref={ref}>{props.value}</div>));
`;
    const result = await fixture(source, 'infer');
    expect(result.error).toBeUndefined();
    const analyses = deriveCoverage(result);
    expect(analyses.map(fn => [fn.functionName, fn.status, fn.manualMemo])).toEqual([
      ['Inline', 'compiled', { useMemo: 0, useCallback: 0, reactMemo: true, reactMemoHasComparator: comparator }],
      ['Inner', 'compiled', { useMemo: 0, useCallback: 0, reactMemo: true, reactMemoHasComparator: comparator }],
      ['Expression', 'compiled', { useMemo: 0, useCallback: 0, reactMemo: true, reactMemoHasComparator: false }],
    ]);
    expect(
      deriveCandidates(analyses, true).map(entry => [entry.analysis.functionName, entry.candidate.action]),
    ).toEqual(
      comparator
        ? [
            ['Expression', 'default-wrapper-review'],
            ['Inline', 'custom-comparator-retain'],
            ['Inner', 'custom-comparator-retain'],
          ]
        : [
            ['Inline', 'default-wrapper-review'],
            ['Inner', 'default-wrapper-review'],
            ['Expression', 'default-wrapper-review'],
          ],
    );
    expect(await applyAnnotations(analyses, 'manual-memo')).toEqual({
      filesModified: 1,
      functionsAnnotated: 2,
      functionsBailedOut: 0,
    });
    const annotated = readFileSync(result.filePath, 'utf-8');
    expect(annotated).toBe(source.split(render).join(render.replace('{\n', "{\n  'use memo';\n")));
    const recompiled = await compileFile(
      { filePath: result.filePath, packageName: result.packageName, packageRoot: result.packageRoot ?? undefined },
      'infer',
      false,
    );
    expect(recompiled.error).toBeUndefined();
    expect(recompiled.sourceFunctions.directives().map(directive => directive.directiveType)).toEqual([
      'use-memo',
      'use-memo',
    ]);
    expect(await applyAnnotations(deriveCoverage(recompiled), 'manual-memo')).toEqual({
      filesModified: 0,
      functionsAnnotated: 0,
      functionsBailedOut: 0,
    });
  });

  it('does not resolve a null compiler span', async () => {
    const result = await fixture('export function Component() { return <div />; }');
    expect(result.sourceFunctions.resolveRawLocation(null)).toBeNull();
  });
});
