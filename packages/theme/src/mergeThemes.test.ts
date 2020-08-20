import { mergeThemes } from './mergeThemes';

describe('mergeThemes', () => {
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
    ).toMatchSnapshot();
  });
  it('can merge stylesheets', () => {
    expect(mergeThemes({ stylesheets: ['a', 'b'] }, { stylesheets: ['c', 'd'] })).toEqual({
      stylesheets: ['a', 'b', 'c', 'd'],
    });
  });
});
