import * as assign from 'object-assign';
import {
  IPalette,
  IFontStyles
} from '../interfaces/index';
import {
  DefaultPalette,
  DefaultFontStyles
} from '../styles/index';

export interface ITheme {
  palette: IPalette;
  fonts: IFontStyles;
}

const _theme: ITheme = {
  palette: DefaultPalette,
  fonts: DefaultFontStyles
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
  _theme.palette = assign({}, _theme.palette, theme.palette);
  _theme.fonts = assign({}, _theme.fonts, theme.fonts);
}
