import { getVegaOwnDataDescriptor, readVegaField, readVegaOwnData } from './VegaLiteField';
import { readVegaField as engineReadVegaField } from './VegaLiteDataTransforms';
import type { VegaDataRow as EngineDataRow, VegaSemanticOptions as EngineOptions } from './VegaLiteDataTransforms';
import type { VegaDataRow, VegaSemanticOptions } from './VegaLiteData.types';
import { readVegaField as rangedReadVegaField } from './VegaLiteRangedGeometry';
import { safeEvaluateExpression } from './VegaLiteExpressionEvaluator';
import { buildVegaTooltip } from './VegaLiteTooltip';

describe('canonical own-data readers', () => {
  it('preserves own data identities and descriptor flags without cloning or coercion', () => {
    const hook = jest.fn(() => {
      throw new Error('user code must not execute');
    });
    const date = new Date('2024-02-29T00:00:00Z');
    const object = Object.create(null);
    object.self = object;
    Object.defineProperties(date, { getTime: { get: hook }, toJSON: { get: hook } });
    for (const value of [date, object, [object], undefined, null, false, 0, '', NaN]) {
      const row = Object.defineProperty({}, 'value', { value });
      expect(readVegaOwnData(row, 'value')).toBe(value);
      expect(getVegaOwnDataDescriptor(row, 'value')).toEqual({
        value,
        enumerable: false,
        configurable: false,
        writable: false,
      });
    }
    expect(hook).not.toHaveBeenCalled();
  });

  it('distinguishes own undefined from missing while refusing accessors and inherited properties', () => {
    const hook = jest.fn(() => 7);
    const row = Object.create({ inherited: 3, inheritedFunction: hook });
    Object.defineProperties(row, {
      present: { value: undefined },
      getter: { get: hook },
      setter: { set: hook },
    });
    expect(getVegaOwnDataDescriptor(row, 'present')).toEqual(expect.objectContaining({ value: undefined }));
    for (const key of ['missing', 'inherited', 'inheritedFunction', 'getter', 'setter']) {
      expect(getVegaOwnDataDescriptor(row, key)).toBeUndefined();
      expect(readVegaOwnData(row, key)).toBeUndefined();
    }
    expect(readVegaOwnData(row, 'present')).toBeUndefined();
    expect(hook).not.toHaveBeenCalled();
  });

  it('reads sparse arrays, own length and nonenumerable entries without inherited values', () => {
    const hook = jest.fn(() => 7);
    const values = new Array(4);
    const prototype = Object.create(Array.prototype);
    Object.defineProperty(prototype, '0', { value: 99 });
    Object.setPrototypeOf(values, prototype);
    Object.defineProperties(values, { 1: { get: hook }, 2: { value: 7 } });
    expect(readVegaOwnData(values, 'length')).toBe(4);
    expect(readVegaOwnData(values, '2')).toBe(7);
    for (const key of ['0', '1', '3']) {
      expect(getVegaOwnDataDescriptor(values, key)).toBeUndefined();
      expect(readVegaOwnData(values, key)).toBeUndefined();
    }
    expect(hook).not.toHaveBeenCalled();
  });

  it('allows own constructor, prototype and __proto__ keys on null-prototype records', () => {
    const row = Object.create(null);
    for (const key of ['constructor', 'prototype', '__proto__']) {
      const value = { key };
      Object.defineProperty(row, key, { value });
      expect(readVegaOwnData(row, key)).toBe(value);
      expect(getVegaOwnDataDescriptor(row, key)?.value).toBe(value);
      expect(readVegaOwnData({}, key)).toBeUndefined();
    }
  });

  it.each([null, undefined, 0, false, 'value', Symbol('value'), () => 7])(
    'does not inspect non-object input %s',
    value => {
      expect(getVegaOwnDataDescriptor(value, 'constructor')).toBeUndefined();
      expect(readVegaOwnData(value, 'constructor')).toBeUndefined();
    },
  );

  it('deliberately retains raw callable identity for expression rejection, not ordinary reads', () => {
    const callback = jest.fn(() => 7);
    const row = { callback };
    expect(getVegaOwnDataDescriptor(row, 'callback')?.value).toBe(callback);
    expect(readVegaOwnData(row, 'callback')).toBeUndefined();
    expect(readVegaField(row, 'callback')).toBeUndefined();
    for (const expression of ['isValid(datum.callback)', 'pow(1, datum.callback)', 'min(1, 2, datum.callback)']) {
      expect(() => safeEvaluateExpression(expression, row)).toThrow('function values');
    }
    for (const expression of ['toString(datum.value)', 'toNumber(datum.value)', 'abs(datum.value)']) {
      expect(() => safeEvaluateExpression(expression, { value: [1, [callback]] })).toThrow('function values');
    }
    expect(callback).not.toHaveBeenCalled();
  });

  it('keeps tooltip presence for own undefined but excludes missing, accessor and callable fields', () => {
    const hook = jest.fn(() => 7);
    const row = Object.defineProperty({ present: undefined, callable: hook }, 'getter', { get: hook });
    expect(
      buildVegaTooltip(
        {
          mark: 'point',
          encoding: { tooltip: ['present', 'missing', 'getter', 'callable'].map(field => ({ field })) },
        },
        row,
      ).fields,
    ).toEqual([{ title: 'present', value: 'undefined' }]);
    expect(hook).not.toHaveBeenCalled();
  });
});

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

  it.each(['legacy', 'strict'] as const)('reports raw callable data before ordinary filtering in %s mode', mode => {
    const callback = jest.fn(() => 7);
    const row = { callback, nested: [callback], y: 2 };
    expect(readVegaOwnData(row, 'callback')).toBeUndefined();
    expect(validateVegaLiteSpec(spec('y', row), { mode })).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'unsafe-value', path: '$.data.values[0].callback', severity: 'error' }),
        expect.objectContaining({ code: 'unsafe-value', path: '$.data.values[0].nested[0]', severity: 'error' }),
      ]),
    );
    expect(callback).not.toHaveBeenCalled();
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
