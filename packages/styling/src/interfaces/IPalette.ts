/**
 * UI Fabric color palette.
 */
export interface IPalette {
  black: string; /* The strongest color, which is black in default theme and very light in inverted themes. */
  white: string;

  /**
   * Colors that will be deprecated by Fluent.
   */
  themeDarker: string;
  themeDark: string;
  themeDarkAlt: string;
  themePrimary: string;
  themeSecondary: string;
  themeTertiary: string;
  themeLight: string;
  themeLighter: string;
  themeLighterAlt: string;
  blackTranslucent40: string;
  neutralDark: string;
  neutralPrimary: string;
  neutralPrimaryAlt: string;
  neutralSecondary: string;
  neutralTertiary: string;
  neutralTertiaryAlt: string;
  neutralQuaternary: string;
  neutralQuaternaryAlt: string;
  neutralLight: string;
  neutralLighter: string;
  neutralLighterAlt: string;
  accent: string;
  whiteTranslucent40: string;
  yellow: string;
  yellowLight: string;
  orange: string;
  orangeLight: string;
  orangeLighter: string;
  redDark: string;
  red: string;
  magentaDark: string;
  magenta: string;
  magentaLight: string;
  purpleDark: string;
  purple: string;
  purpleLight: string;
  blueDark: string;
  blueMid: string;
  blue: string;
  blueLight: string;
  tealDark: string;
  teal: string;
  tealLight: string;
  greenDark: string;
  green: string;
  greenLight: string;
}
