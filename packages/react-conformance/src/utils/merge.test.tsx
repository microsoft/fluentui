import { merge } from './merge';

describe('Merge', () => {
  it(`merges arrays`, () => {
    const obj1 = { foo: [1], bar: ['foo'] };
    const obj2 = { foo: [2], bar: ['bar'] };
    const obj3 = { foo: [3], bar: ['baz'] };

    expect(merge(true, obj1, obj2)).toEqual({ foo: [1, 2], bar: ['foo', 'bar'] });
    expect(merge(true, obj3, obj2)).toEqual({ foo: [3, 2], bar: ['baz', 'bar'] });
    expect(merge(true, obj1, obj2, obj3)).toEqual({ foo: [1, 2, 3], bar: ['foo', 'bar', 'baz'] });
  });

  it(`merges nested objects`, () => {
    const obj1 = {
      foo: [1],
      bar: {
        arr: [1],
      },
    };
    const obj2 = {
      foo: [2],
      bar: {
        arr: [2, 3],
      },
    };
    const obj3 = {
      foo: [3],
      bar: {
        arr: [4, 5],
      },
    };

    expect(merge(true, obj1, obj2, obj3)).toEqual({
      foo: [1, 2, 3],
      bar: {
        arr: [1, 2, 3, 4, 5],
      },
    });
  });

  it(`handles single object`, () => {
    const obj = { foo: 'bar' };
    expect(merge(true, obj)).toEqual({ foo: 'bar' });
  });

  it(`merges arrays and primitives if 'mergeArrayPrimitive' is true`, () => {
    const obj1 = {
      arr: 'foo',
      prim: 1,
    };
    const obj2 = {
      arr: ['bar', 'baz'],
      prim: [2, 3],
    };

    expect(merge(true, obj1, obj2)).toEqual({ arr: ['foo', 'bar', 'baz'], prim: [1, 2, 3] });
  });

  it(`does not merge arrays and primitives if 'mergeArrayPrimitive' is false`, () => {
    const obj1 = {
      arr: 'foo',
      prim: 1,
    };
    const obj2 = {
      arr: ['bar', 'baz'],
      prim: [2, 3],
    };

    expect(merge(false, obj1, obj2)).toEqual({ arr: 'foo', prim: 1 });
  });

  it(`inserts missing objects from all objects based on the first one`, () => {
    const obj1 = { foo: 1 };
    const obj2 = { bar: 2 };
    const obj3 = { baz: 3 };

    expect(merge(true, obj1, obj2, obj3)).toEqual({ foo: 1, bar: 2, baz: 3 });
  });

  it(`assigns the given type correctly`, () => {
    interface Obj {
      foo: number;
      bar: string;
    }

    const obj1 = { foo: 1 };
    const obj2 = { bar: 'baz' };

    const merged = merge<Obj>(true, obj1, obj2);

    // eslint-disable @typescript-eslint/no-explicit-any
    function isObj(obj: any): obj is Obj {
      return obj && obj.foo && obj.bar && typeof obj.foo === 'number' && typeof obj.bar === 'string';
    }

    expect(merged).toEqual({ foo: 1, bar: 'baz' });
    expect(isObj(merged)).toBeTruthy();
  });

  it(`sets the default type to Object`, () => {
    const obj1 = { foo: 1 };
    const obj2 = { bar: 'baz' };

    const merged = merge(true, obj1, obj2);

    expect(merged).toEqual({ foo: 1, bar: 'baz' });
    expect(merged instanceof Object).toBeTruthy();
  });
});
