import { webLightTheme } from './themes/web/lightTheme';
import { themeToTokensObject } from './themeToTokensObject';
import { tokens } from './tokens';
import { Theme } from './types';

function assertKeys(generatedTokens: Record<keyof Theme, string>, expectedTokens = tokens) {
  Object.keys(generatedTokens).forEach(token => {
    expect(expectedTokens).toHaveProperty(token);
    expect.objectContaining({
      [token]: expect.stringMatching(`var\\(--${token}(, .+)?\\)`),
    });
  });
}

describe('themeToTokensObject', () => {
  it('passing any of our default themes to the function generates the default tokens object', () => {
    const generatedTokens = themeToTokensObject(webLightTheme);

    assertKeys(generatedTokens);
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

    assertKeys(generatedTokens, expectedTokens);
  });
});
