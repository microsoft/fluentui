import { readVegaField } from './VegaLiteField';
import { readVegaField as engineReadVegaField } from './VegaLiteDataTransforms';
import type { VegaDataRow as EngineDataRow, VegaSemanticOptions as EngineOptions } from './VegaLiteDataTransforms';
import type { VegaDataRow, VegaSemanticOptions } from './VegaLiteData.types';
import { readVegaField as rangedReadVegaField } from './VegaLiteRangedGeometry';

describe('canonical readVegaField', () => {
  const row = { nested: { items: [{ value: 7 }] }, 'a.b': 11, 'a[b]': 13, 'a\\b': 17, 0: 19 };

  it.each([
    ['nested.items[0].value', 7],
    ['nested["items"][0]["value"]', 7],
    ["nested['items'][0]['value']", 7],
    ['nested[ "items" ][ 0 ].value', 7],
    ['a\\.b', 11],
    ['a\\[b\\]', 13],
    ['a\\\\b', 17],
    ['0', 19],
    ['[0]', 19],
  ])('preserves field grammar for %s', (field, expected) => {
    expect(readVegaField(row, field as string)).toBe(expected);
  });

  it('preserves quoted empty keys, escaped quotes and literal bare-token characters', () => {
    const values = { '': 1, 'a"b': 2, "a'b": 3, 'a.b': 4, ' value ': 5, '"value"': 6, '01': 7 };
    expect(readVegaField(values, '[""]')).toBe(1);
    expect(readVegaField(values, '["a\\"b"]')).toBe(2);
    expect(readVegaField(values, "['a\\'b']")).toBe(3);
    expect(readVegaField(values, '["a.b"]')).toBe(4);
    expect(readVegaField(values, ' value ')).toBe(5);
    expect(readVegaField(values, '"value"')).toBe(6);
    expect(readVegaField(values, '[01]')).toBe(7);
  });

  it('reads only own array data descriptors, including nonenumerable entries', () => {
    const getter = jest.fn(() => ({ value: 99 }));
    const values = new Array(4);
    const prototype = Object.create(Array.prototype);
    Object.defineProperty(prototype, '0', { value: { value: 99 } });
    Object.setPrototypeOf(values, prototype);
    Object.defineProperty(values, '1', { get: getter });
    Object.defineProperty(values, '2', { value: { value: 7 } });
    Object.defineProperty(values, '3', { value: getter });
    expect(readVegaField(values, '[0].value')).toBeUndefined();
    expect(readVegaField(values, '[1].value')).toBeUndefined();
    expect(readVegaField(values, '[2].value')).toBe(7);
    expect(readVegaField(values, '[3]')).toBeUndefined();
    expect(readVegaField(values, 'length')).toBe(4);
    expect(getter).not.toHaveBeenCalled();
  });

  it('never traverses inherited properties or invokes getters/callables', () => {
    const getter = jest.fn(() => 5);
    const valueOf = jest.fn(() => 9);
    const hostile = Object.create({ hidden: 3 });
    Object.defineProperty(hostile, 'getter', { get: getter, enumerable: true });
    hostile.valueOf = valueOf;
    expect(readVegaField(hostile, 'hidden')).toBeUndefined();
    expect(readVegaField(hostile, 'getter')).toBeUndefined();
    expect(readVegaField(hostile, 'valueOf')).toBeUndefined();
    expect(readVegaField(hostile, 'constructor.prototype')).toBeUndefined();
    expect(readVegaField({ nested: hostile }, 'nested.getter')).toBeUndefined();
    expect(getter).not.toHaveBeenCalled();
    expect(valueOf).not.toHaveBeenCalled();
  });

  it('permits legitimate own constructor, prototype and __proto__ data without a blacklist', () => {
    const data = Object.create(null);
    Object.defineProperty(data, '__proto__', { value: { value: 2 } });
    Object.defineProperty(data, 'constructor', { value: { prototype: { value: 3 } } });
    Object.defineProperty(data, 'prototype', { value: 4 });
    expect(readVegaField(data, '__proto__.value')).toBe(2);
    expect(readVegaField(data, 'constructor.prototype.value')).toBe(3);
    expect(readVegaField(data, 'prototype')).toBe(4);
    expect(readVegaField({ constructor: 5 }, 'constructor')).toBe(5);
  });

  it('returns Date data unchanged without invoking overridden methods or coercion hooks', () => {
    const hook = jest.fn(() => {
      throw new Error('user code must not execute');
    });
    const date = new Date('2024-02-29T00:00:00Z');
    Object.defineProperties(date, {
      getTime: { value: hook },
      valueOf: { value: hook },
      toJSON: { value: hook },
      secret: { get: hook },
      label: { value: 'own data' },
    });
    expect(readVegaField({ date }, 'date')).toBe(date);
    expect(readVegaField({ date }, 'date.label')).toBe('own data');
    for (const field of ['date.getTime', 'date.valueOf', 'date.toJSON', 'date.secret', 'date.toString']) {
      expect(readVegaField({ date }, field)).toBeUndefined();
    }
    expect(hook).not.toHaveBeenCalled();
  });

  it.each([
    '',
    '.nested',
    'nested.',
    'nested[',
    'nested..value',
    'nested[foo()]',
    'nested[value]',
    'nested.items[0]oops',
    'nested.items[-1]',
    'nested.items[0.5]',
    'nested.items[]',
    'nested["items]',
    'nested["items"',
    'nested.items]',
    'nested\\',
    'nested["items\\',
  ])('keeps malformed path %s unresolved', field => {
    expect(readVegaField(row, field)).toBeUndefined();
  });

  it.each([null, undefined, 0, false, 'value'])('does not traverse non-object input %s', value => {
    expect(readVegaField(value, 'constructor')).toBeUndefined();
  });

  it('preserves original direct-import identities and shared type compatibility', () => {
    expect(engineReadVegaField).toBe(readVegaField);
    expect(rangedReadVegaField).toBe(readVegaField);
    const data: VegaDataRow = { value: 7 };
    const oldData: EngineDataRow = data;
    const options: VegaSemanticOptions = { mode: 'strict' };
    const oldOptions: EngineOptions = options;
    expect(engineReadVegaField(oldData, 'value')).toBe(7);
    expect(oldOptions).toBe(options);
  });
});

describe('diagnostics canonical field resolution', () => {
  // Keep the lower-level contract tests independently runnable during integration changes.
  const validateVegaLiteSpec: typeof import('./VegaLiteDiagnostics').validateVegaLiteSpec = (specification, options) =>
    jest
      .requireActual<typeof import('./VegaLiteDiagnostics')>('./VegaLiteDiagnostics')
      .validateVegaLiteSpec(specification, options);
  const spec = (field: string, row: VegaDataRow, type = 'quantitative') => ({
    mark: 'point',
    data: { values: [row] },
    encoding: { x: { field, type }, y: { field: 'y', type: 'quantitative' } },
  });

  it.each([
    ['nested.items[0].value', { nested: { items: [{ value: 'incompatible' }] } }],
    ['nested[ "items" ][ 0 ].value', { nested: { items: [{ value: 'incompatible' }] } }],
    ['a\\.b', { 'a.b': 'incompatible' }],
    ['a\\[b\\]', { 'a[b]': 'incompatible' }],
    ['a\\\\b', { 'a\\b': 'incompatible' }],
    ['constructor', { constructor: 'incompatible' }],
    ['constructor.prototype.value', { constructor: { prototype: { value: 'incompatible' } } }],
    ['"value"', { '"value"': 'incompatible', value: 1 }],
  ] as Array<[string, VegaDataRow]>)('checks canonical source value for %s', (field, row) => {
    expect(readVegaField(row, field)).toBe('incompatible');
    expect(validateVegaLiteSpec(spec(field, { ...row, y: 2 }), { mode: 'strict' })).toContainEqual(
      expect.objectContaining({ code: 'invalid-field-type', path: '$.encoding.x.type', severity: 'error' }),
    );
  });

  it.each(['nested..value', 'nested[value]', 'nested["value]', 'nested.value\\', 'nested.value]'])(
    'does not interpret malformed %s as a permissively repaired field',
    field => {
      const row = { nested: { value: 'incompatible' }, y: 2 };
      expect(readVegaField(row, field)).toBeUndefined();
      // Preflight validates nonempty field declarations, not path syntax. Missing data stays missing.
      for (const mode of ['legacy', 'strict'] as const) {
        expect(validateVegaLiteSpec(spec(field, row), { mode })).toEqual([]);
      }
    },
  );

  it('keeps empty declarations invalid while missing well-formed source fields remain missing', () => {
    expect(validateVegaLiteSpec(spec('', { y: 2 }), { mode: 'strict' })).toContainEqual(
      expect.objectContaining({ code: 'invalid-field', path: '$.encoding.x.field', severity: 'error' }),
    );
    expect(validateVegaLiteSpec(spec('missing.value', { y: 2 }), { mode: 'strict' })).toEqual([]);
  });

  it('validates Date source fields without invoking overridden methods', () => {
    const hook = jest.fn(() => {
      throw new Error('user date method must not execute');
    });
    const date = new Date('2024-02-29T00:00:00Z');
    Object.defineProperties(date, { getTime: { value: hook }, valueOf: { value: hook }, toJSON: { value: hook } });
    expect(
      validateVegaLiteSpec(spec('nested.date', { nested: { date }, y: 2 }, 'temporal'), { mode: 'strict' }),
    ).toEqual([]);
    expect(hook).not.toHaveBeenCalled();
  });
});
