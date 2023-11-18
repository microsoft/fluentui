import { assign, filteredAssign, mapEnumByName, values, omit, shallowCompare } from './object';

describe('shallowCompare', () => {
  it('returns true for matching objects', () => {
    const a = {
      a: 1,
      b: 'string',
      c: {
        d: 2,
      },
    };

    const b = { ...a };

    expect(shallowCompare(a, b)).toBeTruthy();
  });

  it('returns false when one object is a superset of the other', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const a: { [key: string]: any } = {
      a: 1,
      b: 'string',
      c: {
        d: 2,
      },
    };

    const b = { ...a, e: 'extra' };

    expect(shallowCompare(a, b)).toBeFalsy();

    a.e = 'extra';
    a.f = 3;

    expect(shallowCompare(a, b)).toBeFalsy();
  });

  it('returns false when nested objects are not strictly equal', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const a: { [key: string]: any } = {
      a: 1,
      b: 'string',
      c: {
        d: 2,
      },
    };

    const b = { ...a, c: { ...a.c } };

    expect(shallowCompare(a, b)).toBeFalsy();
  });

  it('returns true for two empty objects', () => {
    expect(shallowCompare({}, {})).toBeTruthy();
  });

  it('returns true for two falsy values', () => {
    expect(shallowCompare(null, null)).toBeTruthy();
    expect(shallowCompare(undefined, undefined)).toBeTruthy();
    expect(shallowCompare(null, undefined)).toBeTruthy();
    expect(shallowCompare(0, '')).toBeTruthy();
    expect(shallowCompare(null, '')).toBeTruthy();
    expect(shallowCompare(0, undefined)).toBeTruthy();
  });

  it('returns false when comparing null or undefined against an object', () => {
    expect(shallowCompare(null, { a: 1 })).toBeFalsy();
    expect(shallowCompare(undefined, { a: 1 })).toBeFalsy();
  });
});

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

    const result = mapEnumByName(Foo, (name: string) => {
      return name;
    });

    expect(result).toEqual(['first', 'second', 'third', 'fourth']);
  });

  it('filters undefined values', () => {
    enum Foo {
      first,
      second,
      third,
      fourth,
    }

    const result = mapEnumByName(Foo, (name: string) => {
      if (name === 'first' || name === 'third') {
        return name;
      }

      if (name === 'second') {
        return undefined;
      }

      return null;
    });

    expect(result).toEqual(['first', 'third']);
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
