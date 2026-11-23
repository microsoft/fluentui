import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  compileSource,
  extractDetailLoc,
  extractDetailReason,
  extractFullDiagnostic,
  resolveSkipReason,
  type CompilerEvent,
} from '../compiler';

describe('compileSource — TypeScript parsing per extension', () => {
  it.each([
    ['mutable namespace', 'namespace Values { export let value = 1; }', 'Values.value'],
    ['import equals require', 'import value = require("./value");', 'value'],
    ['import equals alias', 'namespace Values { export const value = 1; } import value = Values.value;', 'value'],
    ['parameter property', 'class Value { constructor(public value: number) {} }', 'new Value(n)'],
    ['enum', 'enum Values { One = 1 }', 'Values.One'],
    ['const enum', 'const enum Values { One = 1 }', 'Values.One'],
    ['auto-accessor', 'class Value { accessor value = 1; }', 'new Value()'],
    ['ambient declarations', 'declare function read(): number; class Value { declare value: number; }', 'read()'],
    ['satisfies', 'const value = { value: 1 } satisfies { value: number };', 'value'],
    [
      'instantiation expression',
      'declare function identity<T>(value: T): T; const value = identity<number>;',
      'value(n)',
    ],
  ])('analyzes a real hook alongside %s without lowering', async (_name, declaration, expression) => {
    const source = `import { useState } from 'react';
${declaration}
export function useValue() {
  const [n] = useState(0);
  return { value: ${expression}, n };
}`;
    const result = await compileSource(source, '/virtual/value.ts', { compilationMode: 'infer' });
    expect(result.error).toBeUndefined();
    expect(result.events).toContainEqual(expect.objectContaining({ kind: 'CompileSuccess', fnName: 'useValue' }));
  });

  it('analyzes an overloaded hook exported with a TypeScript export assignment', async () => {
    const source = `import { useState } from 'react';
function useValue(initial: number): { value: number };
function useValue(): { value: number };
function useValue(initial = 0) {
  const [value] = useState(initial);
  return { value };
}
export = useValue;`;
    const result = await compileSource(source, '/virtual/value.ts', { compilationMode: 'infer' });
    expect(result.error).toBeUndefined();
    expect(result.events.filter(event => event.kind === 'CompileSuccess')).toEqual([
      expect.objectContaining({ fnName: 'useValue' }),
    ]);
  });

  it.each([
    ['label.tsx', 'Label'],
    ['useLabel.ts', 'useLabel'],
  ])('compiles %s alongside a declared class field', async (fileName, functionName) => {
    const filePath = join(__dirname, '__fixtures__', 'declare-fields', fileName);
    const source = readFileSync(filePath, 'utf-8');

    const { error, events } = await compileSource(source, filePath, { compilationMode: 'infer' });

    expect(error).toBeUndefined();
    expect(events).toEqual([expect.objectContaining({ kind: 'CompileSuccess', fnName: functionName })]);
  });

  it('parses an angle-bracket type assertion in a .ts file', async () => {
    // Legal TypeScript, but ambiguous with JSX — only parseable when isTSX is off.
    const source = [
      'interface Foo { a: number }',
      'const bar: unknown = { a: 1 };',
      'const foo = <Foo>bar;',
      'export const a = foo.a;',
    ].join('\n');

    const { error } = await compileSource(source, '/virtual/cast.ts');

    expect(error).toBeUndefined();
  });

  it('parses JSX in a .tsx file', async () => {
    const source = [
      "import { useState } from 'react';",
      'export function C({ label }: { label: string }) {',
      '  const [n, setN] = useState(0);',
      '  return <div onClick={() => setN(c => c + 1)}>{label}{n}</div>;',
      '}',
    ].join('\n');

    const { error, events } = await compileSource(source, '/virtual/C.tsx');

    expect(error).toBeUndefined();
    expect(events.some(e => e.kind === 'CompileSuccess')).toBe(true);
  });

  it('still compiles hook-bearing .ts files', async () => {
    const source = [
      "import { useState } from 'react';",
      'export function useCounter(start: number) {',
      '  const [n, setN] = useState(start);',
      '  return { n, inc: () => setN(c => c + 1) };',
      '}',
    ].join('\n');

    const { error, events } = await compileSource(source, '/virtual/useCounter.ts');

    expect(error).toBeUndefined();
    expect(events.some(e => e.kind === 'CompileSuccess')).toBe(true);
  });

  it('reports JSX inside a .ts file as an error, matching tsc', async () => {
    const { error } = await compileSource('export const el = <div />;\n', '/virtual/bad.ts');

    expect(error).toBeDefined();
  });
});

describe('compileSource — extra parser plugins', () => {
  // A build whose loader enables `decorators-legacy` compiles these; the analyzer must be able to
  // match that parser configuration or its analyzed scope silently excludes them.
  const DECORATED = [
    "import * as React from 'react';",
    'declare function customizable(name: string): ClassDecorator;',
    '',
    "@customizable('Widget')",
    'export class Widget extends React.Component<{}, {}> {',
    '  public render() {',
    '    return null;',
    '  }',
    '}',
  ].join('\n');

  it('rejects decorators by default', async () => {
    const { error } = await compileSource(DECORATED, '/virtual/Widget.tsx');

    expect(error).toBeDefined();
    expect(String(error?.message)).toContain('decorators');
  });

  it('accepts them when the plugin is supplied', async () => {
    const { error } = await compileSource(DECORATED, '/virtual/Widget.tsx', {
      parserPlugins: ['decorators-legacy'],
    });

    expect(error).toBeUndefined();
  });

  it('still parses ordinary files with extra plugins enabled', async () => {
    const source = [
      "import { useState } from 'react';",
      'export function C({ label }: { label: string }) {',
      '  const [n, setN] = useState(0);',
      '  return <div onClick={() => setN(c => c + 1)}>{label}{n}</div>;',
      '}',
    ].join('\n');

    const { error, events } = await compileSource(source, '/virtual/C.tsx', {
      parserPlugins: ['decorators-legacy'],
    });

    expect(error).toBeUndefined();
    expect(events.some(e => e.kind === 'CompileSuccess')).toBe(true);
  });
});

describe('extractDetailLoc', () => {
  it('returns the line/column from a detail loc', () => {
    expect(extractDetailLoc({ loc: { start: { line: 50, column: 25 } } })).toEqual({ line: 50, column: 25 });
  });

  it('falls back to primaryLocation() when there is no .loc (CompilerDiagnostic)', () => {
    const detail = {
      primaryLocation: () => ({ start: { line: 6, column: 2 } }),
    };
    expect(extractDetailLoc(detail)).toEqual({ line: 6, column: 2 });
  });

  it('defaults column to 0 when only a line is present', () => {
    expect(extractDetailLoc({ loc: { start: { line: 7 } } })).toEqual({ line: 7, column: 0 });
  });

  it('returns null when there is no usable location', () => {
    expect(extractDetailLoc({})).toBeNull();
    expect(extractDetailLoc(null)).toBeNull();
    expect(extractDetailLoc('nope')).toBeNull();
  });
});

describe('extractDetailReason', () => {
  it('returns an empty string for null/undefined', () => {
    expect(extractDetailReason(null)).toBe('');
    expect(extractDetailReason(undefined)).toBe('');
  });

  it('joins reason, description and loc into a concise summary', () => {
    const detail = {
      reason: 'Cannot compile',
      description: 'mutates a ref during render',
      loc: { start: { line: 12, column: 4 } },
    };
    expect(extractDetailReason(detail)).toBe('Cannot compile [mutates a ref during render] (12:4)');
  });

  it('stays single-line and never includes the code frame', () => {
    const detail = {
      reason: 'This value cannot be modified',
      description: 'Modifying component props or hook arguments is not allowed.',
      printErrorMessage: () => 'line1\n> 50 | code\n      | ^^^',
    };
    const reason = extractDetailReason(detail);
    expect(reason).not.toContain('\n');
    expect(reason).toBe('This value cannot be modified [Modifying component props or hook arguments is not allowed.]');
  });
});

describe('extractFullDiagnostic', () => {
  it('returns the compiler code-framed diagnostic when available', () => {
    const source = 'const x = 1;\n';
    const detail = {
      reason: 'Cannot compile',
      printErrorMessage: (src: string, opts: { eslint: boolean }) =>
        `FULL DIAGNOSTIC for ${src.trim()} (eslint=${opts.eslint})`,
    };
    expect(extractFullDiagnostic(detail, source)).toBe('FULL DIAGNOSTIC for const x = 1; (eslint=false)');
  });

  it('returns an empty string when the detail cannot be printed', () => {
    expect(extractFullDiagnostic({ reason: 'no printer' }, 'x')).toBe('');
    expect(extractFullDiagnostic(null, 'x')).toBe('');
  });

  it('returns an empty string when printing throws', () => {
    const detail = {
      printErrorMessage: () => {
        throw new Error('boom');
      },
    };
    expect(extractFullDiagnostic(detail, 'x')).toBe('');
  });
});

describe('resolveSkipReason', () => {
  const source = ['export function useThing() {', "  'use no memo';", '  return 1;', '}', ''].join('\n');

  function skipEvent(reason: string, line: number): CompilerEvent {
    return {
      kind: 'CompileSkip',
      fnLoc: null,
      reason,
      loc: { start: { line, column: 2 } },
    };
  }

  it("recovers the directive text from source when the compiler emits '[object Object]'", () => {
    const event = skipEvent("Skipped due to '[object Object]' directive.", 2);
    expect(resolveSkipReason(event, source)).toBe("Skipped due to 'use no memo' directive.");
  });

  it('passes through a well-formed reason unchanged', () => {
    const event = skipEvent("Skipped due to 'use no memo' directive.", 2);
    expect(resolveSkipReason(event, source)).toBe("Skipped due to 'use no memo' directive.");
  });

  it('keeps the mangled token when the directive cannot be located in source', () => {
    const event = skipEvent("Skipped due to '[object Object]' directive.", 999);
    expect(resolveSkipReason(event, source)).toBe("Skipped due to '[object Object]' directive.");
  });

  it('falls back to a generic message when reason is absent', () => {
    const event: CompilerEvent = { kind: 'CompileSkip', fnLoc: null, loc: null };
    expect(resolveSkipReason(event, source)).toBe('compiler skipped this function');
  });
});
