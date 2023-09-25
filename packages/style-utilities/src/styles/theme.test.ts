import { registerOnThemeChangeCallback, removeOnThemeChangeCallback, loadTheme, getTheme } from './theme';
import { DefaultFontStyles } from './DefaultFontStyles';
import type { IRawStyle } from '@fluentui/merge-styles';

describe('registerOnThemeChangeCallback', () => {
  let callback = jest.fn();

  it('registers a callback successfully', () => {
    registerOnThemeChangeCallback(callback);
    expect(callback.mock.calls.length).toBe(0);
  });

  it('calls previously registered callback', () => {
    registerOnThemeChangeCallback(callback);
    loadTheme({});
    expect(callback.mock.calls.length).toBe(1);
  });

  it('calls the previously registered callback (again)', () => {
    registerOnThemeChangeCallback(callback);
    loadTheme({});
    loadTheme({});
    expect(callback.mock.calls.length).toBe(2);
  });

  it('unregisters the callback, and doesnt call it again', () => {
    registerOnThemeChangeCallback(callback);
    loadTheme({});
    loadTheme({});
    removeOnThemeChangeCallback(callback);

    expect(callback.mock.calls.length).toBe(2);
    loadTheme({});
    expect(callback.mock.calls.length).toBe(2);
  });

  it('didnt pass null to the callback', () => {
    registerOnThemeChangeCallback(callback);
    loadTheme({});
    loadTheme({});

    expect(callback.mock.calls[0][0]).toBeTruthy();
    expect(callback.mock.calls[1][0]).toBeTruthy();
  });
});

describe('loadTheme', () => {
  describe('specify defaultFontStyle', () => {
    it('applies defaultFontStyle to fonts and retains all other default values', () => {
      const defaultFontStyle: IRawStyle = { fontFamily: 'Segoe UI' };
      const userTheme = { defaultFontStyle };
      loadTheme(userTheme);
      const newTheme = getTheme();

      expect(newTheme.fonts.tiny.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.xSmall.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.small.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.smallPlus.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.medium.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.mediumPlus.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.large.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.xLarge.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.xxLarge.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.superLarge.fontFamily).toEqual('Segoe UI');
      expect(newTheme.fonts.mega.fontFamily).toEqual('Segoe UI');

      expect(newTheme.fonts.tiny.fontSize).toEqual(DefaultFontStyles.tiny.fontSize);
      expect(newTheme.fonts.tiny.fontWeight).toEqual(DefaultFontStyles.tiny.fontWeight);
    });
    it('applies defaultFontStyle and fonts to theme and retains all other default values', () => {
      const defaultFontStyle: IRawStyle = { fontFamily: 'Foo', fontSize: '10px' };
      const userTheme = { defaultFontStyle, fonts: { small: { fontSize: '20px' } } };
      loadTheme(userTheme);
      const newTheme = getTheme();

      expect(newTheme.fonts.tiny.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.tiny.fontSize).toEqual('10px');
      expect(newTheme.fonts.tiny.fontWeight).toEqual(DefaultFontStyles.tiny.fontWeight);

      expect(newTheme.fonts.xSmall.fontFamily).toEqual('Foo');

      expect(newTheme.fonts.small.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.small.fontSize).toEqual('20px');
      expect(newTheme.fonts.small.fontWeight).toEqual(DefaultFontStyles.small.fontWeight);

      expect(newTheme.fonts.smallPlus.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.medium.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.mediumPlus.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.large.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.xLarge.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.xxLarge.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.superLarge.fontFamily).toEqual('Foo');

      expect(newTheme.fonts.mega.fontFamily).toEqual('Foo');
      expect(newTheme.fonts.mega.fontSize).toEqual('10px');
      expect(newTheme.fonts.mega.fontWeight).toEqual(DefaultFontStyles.mega.fontWeight);
    });
    it('applies fonts to theme and does not mutate the DefaultFontStyles object', () => {
      const defaultFontStyles = { ...DefaultFontStyles };

      const userTheme = { fonts: { small: { fontSize: '20px' } } };
      loadTheme(userTheme);
      const newTheme = getTheme();

      expect(newTheme.fonts.small.fontSize).toEqual('20px');
      expect(defaultFontStyles.small.fontSize).toEqual(DefaultFontStyles.small.fontSize);
    });
    it('does not overwrite customized semantic slots', () => {
      const userTheme = {
        semanticColors: {
          cardShadowHovered: 'hello world',
        },
      };
      loadTheme(userTheme);
      const newTheme = getTheme();

      expect(newTheme.semanticColors.cardShadowHovered).toEqual('hello world');
    });
  });
});
