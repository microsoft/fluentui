import { assign, filteredAssign, mapEnumByName, values, omit } from './object';

describe('assign', () => {
  it('can copy an object', () => {
    let source = {
      a: 1,
      b: 'string',
      c: {
        d: 2,
      },
    };

    let resultTarget = {};
    let result = assign(resultTarget, source);

    expect(result).not.toBe(source);
    expect(result).toBe(resultTarget);
    expect(result).toEqual(source);
  });
});

describe('filteredAssign', () => {
  it('can copy an object but avoid copying some parameters', () => {
    let source = {
      a: 1,
      b: 'string',
    };
    let result = filteredAssign((propName: string) => propName !== 'b', {}, source);

    expect(result.a).toEqual(1);
    expect(result.b).toBeUndefined();
  });
});

describe('mapEnumByName', () => {
  it('iterates over all the strings of an enum', () => {
    enum Foo {
      first,
      second,
      third,
      fourth,
    }

    let result: string[] = [];
    mapEnumByName(Foo, (name: string) => {
      if (name) {
        result.push(name);
      } else {
        expect(name).not.toBeFalsy;
      }
    });

    expect(result).toEqual(['first', 'second', 'third', 'fourth']);
  });
});

describe('values', () => {
  it('gets all values in a dictionary object', () => {
    const obj = {
      test: 1,
      ing: 2,
      '123': 3,
    };
    const objValues = values<number>(obj);
    expect(objValues).toHaveLength(3);
    expect(objValues).toContain(1);
    expect(objValues).toContain(2);
    expect(objValues).toContain(3);
  });
});

describe('omit', () => {
  it('can omit excluded props and leave non-excluded alone', () => {
    expect(omit({ a: 1, b: 2 }, ['a'])).toEqual({ b: 2 });
  });
});
