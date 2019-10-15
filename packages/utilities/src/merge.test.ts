import { merge } from './merge';

describe('merge', () => {
  it('can merge', () => {
    expect(merge<{ a: number; b: number }>({}, { a: 1, b: 0 }, { b: 2 })).toEqual({
      a: 1,
      b: 2
    });
  });

  it('can handle falsey', () => {
    expect(merge<{ a: string; b: string | undefined }>({}, null, undefined, false, { a: '1' }, { b: '2' }, { b: undefined })).toEqual({
      a: '1',
      b: undefined
    });
  });

  it('can merge deeply', () => {
    expect(merge<{ a: { c: number }; b: number }>({}, { b: 0 }, { a: { c: 1 } }, { a: { c: 2 } })).toEqual({
      a: { c: 2 },
      b: 0
    });
  });

  it('can handle cycles', () => {
    const obj: { foo: Object | undefined } = {
      foo: undefined
    };

    obj.foo = obj;

    expect(merge({}, obj)).toEqual({ foo: obj });
  });

  it('can handle deep cycles', () => {
    const obj: { foo: { bar: { baz: Object | undefined } } } = {
      foo: {
        bar: {
          baz: undefined
        }
      }
    };

    obj.foo.bar.baz = obj;

    const result = merge({}, obj);

    expect(result).toEqual({ foo: { bar: { baz: obj } } });
    expect(result.foo).not.toBe(obj.foo);
    expect(result.foo.bar.baz).toBe(obj);
  });
});
