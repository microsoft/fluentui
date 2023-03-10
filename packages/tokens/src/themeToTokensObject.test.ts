import { webLightTheme } from './themes/web/lightTheme';
import { themeToTokensObject } from './themeToTokensObject';
import { tokens } from './tokens';

describe('themeToTokensObject', () => {
  it('passing any of our default themes to the function generates the default tokens object', () => {
    const generatedTokens = themeToTokensObject(webLightTheme);
    expect(generatedTokens).toEqual(tokens);
  });

  it('passing a custom theme with custom tokens on top of a default theme generates the correct tokens object', () => {
    const customTheme = { ...webLightTheme, customColor1: 'red', customColor2: 'white', customColor3: 'black' };
    const expectedTokens = {
      ...tokens,
      customColor1: 'var(--customColor1)',
      customColor2: 'var(--customColor2)',
      customColor3: 'var(--customColor3)',
    };
    const generatedTokens = themeToTokensObject(customTheme);
    expect(generatedTokens).toEqual(expectedTokens);
  });
});
