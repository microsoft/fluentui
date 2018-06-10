import { concatStyleSets } from './concatStyleSets';
import { IStyle } from './IStyle';

describe('concatStyleSets', () => {
  it('can concat style sets', () => {
    const result = concatStyleSets<{ root?: IStyle, a?: IStyle, b?: IStyle }>(
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
      a: [
        { background: 'green' },
        { background: 'white' }
      ],
      b: { background: 'blue' }
    });
  });
});