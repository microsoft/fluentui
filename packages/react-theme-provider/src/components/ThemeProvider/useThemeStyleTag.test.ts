import { resetIdsForTests } from '@fluentui/react-utilities';
import { renderHook } from '@testing-library/react-hooks';
import { useThemeStyleTag } from './useThemeStyleTag';
import { themeToCSSVariables, Theme } from '@fluentui/react-theme';

jest.mock('@fluentui/react-theme');

describe('useThemeStyleTag', () => {
  const emptyTheme = ({} as unknown) as Theme;

  const testCssVariables: ReturnType<typeof themeToCSSVariables> = {
    '--css-variable-1': '1',
    '--css-variable-2': '2',
  };

  beforeEach(() => {
    (themeToCSSVariables as jest.Mock).mockReset();
    (themeToCSSVariables as jest.Mock).mockReturnValue(testCssVariables);
  });

  afterEach(() => {
    resetIdsForTests();
  });

  it('should render style tag', () => {
    // Act
    const { result } = renderHook(() => useThemeStyleTag({ theme: emptyTheme, targetDocument: document }));

    // Assert
    expect(document.getElementById(result.current)).not.toBeNull();
  });

  it('should remove style tag on unmount', () => {
    // Arrange
    const { result, unmount } = renderHook(() => useThemeStyleTag({ theme: emptyTheme, targetDocument: document }));

    // Act
    unmount();

    // Assert
    expect(document.getElementById(result.current)).toBeNull();
  });

  it('should render css variables in theme', () => {
    // Act
    const { result } = renderHook(() => useThemeStyleTag({ theme: emptyTheme, targetDocument: document }));

    // Assert
    const tag = document.getElementById(result.current) as HTMLStyleElement;
    const sheet = tag.sheet as CSSStyleSheet;
    const rule = sheet.cssRules[0] as CSSStyleRule;

    expect(rule.selectorText).toEqual(`.${result.current}`);
    expect(themeToCSSVariables).toHaveBeenCalledTimes(1);
    expect(rule.cssText).toMatchInlineSnapshot(`".theme-provider1 {--css-variable-1: 1; --css-variable-2: 2;}"`);
  });

  it('should update style tag on theme change', () => {
    // Arrange
    let theme = emptyTheme;
    const { result, rerender } = renderHook(() => useThemeStyleTag({ theme, targetDocument: document }));

    // Act
    theme = { ...emptyTheme };
    (themeToCSSVariables as jest.Mock).mockReturnValue({ '--css-variable-update': 'xxx' });
    rerender();

    // Assert
    const tag = document.getElementById(result.current) as HTMLStyleElement;
    const sheet = tag.sheet as CSSStyleSheet;
    const rule = sheet.cssRules[0] as CSSStyleRule;
    expect(themeToCSSVariables).toHaveBeenCalledTimes(2);
    expect(rule.selectorText).toEqual(`.${result.current}`);
    expect(rule.cssText).toMatchInlineSnapshot(`".theme-provider1 {--css-variable-update: xxx;}"`);
  });
});
