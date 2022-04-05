import { createTheme } from './createTheme';
import { mergeThemes } from './mergeThemes';

describe('mergeThemes', () => {
  it('can merge themes', () => {
    expect(
      mergeThemes(createTheme({ semanticColors: { errorText: 'yellow' } }), { palette: { themePrimary: 'red' } }),
    ).toMatchSnapshot();
  });
});
