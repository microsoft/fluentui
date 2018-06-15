import { ITypography } from './ITypography';

export type ISwatch = string;

export interface ISwatches {
  themeDarker: ISwatch;
  themeDark: ISwatch;
  themeDarkAlt: ISwatch;
  themePrimary: ISwatch;
  themeSecondary: ISwatch;
  themeTertiary: ISwatch;
  themeLight: ISwatch;
  themeLighter: ISwatch;
  themeLighterAlt: ISwatch;
  black: ISwatch;
  blackTranslucent40: ISwatch;
  neutralDark: ISwatch;
  neutralPrimary: ISwatch;
  neutralPrimaryAlt: ISwatch;
  neutralSecondary: ISwatch;
  neutralTertiary: ISwatch;
  neutralTertiaryAlt: ISwatch;
  neutralQuaternary: ISwatch;
  neutralQuaternaryAlt: ISwatch;
  neutralLight: ISwatch;
  neutralLighter: ISwatch;
  neutralLighterAlt: ISwatch;
  accent: ISwatch;
  white: ISwatch;
  whiteTranslucent40: ISwatch;
  yellow: ISwatch;
  yellowLight: ISwatch;
  orange: ISwatch;
  orangeLight: ISwatch;
  orangeLighter: ISwatch;
  redDark: ISwatch;
  red: ISwatch;
  magentaDark: ISwatch;
  magenta: ISwatch;
  magentaLight: ISwatch;
  purpleDark: ISwatch;
  purple: ISwatch;
  purpleLight: ISwatch;
  blueDark: ISwatch;
  blueMid: ISwatch;
  blue: ISwatch;
  blueLight: ISwatch;
  tealDark: ISwatch;
  teal: ISwatch;
  tealLight: ISwatch;
  greenDark: ISwatch;
  green: ISwatch;
  greenLight: ISwatch;
}

export type ISwatchRef = keyof ISwatches;

export interface IScheme {
  background: ISwatchRef;
  text: ISwatchRef;
  link: ISwatchRef;
  linkVisited: ISwatchRef;
}

export interface ITheme {
  swatches: ISwatches;
  schemes: { [key: string]: IScheme };
  typography: ITypography;
}
