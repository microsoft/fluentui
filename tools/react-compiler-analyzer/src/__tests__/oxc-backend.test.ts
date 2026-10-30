import { transform } from 'oxc-transform-react';

import { compileSource } from '../compiler';
import { parseCompilerSource, utf8OffsetToUtf16 } from '../oxc-backend';

jest.mock('oxc-transform-react', () => {
  const actual = jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react');
  return { ...actual, transform: jest.fn(actual.transform) };
});

afterEach(() => {
  jest
    .mocked(transform)
    .mockImplementation(jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react').transform);
  jest.restoreAllMocks();
});

describe('Oxc source provenance', () => {
  it.each([
    ['declaration', 'export function Example({ value }: { value: number }) { return <div>{value}</div>; }'],
    ['arrow', 'export const Example = ({ value }: { value: number }) => <div>{value}</div>;'],
    ['zero slots', 'export function Example() { "use memo"; return 1; }'],
    [
      'overload',
      'export function Example(value: number): number;\nexport function Example(value: number) { "use memo"; return value + 1; }',
    ],
    [
      'anonymous default',
      'export default function ({ value }: { value: number }) { "use memo"; return <div>{value}</div>; }',
    ],
    [
      'forwardRef',
      "import { forwardRef } from 'react'; export const Example = forwardRef((props, ref) => <div ref={ref}>{props.value}</div>);",
    ],
    ['unicode', '// \u{1f600}\r\nexport const Example = (props: { value: number }) => <div>{props.value}</div>;'],
    [
      'shadowed cache',
      'const _c = (n: number) => n; export function Example({ value }: { value: number }) { return <div>{_c(value)}</div>; }',
    ],
  ])('attributes %s acceptance to original source', async (_name, source) => {
    const result = await compileSource(source, 'example.tsx');
    expect(result.error).toBeUndefined();
    const successes = result.events.filter(event => event.kind === 'CompileSuccess');
    expect(successes).toHaveLength(1);
    expect(successes[0].fnLoc?.start.line).toBe(source.includes('\n') ? 2 : 1);
    expect(successes[0].memoSlots).toEqual(expect.any(Number));
    if (_name === 'zero slots' || _name === 'overload') {
      expect(successes[0].memoSlots).toBe(0);
    }
  });

  it('distinguishes same-name functions in different scopes', async () => {
    const source = `export const One = function Same({ value }) { return <div>{value}</div>; };
export const Two = function Same({ value }) { return <div>{value}</div>; };`;
    const result = await compileSource(source, 'example.tsx');
    expect(result.error).toBeUndefined();
    const keys = result.events
      .filter(event => event.kind === 'CompileSuccess')
      .map(event => `${event.fnLoc?.start.line}:${event.fnLoc?.start.column}`);
    expect(keys).toHaveLength(2);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('preserves file opt-outs without inventing candidate events', async () => {
    const result = await compileSource("'use no memo'; export function Example() { return <div />; }", 'example.tsx');
    expect(result.error).toBeUndefined();
    expect(result.events).toEqual([]);
  });

  it('reconstructs function-level skipped candidates', async () => {
    const result = await compileSource('export function Example() { "use no memo"; return <div />; }', 'example.tsx');
    expect(result.error).toBeUndefined();
    expect(result.events).toEqual([expect.objectContaining({ kind: 'CompileSkip' })]);
  });

  it('attributes callback rejection to its enclosing compilation target', async () => {
    const result = await compileSource(
      `import { useMemo } from 'react';
export function Example(props) {
  const value = useMemo(() => { props.value = 1; return props.value; }, [props]);
  return <div>{value}</div>;
}`,
      'example.tsx',
    );
    expect(result.error).toBeUndefined();
    expect(result.events.length).toBeGreaterThan(0);
    expect(result.events.every(event => event.kind === 'CompileError' && event.fnName === 'Example')).toBe(true);
    expect(result.events.every(event => event.fnLoc?.start.line === 2)).toBe(true);
  });

  it.each(['infer', 'annotation', 'all'] as const)('uses %s candidate boundaries for nested factories', async mode => {
    const result = await compileSource(
      `export function create() {
  return function Example(props) { "use memo"; props.value = 1; return <div />; };
}`,
      'example.tsx',
      { compilationMode: mode },
    );
    expect(result.error).toBeUndefined();
    expect(result.events).toContainEqual(
      expect.objectContaining({
        kind: mode === 'all' ? 'CompileSuccess' : 'CompileError',
        fnName: mode === 'all' ? 'create' : 'Example',
      }),
    );
  });

  it('classifies invalid syntax explicitly', () => {
    expect(() => parseCompilerSource('example.ts', 'const = ;')).toThrow(
      expect.objectContaining({ code: 'RCA_PARSE_ERROR' }),
    );
  });
});

describe('compiler diagnostic safety', () => {
  it.each(['Warning', 'Advice'] as const)('reports %s without rejecting verified acceptance', async severity => {
    const actual = jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react');
    jest.mocked(transform).mockImplementationOnce(async (...args) => {
      const output = await actual.transform(...args);
      return {
        ...output,
        errors: [
          ...output.errors,
          { severity, message: 'visible diagnostic', labels: [], helpMessage: null, codeframe: null },
        ],
      };
    });
    const warning = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const result = await compileSource('export function Example() { return <div />; }', 'example.tsx');
    expect(result.error).toBeUndefined();
    expect(result.events).toEqual([expect.objectContaining({ kind: 'CompileSuccess' })]);
    expect(warning).toHaveBeenCalledWith(expect.stringContaining('visible diagnostic'));
  });

  it('does not turn a warning into acceptance when no gated implementation exists', async () => {
    const actual = jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react');
    jest.mocked(transform).mockImplementationOnce(async (...args) => ({
      ...(await actual.transform(...args)),
      errors: [{ severity: 'Warning', message: 'not accepted', labels: [], helpMessage: null, codeframe: null }],
    }));
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const result = await compileSource('export function ordinary(value) { return value; }', 'example.tsx');
    expect(result.error).toBeUndefined();
    expect(result.events).toEqual([]);
  });

  it('fails closed on an unknown diagnostic severity', async () => {
    const actual = jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react');
    jest.mocked(transform).mockImplementationOnce(async (...args) => {
      const output = await actual.transform(...args);
      const diagnostic = {
        severity: 'Error' as const,
        message: 'unknown',
        labels: [],
        helpMessage: null,
        codeframe: null,
      };
      Object.defineProperty(diagnostic, 'severity', { value: 'Info' });
      return { ...output, errors: [diagnostic] };
    });
    const result = await compileSource('export function Example() { return <div />; }', 'example.tsx');
    expect(result.error?.message).toContain('unknown diagnostic severity');
  });

  it('preserves unlabeled errors as unattributed rejection evidence', async () => {
    const actual = jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react');
    jest.mocked(transform).mockImplementationOnce(async (...args) => ({
      ...(await actual.transform(...args)),
      errors: [{ severity: 'Error', message: 'unattributed', labels: [], helpMessage: null, codeframe: null }],
    }));
    const result = await compileSource('export function ordinary(value) { return value; }', 'example.tsx');
    expect(result.events).toEqual([expect.objectContaining({ kind: 'CompileError', fnLoc: null })]);
  });

  it('fails closed on an unsupported gated branch shape', async () => {
    const actual = jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react');
    jest.mocked(transform).mockImplementationOnce(async (...args) => {
      const output = await actual.transform(...args);
      return { ...output, code: output.code.replace('__rcaGate() ? function', '__rcaGate() ? 0 && function') };
    });
    const result = await compileSource('export function Example() { return <div />; }', 'example.tsx');
    expect(result.error?.message).toContain('Unsupported Oxc compiler gating shape');
  });

  it('rejects source maps claiming a different original input', async () => {
    const actual = jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react');
    jest.mocked(transform).mockImplementationOnce(async (...args) => {
      const output = await actual.transform(...args);
      if (!output.map) {
        throw new Error('Expected the pinned compiler to emit a source map');
      }
      return { ...output, map: { ...output.map, sourcesContent: ['different source'] } };
    });
    const result = await compileSource('export function Example() { return <div />; }', 'example.tsx');
    expect(result.error?.message).toContain('does not identify the original source');
  });
  it('fails closed on fatal results without diagnostics', async () => {
    jest.mocked(transform).mockResolvedValueOnce({ fatal: true, code: '', errors: [] });
    const result = await compileSource('export function Example() { return <div />; }', 'example.tsx');
    expect(result.error?.message).toContain('Oxc compiler failed');
    expect(result.events).toEqual([expect.objectContaining({ kind: 'PipelineError', fnLoc: null })]);
  });

  it('retains multiple rejection diagnostics for the same source function', async () => {
    const result = await compileSource(
      'export function Example(props) { props.first = 1; props.second = 2; return <div />; }',
      'example.tsx',
    );
    expect(result.error).toBeUndefined();
    expect(result.events.length).toBeGreaterThan(1);
    expect(result.events.every(event => event.kind === 'CompileError')).toBe(true);
  });

  it('fails closed if a gated function also has an error diagnostic', async () => {
    const actual = jest.requireActual<typeof import('oxc-transform-react')>('oxc-transform-react');
    jest.mocked(transform).mockImplementationOnce(async (...args) => {
      const output = await actual.transform(...args);
      return {
        ...output,
        errors: [
          {
            severity: 'Error',
            message: 'conflicting rejection',
            labels: [{ message: null, start: 30, end: 31 }],
            helpMessage: null,
            codeframe: null,
          },
        ],
      };
    });
    const result = await compileSource('export function Example() { return <div />; }', 'example.tsx');
    expect(result.error?.message).toContain('both acceptance and rejection');
  });

  it('fails closed when source provenance is unavailable', async () => {
    jest.mocked(transform).mockResolvedValueOnce({ fatal: false, code: 'export const Example = () => 1;', errors: [] });
    const result = await compileSource('export function Example() { return <div />; }', 'example.tsx');
    expect(result.error?.message).toContain('source map');
  });

  it('rejects diagnostics that split a multibyte character', () => {
    expect(utf8OffsetToUtf16('a\u{1f600}b', 5)).toBe(3);
    expect(() => utf8OffsetToUtf16('a\u{1f600}b', 2)).toThrow('splits a UTF-8 character');
  });
});
