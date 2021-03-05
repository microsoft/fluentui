import { concatStyleSets } from './concatStyleSets';

describe('concatStyleSets', () => {
  it('can concat style sets', () => {
    const result = concatStyleSets(
      {
        root: { background: 'red' },
        a: { background: 'green' },
      },
      {
        a: { background: 'white' },
        b: { background: 'blue' },
      },
      {
        root: {
          selectors: {
            ':hover': { background: 'yellow' },
          },
        },
      },
    );

    expect(result).toEqual({
      root: [
        { background: 'red' },
        {
          selectors: {
            ':hover': { background: 'yellow' },
          },
        },
      ],
      a: [{ background: 'green' }, { background: 'white' }],
      b: { background: 'blue' },
    });
  });

  it('can ignore falsey values in typings', () => {
    const result = concatStyleSets({ a: { background: 'red' } }, null);

    expect(result).toEqual({ a: { background: 'red' } });
  });

  it('can concat mixed style sets with style functions on both ends', () => {
    const fn1 = jest.fn().mockReturnValue({
      root: { background: 'green', fontSize: 12 },
    });

    const fn2 = jest.fn().mockReturnValue({
      root: {
        background: 'yellow',
        color: 'pink',
      },
    });

    const result = concatStyleSets(
      {
        root: { background: 'red' },
        a: { background: 'green' },
        subComponentStyles: {
          a: fn1,
        },
      },
      {
        a: { background: 'white' },
        b: { background: 'blue' },
        subComponentStyles: {
          a: fn2,
        },
      },
      {
        root: {
          selectors: {
            ':hover': { background: 'yellow' },
          },
        },
      },
    );

    expect(result.root).toEqual([
      { background: 'red' },
      {
        selectors: {
          ':hover': { background: 'yellow' },
        },
      },
    ]);

    expect(result.b).toEqual({ background: 'blue' });
    expect(result.a).toEqual([{ background: 'green' }, { background: 'white' }]);
    expect(result.subComponentStyles).toBeDefined();
    expect(typeof result.subComponentStyles!.a === 'function').toBe(true);
    const aExpanded = result.subComponentStyles!.a({});
    expect(aExpanded).toEqual({
      root: [
        { background: 'green', fontSize: 12 },
        { background: 'yellow', color: 'pink' },
      ],
    });
  });

  it('can handle falsy values and sub component styles that has objects', () => {
    const fn1 = jest.fn().mockReturnValue({
      root: {
        background: 'green',
        fontSize: 12,
      },
    });

    const fn2 = jest.fn().mockReturnValue({
      root: {
        background: 'yellow',
        color: 'pink',
      },
    });

    // this cast to any is unnecessary with TS 2.9+.
    // TODO: remove the cast to any.
    const result = (concatStyleSets as any)(
      false,
      {
        subComponentStyles: {
          a: fn1,
        },
      },
      {
        subComponentStyles: {
          a: fn2,
        },
      },
      undefined,
      undefined,
      false,
      {
        subComponentStyles: {
          a: {
            root: {
              fontSize: 14,
            },
          },
        },
      },
    );

    expect(result.subComponentStyles).toBeDefined();
    expect(typeof result.subComponentStyles!.a === 'function').toBe(true);
    const aExpanded = result.subComponentStyles!.a({});
    expect(aExpanded).toEqual({
      root: [{ background: 'green', fontSize: 12 }, { background: 'yellow', color: 'pink' }, { fontSize: 14 }],
    });
  });
});
