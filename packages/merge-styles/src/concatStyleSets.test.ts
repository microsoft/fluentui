import { concatStyleSets } from './concatStyleSets';
import { IStyle } from './IStyle';
import { IStyleFunction } from './IStyleFunction';

describe('concatStyleSets', () => {
  it('can concat style sets', () => {
    const result = concatStyleSets<{ root?: IStyle; a?: IStyle; b?: IStyle }>(
      {
        root: { background: 'red' },
        a: { background: 'green' }
      },
      {
        a: { background: 'white' },
        b: { background: 'blue' }
      },
      {
        root: {
          selectors: {
            ':hover': { background: 'yellow' }
          }
        }
      }
    );

    expect(result).toEqual({
      root: [
        { background: 'red' },
        {
          selectors: {
            ':hover': { background: 'yellow' }
          }
        }
      ],
      a: [{ background: 'green' }, { background: 'white' }],
      b: { background: 'blue' }
    });
  });

  it('can concat style sets with functions on both ends', () => {
    const fn1 = jest.fn().mockReturnValue({
      root: { background: 'green', fontSize: 12 }
    });

    const fn2 = jest.fn().mockReturnValue({
      root: {
        background: 'yellow',
        color: 'pink'
      }
    });

    const result = concatStyleSets<{ root?: IStyle; a?: IStyleFunction; b?: IStyle }>(
      {
        root: { background: 'red' },
        a: fn1
      },
      {
        a: fn2,
        b: { background: 'blue' }
      },
      {
        root: {
          selectors: {
            ':hover': { background: 'yellow' }
          }
        }
      }
    );

    expect(result.root).toEqual([
      { background: 'red' },
      {
        selectors: {
          ':hover': { background: 'yellow' }
        }
      }
    ]);

    expect(result.b).toEqual({ background: 'blue' });
    expect(typeof result.a === 'function').toBe(true);
    const aExpanded = (result.a as IStyleFunction)({});
    expect(aExpanded).toEqual({
      root: [{ background: 'green', fontSize: 12 }, { background: 'yellow', color: 'pink' }]
    });
  });
});
