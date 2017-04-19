import { getTheme } from '../utilities/theme';

/**
 * UI Fabric color palette.
 */
export interface IColorStyles {
  themeDarker?: string;
  themeDark?: string;
  themeDarkAlt?: string;
  themePrimary?: string;
  themeSecondary?: string;
  themeTertiary?: string;
  themeLight?: string;
  themeLighter?: string;
  themeLighterAlt?: string;
  black?: string;
  blackTranslucent40?: string;
  neutralDark?: string;
  neutralPrimary?: string;
  neutralPrimaryAlt?: string;
  neutralSecondary?: string;
  neutralSecondaryAlt?: string;
  neutralTertiary?: string;
  neutralTertiaryAlt?: string;
  neutralQuaternary?: string;
  neutralQuaternaryAlt?: string;
  neutralLight?: string;
  neutralLighter?: string;
  neutralLighterAlt?: string;
  white?: string;
  whiteTranslucent40?: string;
  yellow?: string;
  yellowLight?: string;
  orange?: string;
  orangeLight?: string;
  orangeLighter?: string;
  redDark?: string;
  red?: string;
  magentaDark?: string;
  magenta?: string;
  magentaLight?: string;
  purpleDark?: string;
  purple?: string;
  purpleLight?: string;
  blueDark?: string;
  blueMid?: string;
  blue?: string;
  blueLight?: string;
  tealDark?: string;
  teal?: string;
  tealLight?: string;
  greenDark?: string;
  green?: string;
  greenLight?: string;
}

export const defaultColorStyles: IColorStyles = {
  themeDarker: '#004578',
  themeDark: '#005a9e',
  themeDarkAlt: '#106ebe',
  themePrimary: '#0078d7',
  themeSecondary: '#2b88d8',
  themeTertiary: '#71afe5',
  themeLight: '#c7e0f4',
  themeLighter: '#deecf9',
  themeLighterAlt: '#eff6fc',
  black: '#000000',
  blackTranslucent40: 'rgba(0,0,0,.4)',
  neutralDark: '#212121',
  neutralPrimary: '#333333',
  neutralPrimaryAlt: '#3c3c3c',
  neutralSecondary: '#666666',
  neutralSecondaryAlt: '#767676',
  neutralTertiary: '#a6a6a6',
  neutralTertiaryAlt: '#c8c8c8',
  neutralQuaternary: '#d0d0d0',
  neutralQuaternaryAlt: '#dadada',
  neutralLight: '#eaeaea',
  neutralLighter: '#f4f4f4',
  neutralLighterAlt: '#f8f8f8',
  white: '#ffffff',
  whiteTranslucent40: 'rgba(255,255,255,.4)',
  yellow: '#ffb900',
  yellowLight: '#fff100',
  orange: '#d83b01',
  orangeLight: '#ea4300',
  orangeLighter: '#ff8c00',
  redDark: '#a80000',
  red: '#e81123',
  magentaDark: '#5c005c',
  magenta: '#b4009e',
  magentaLight: '#e3008c',
  purpleDark: '#32145a',
  purple: '#5c2d91',
  purpleLight: '#b4a0ff',
  blueDark: '#002050',
  blueMid: '#00188f',
  blue: '#0078d7',
  blueLight: '#00bcf2',
  tealDark: '#004b50',
  teal: '#008272',
  tealLight: '#00b294',
  greenDark: '#004b1c',
  green: '#107c10',
  greenLight: '#bad80a'
};

export const colorStyles: IColorStyles = {};

for (const colorName in defaultColorStyles) {
  if (defaultColorStyles.hasOwnProperty(colorName)) {
    _defineColorGetter(colorStyles, colorName);
  }
}

/**
 * Defines a getter for the given class configuration.
 */
function _defineColorGetter(obj: IColorStyles, colorName: string): void {
  Object.defineProperty(obj, colorName, {
    get: (): string => getTheme().colors[colorName],
    enumerable: true,
    configurable: true
  });
}