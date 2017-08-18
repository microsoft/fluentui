import { concatStyleSets } from './concatStyleSets';

const { expect } = chai;

describe('concatStyleSets', () => {
  it('can concat style sets', () => {

    // tslint:disable-next-line:no-any
    const result = concatStyleSets<any>(
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

    expect(result).eqls({
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