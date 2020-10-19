import { createTheme } from './createTheme';
import { mergeThemes } from './mergeThemes';

describe('mergeThemes', () => {
  it('can merge themes', () => {
    expect(
      mergeThemes(createTheme({ semanticColors: { errorText: 'yellow' } }), { palette: { themePrimary: 'red' } }),
    ).toMatchSnapshot();
  });

  it('can merge stylesheets', () => {
    const { stylesheets } = mergeThemes(createTheme({ stylesheets: ['a', 'b'] }), { stylesheets: ['c', 'd'] });
    expect(stylesheets).toEqual(['a', 'b', 'c', 'd']);
  });
});
