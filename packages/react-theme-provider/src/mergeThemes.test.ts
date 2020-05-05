import { mergeThemes } from './mergeThemes';

describe('mergeThemes', () => {
  it('fills in blanks', () => {
    expect(mergeThemes({})).toEqual({
      stylesheets: [],
      tokens: {},
    });
  });

  it('can merge 2 themes', () => {
    expect(
      mergeThemes(
        {
          tokens: {
            body: {
              fill: 'blue',
              text: 'white',
            },
          },
        },
        { tokens: { body: { fill: 'red' } } },
      ),
    ).toEqual({
      stylesheets: [],
      tokens: {
        body: {
          fill: 'red',
          text: 'white',
        },
      },
    });
  });

  it('can merge stylesheets', () => {
    expect(mergeThemes({ stylesheets: ['a', 'b'] }, { stylesheets: ['c', 'd'] })).toEqual({
      stylesheets: ['a', 'b', 'c', 'd'],
      tokens: {},
    });
  });
});
