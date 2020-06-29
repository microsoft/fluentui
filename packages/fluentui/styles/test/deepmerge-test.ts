import { deepmerge } from '@fluentui/styles';

describe('deepmerge', () => {
  test(`always returns an object`, () => {
    expect(deepmerge({}, {})).toStrictEqual({});
    expect(deepmerge(null, null)).toStrictEqual({});
    expect(deepmerge(undefined, undefined)).toStrictEqual({});

    expect(deepmerge(null, undefined)).toStrictEqual({});
    expect(deepmerge(undefined, null)).toStrictEqual({});

    expect(deepmerge({}, undefined)).toStrictEqual({});
    expect(deepmerge(undefined, {})).toStrictEqual({});

    expect(deepmerge({}, null)).toStrictEqual({});
    expect(deepmerge(null, {})).toStrictEqual({});
  });

  test('undefined overwrites previous value', () => {
    const merged = deepmerge({ color: 'black' }, { color: undefined });
    expect(merged).toStrictEqual({ color: undefined });
  });

  test('null overwrites previous value', () => {
    const merged = deepmerge({ color: 'black' }, { color: null });
    expect(merged).toStrictEqual({ color: null });
  });

  test('undefined gets overwritten by next value', () => {
    const merged = deepmerge({ color: undefined }, { color: 'black' });
    expect(merged).toStrictEqual({ color: 'black' });
  });

  test('null gets overwritten by next value', () => {
    const merged = deepmerge({ color: null }, { color: 'black' });
    expect(merged).toStrictEqual({ color: 'black' });
  });

  test('merges top level keys', () => {
    const target = { overridden: false, keep: true };
    const source = { overridden: true, add: true };

    expect(deepmerge(target, source)).toStrictEqual({
      overridden: true,
      keep: true,
      add: true,
    });
  });

  test('deep merges nested keys', () => {
    const target = {
      nested: {
        replaced: false,
        valueToValue: 'targetVTV',
        nullToValue: null,
        undefinedToValue: undefined,
        valueToNull: 'targetVTN',
        valueToUndefined: 'targetVTU',
        deep: {
          dOne: 1,
          deepValueToValue: 'targetDVTV',
          deepNullToValue: null,
          deepUndefinedToValue: undefined,
          deepValueToNull: 'targetDVTN',
          deepValueToUndefined: 'targetDVTU',
        },
      },
    };
    const source = {
      nested: {
        valueToValue: 'sourceVTV',
        nullToValue: 'sourceNTV',
        undefinedToValue: 'sourceUTV',
        valueToNull: null,
        valueToUndefined: undefined,
        other: 'value',
        deep: {
          dTwo: 'two',
          deepValueToValue: 'sourceDVTV',
          deepNullToValue: 'sourceDNTV',
          deepUndefinedToValue: 'sourceDUTV',
          deepValueToNull: null,
          deepValueToUndefined: undefined,
        },
      },
    };

    expect(deepmerge(target, source)).toStrictEqual({
      nested: {
        replaced: false,
        other: 'value',
        valueToValue: 'sourceVTV',
        nullToValue: 'sourceNTV',
        undefinedToValue: 'sourceUTV',
        valueToNull: null,
        valueToUndefined: undefined,
        deep: {
          dOne: 1,
          dTwo: 'two',
          deepValueToValue: 'sourceDVTV',
          deepNullToValue: 'sourceDNTV',
          deepUndefinedToValue: 'sourceDUTV',
          deepValueToNull: null,
          deepValueToUndefined: undefined,
        },
      },
    });
  });

  test('array replaces an array and does NOT concat (CSS fallback value requirement)', () => {
    const target = { overridden: [1, 2, 3] };
    const source = { overridden: [4, 5] };

    expect(deepmerge(target, source)).toStrictEqual({
      overridden: [4, 5],
    });
  });

  test('different value types replace previous value', () => {
    expect(deepmerge({ color: 'black' }, { color: ['green', 'red'] })).toStrictEqual({
      color: ['green', 'red'],
    });
    expect(deepmerge({ color: ['green', 'red'] }, { color: 'black' })).toStrictEqual({
      color: 'black',
    });
    expect(deepmerge({ color: { nested: 'object' } }, { color: ['green', 'red'] })).toStrictEqual({
      color: ['green', 'red'],
    });
    expect(deepmerge({ color: ['green', 'red'] }, { color: { nested: 'object' } })).toStrictEqual({
      color: { nested: 'object' },
    });
    expect(deepmerge({ color: { nested: 'object' } }, { color: undefined })).toStrictEqual({
      color: undefined,
    });
  });

  test('merges more objects', () => {
    const target = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const source1 = { b: 'bS1', d: false, bb: 'bbS1' };
    const source2 = { c: 'bS2', cc: 'bbS2' };
    const source3 = { d: 'bS3', dd: 'bbS3' };

    expect(deepmerge(target, source1, source2, source3)).toStrictEqual({
      a: 1,
      b: 'bS1',
      c: 'bS2',
      d: 'bS3',
      e: 5,
      bb: 'bbS1',
      cc: 'bbS2',
      dd: 'bbS3',
    });
  });

  it('can handle prototype pollution', () => {
    const obj1 = {
      __proto__: { payload: 'malicious value' },
      constructor: { foo: 'malicious value' },
    };
    // used to check it keeps other properties
    const obj2 = {
      __proto__: { payload: 'malicious value' },
      prototype: { payload: 'malicious value' },
      constructor: { foo: 'malicious value' },
      foo: { bar: 'baz' },
    };
    // used to check deep cycles
    const obj3 = {
      __proto__: { payload: 'malicious value' },
      constructor: { foo: 'malicious value' },
      a: { b: 'baz', __proto__: { payload: 'malicious value' } },
    };

    expect(deepmerge({}, obj1)).toEqual({});
    expect(deepmerge({}, obj2)).toEqual({ foo: { bar: 'baz' } });
    expect(deepmerge({}, obj1, obj2)).toEqual({ foo: { bar: 'baz' } });
    expect(deepmerge(obj1, obj2, obj3)).toEqual({
      a: { b: 'baz' },
      foo: { bar: 'baz' },
    });
  });
});
