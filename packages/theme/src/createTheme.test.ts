import { createTheme } from './createTheme';
import { DefaultFontStyles } from './fonts/index';
import type { IRawStyle } from '@fluentui/merge-styles';

describe('createTheme', () => {
  it('create default theme', () => {
    expect(createTheme()).toMatchSnapshot();
  });

  it('maps semantic colors', () => {
    expect(createTheme({ palette: { themePrimary: 'red' } })).toMatchSnapshot();
  });

  it('inverted theme', () => {
    expect(createTheme({ isInverted: true })).toMatchSnapshot();
  });

  it('applies defaultFontStyle to fonts and retains all other default values', () => {
    const defaultFontStyle: IRawStyle = { fontFamily: 'Segoe UI' };
    const userTheme = { defaultFontStyle: defaultFontStyle };
    const newTheme = createTheme(userTheme);

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
    const userTheme = { defaultFontStyle: defaultFontStyle, fonts: { small: { fontSize: '20px' } } };
    const newTheme = createTheme(userTheme);

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
    const newTheme = createTheme(userTheme);

    expect(newTheme.fonts.small.fontSize).toEqual('20px');
    expect(defaultFontStyles.small.fontSize).toEqual(DefaultFontStyles.small.fontSize);
  });

  it('does not overwrite customized semantic slots', () => {
    const userTheme = {
      semanticColors: {
        cardShadowHovered: 'hello world',
      },
    };
    const newTheme = createTheme(userTheme);

    expect(newTheme.semanticColors.cardShadowHovered).toEqual('hello world');
  });
});
