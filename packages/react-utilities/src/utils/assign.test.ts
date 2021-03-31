import { assignImpl } from './assign';

describe('assignImpl', () => {
  it('modifies the target object, and not source object', () => {
    const target = { a: 1 };
    const source = { b: 2 };

    const result = assignImpl(target, source);

    expect(result).toBe(target);
    expect(target).toEqual({ a: 1, b: 2 });
    expect(source).toEqual({ b: 2 });
  });

  it('adds missing properties', () => {
    const result = assignImpl({ a: 1 }, { b: 2 });

    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });

  it('adds props from multiple objects', () => {
    const result = assignImpl({}, { a: 1 }, { b: 2 }, { c: 3, d: 4 });

    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it('overwrites properties of the same name', () => {
    const result = assignImpl({ a: 1, b: 2 }, { a: 11 }, { a: 42 });

    expect(result).toEqual({ a: 42, b: 2 });
  });

  it('does a shallow merge', () => {
    const target = { o: { a: 1, b: 2, c: 3 } };
    const source = { o: { a: 42 } };
    const result = assignImpl(target, source);

    expect(result).toEqual({ o: { a: 42 } });
  });

  it('returns the appropriate type', () => {
    type MyType = {
      hello: string;
      obj: {
        a: number;
        b: number;
      };
    };

    const result: MyType = assignImpl({ hello: 'nobody' }, { hello: 'world' }, { obj: { a: 1, b: 2 } });

    expect(result.hello).toBe('world');
    expect(result.obj.a).toBe(1);
    expect(result.obj.b).toBe(2);
  });
});
