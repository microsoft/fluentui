import { assign, filteredAssign, mapEnumByName } from './object';

describe('assign', () => {
  it('can copy an object', () => {
    let source = {
      a: 1,
      b: 'string',
      c: {
        d: 2
      }
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
      b: 'string'
    };
    let result = filteredAssign((propName: string) => propName !== 'b', {}, source);

    expect(result.a).toEqual(1);
    expect(result.b).toBeUndefined();
  });
});

describe('mapEnumByName', () => {
  it('iterates over all the strings of an enum', () => {
    enum foo {
      first,
      second,
      third,
      fourth
    }

    let result: string[] = [];
    mapEnumByName(foo, (name: string) => {
      if (name) {
        result.push(name);
      } else {
        expect(name).not.toBeFalsy;
      }
    });

    expect(result).toEqual(['first', 'second', 'third', 'fourth']);
  });
});