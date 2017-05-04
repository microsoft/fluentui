import { defaultFontStyles } from '../styles/defaultFontStyles';
import { IFontStyles } from '../styles/fontStyles';
import { IColorStyles, defaultColorStyles } from '../styles/colorStyles';

export interface ITheme {
  colors?: IColorStyles;
  fonts?: IFontStyles;
}

const _theme: ITheme = {
  colors: defaultColorStyles,
  fonts: defaultFontStyles
};

/**
 * Gets the theme object.
 */
export function getTheme(): ITheme {
  return _theme;
}

/**
 * Mixes the given theme settings into the current theme object.
 */
export function loadTheme(theme: ITheme): void {
  _theme.colors =  {..._theme.colors, ...theme.colors};
  _theme.fonts = {..._theme.fonts, ...theme.fonts};
}
