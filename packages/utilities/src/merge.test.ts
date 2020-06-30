import { merge } from './merge';

describe('merge', () => {
  it('can merge', () => {
    expect(merge<{ a: number; b: number }>({}, { a: 1, b: 0 }, { b: 2 })).toEqual({
      a: 1,
      b: 2,
    });
  });

  it('can handle falsey', () => {
    expect(
      merge<{ a: string; b: string | undefined }>({}, null, undefined, false, { a: '1' }, { b: '2' }, { b: undefined }),
    ).toEqual({
      a: '1',
      b: undefined,
    });
  });

  it('can handle null values', () => {
    expect(merge({}, { a: null })).toEqual({
      a: null,
    });
  });

  it('can merge deeply', () => {
    expect(merge<{ a: { c: number }; b: number }>({}, { b: 0 }, { a: { c: 1 } }, { a: { c: 2 } })).toEqual({
      a: { c: 2 },
      b: 0,
    });
  });

  it('can handle cycles', () => {
    const obj: { foo: Object | undefined } = {
      foo: undefined,
    };

    obj.foo = obj;

    expect(merge({}, obj)).toEqual({ foo: obj });
  });

  it('can handle deep cycles', () => {
    const obj: { foo: { bar: { baz: Object | undefined } } } = {
      foo: {
        bar: {
          baz: undefined,
        },
      },
    };

    obj.foo.bar.baz = obj;

    const result = merge({}, obj);

    expect(result).toEqual({ foo: { bar: { baz: obj } } });
    expect(result.foo).not.toBe(obj.foo);
    expect(result.foo.bar.baz).toBe(obj);
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

    expect(merge({}, obj1)).toEqual({});
    expect(merge({}, obj2)).toEqual({ foo: { bar: 'baz' } });
    expect(merge({}, obj1, obj2)).toEqual({ foo: { bar: 'baz' } });
    // Checking that merge keeps target properties but doesn't merge malicious properties
    expect(merge(obj1, obj2, obj3)).toEqual({
      a: { b: 'baz' },
      constructor: { foo: 'malicious value' },
      foo: { bar: 'baz' },
    });
  });

  it('can handle arrays', () => {
    const obj1 = {
      array1: [1, 2, 3, 4],
      array2: ['1', '2', '3', '4'],
      dontTouch: 'awesome',
      deepArray: { array3: [1, 2, 3, 4], array4: [5, 6, 7, 8] },
    };
    const obj2 = {
      array1: [5, 6, 7, 8],
      array2: ['5', '6', '7', '8'],
      deepArray: { array3: [5, 6, 7, 8] },
    };

    const flatObj = {
      array1: 'string',
      array2: 2,
    };

    const undefinedObjs = {
      array1: undefined,
      array2: undefined,
      deepArray: undefined,
    };

    const objectReplace = {
      array1: {},
      array2: {},
      deepArray: { array3: {}, array4: {} },
    };

    const valueObj = {
      array1: [1],
      array2: ['1'],
      deepArray: { array3: [1], array4: [1] },
    };

    const arrayReplace = {
      deepArray: [1, 2, 3, 4],
    };

    expect(merge(obj1, obj2)).toEqual({
      array1: [5, 6, 7, 8],
      array2: ['5', '6', '7', '8'],
      dontTouch: 'awesome',
      deepArray: { array3: [5, 6, 7, 8], array4: [5, 6, 7, 8] },
    });

    expect(merge(flatObj, undefinedObjs)).toEqual({
      array1: undefined,
      array2: undefined,
      deepArray: undefined,
    });

    expect(merge(obj1, objectReplace)).toEqual({
      array1: {},
      array2: {},
      dontTouch: 'awesome',
      deepArray: { array3: {}, array4: {} },
    });

    expect(merge(obj1, valueObj)).toEqual({
      array1: [1],
      array2: ['1'],
      dontTouch: 'awesome',
      deepArray: { array3: [1], array4: [1] },
    });

    // escape ts so we can replace the type wholesale for testing
    // @ts-ignore
    expect(merge(obj1, arrayReplace)).toEqual({
      array1: [1],
      array2: ['1'],
      dontTouch: 'awesome',
      deepArray: [1, 2, 3, 4],
    });
  });
});
