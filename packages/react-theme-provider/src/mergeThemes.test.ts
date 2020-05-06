import { mergeThemes } from './mergeThemes';
import { createDefaultTheme } from './createDefaultTheme';

describe('mergeThemes', () => {
  it('fills in blanks', () => {
    expect(mergeThemes({})).toMatchSnapshot();
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
    ).toMatchSnapshot();
  });

  it('can merge stylesheets', () => {
    expect(mergeThemes({ stylesheets: ['a', 'b'] }, { stylesheets: ['c', 'd'] })).toEqual({
      ...createDefaultTheme(),
      stylesheets: ['a', 'b', 'c', 'd'],
    });
  });
});
