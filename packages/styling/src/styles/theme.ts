import { assign } from '@uifabric/utilities';
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

export function getTheme(): ITheme {
  return _theme;
}

export function setTheme(theme: ITheme): void {
  _theme = {
    colors: assign({}, _theme.colors, theme.colors),
    fonts: assign({}, _theme.fonts, theme.fonts)
  };
}

export function addThemeChange(callback: (newTheme: ITheme) => void): void {

}