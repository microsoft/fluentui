import * as assign from 'object-assign';
import { IFonts, fonts } from './fonts';
import { IColors, defaultPalette } from './colors';

export interface ITheme {
  colors?: IColors;
  fonts?: IFonts;
}

let _theme: ITheme = {
  colors: defaultPalette,
  fonts
};

/**
 * Gets the theme object.
 *
 * @export
 * @returns {ITheme}
 */
export function getTheme(): ITheme {
  return _theme;
}

/**
 * Mixes the given theme settings into the current theme object.
 *
 * @export
 * @param {ITheme} theme Partial theme overrides.
 */
export function setTheme(theme: ITheme): void {
  _theme = {
    colors: assign({}, _theme.colors, theme.colors),
    fonts: assign({}, _theme.fonts, theme.fonts)
  };
}
