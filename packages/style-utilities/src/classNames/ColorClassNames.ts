import { mergeStyles } from '@fluentui/merge-styles';
import { DefaultPalette } from '../styles/DefaultPalette';
import { getTheme } from '../styles/index';
import type { IRawStyle } from '@fluentui/merge-styles';

/**
 * {@docCategory IColorClassNames}
 */
export interface IColorClassNames {
  themeDarker: string;
  themeDarkerHover: string;
  themeDarkerBackground: string;
  themeDarkerBackgroundHover: string;
  themeDarkerBorder: string;
  themeDarkerBorderHover: string;
  themeDark: string;
  themeDarkHover: string;
  themeDarkBackground: string;
  themeDarkBackgroundHover: string;
  themeDarkBorder: string;
  themeDarkBorderHover: string;
  themeDarkAlt: string;
  themeDarkAltHover: string;
  themeDarkAltBackground: string;
  themeDarkAltBackgroundHover: string;
  themeDarkAltBorder: string;
  themeDarkAltBorderHover: string;
  themePrimary: string;
  themePrimaryHover: string;
  themePrimaryBackground: string;
  themePrimaryBackgroundHover: string;
  themePrimaryBorder: string;
  themePrimaryBorderHover: string;
  themeSecondary: string;
  themeSecondaryHover: string;
  themeSecondaryBackground: string;
  themeSecondaryBackgroundHover: string;
  themeSecondaryBorder: string;
  themeSecondaryBorderHover: string;
  themeTertiary: string;
  themeTertiaryHover: string;
  themeTertiaryBackground: string;
  themeTertiaryBackgroundHover: string;
  themeTertiaryBorder: string;
  themeTertiaryBorderHover: string;
  themeLight: string;
  themeLightHover: string;
  themeLightBackground: string;
  themeLightBackgroundHover: string;
  themeLightBorder: string;
  themeLightBorderHover: string;
  themeLighter: string;
  themeLighterHover: string;
  themeLighterBackground: string;
  themeLighterBackgroundHover: string;
  themeLighterBorder: string;
  themeLighterBorderHover: string;
  themeLighterAlt: string;
  themeLighterAltHover: string;
  themeLighterAltBackground: string;
  themeLighterAltBackgroundHover: string;
  themeLighterAltBorder: string;
  themeLighterAltBorderHover: string;
  black: string;
  blackHover: string;
  blackBackground: string;
  blackBackgroundHover: string;
  blackBorder: string;
  blackBorderHover: string;
  blackTranslucent40: string;
  blackTranslucent40Hover: string;
  blackTranslucent40Background: string;
  blackTranslucent40BackgroundHover: string;
  blackTranslucent40Border: string;
  blackTranslucent40BorderHover: string;
  neutralDark: string;
  neutralDarkHover: string;
  neutralDarkBackground: string;
  neutralDarkBackgroundHover: string;
  neutralDarkBorder: string;
  neutralDarkBorderHover: string;
  neutralPrimary: string;
  neutralPrimaryHover: string;
  neutralPrimaryBackground: string;
  neutralPrimaryBackgroundHover: string;
  neutralPrimaryBorder: string;
  neutralPrimaryBorderHover: string;
  neutralPrimaryAlt: string;
  neutralPrimaryAltHover: string;
  neutralPrimaryAltBackground: string;
  neutralPrimaryAltBackgroundHover: string;
  neutralPrimaryAltBorder: string;
  neutralPrimaryAltBorderHover: string;
  neutralSecondary: string;
  neutralSecondaryHover: string;
  neutralSecondaryBackground: string;
  neutralSecondaryBackgroundHover: string;
  neutralSecondaryBorder: string;
  neutralSecondaryBorderHover: string;
  neutralSecondaryAlt: string;
  neutralSecondaryAltHover: string;
  neutralSecondaryAltBackground: string;
  neutralSecondaryAltBackgroundHover: string;
  neutralSecondaryAltBorder: string;
  neutralSecondaryAltBorderHover: string;
  neutralTertiary: string;
  neutralTertiaryHover: string;
  neutralTertiaryBackground: string;
  neutralTertiaryBackgroundHover: string;
  neutralTertiaryBorder: string;
  neutralTertiaryBorderHover: string;
  neutralTertiaryAlt: string;
  neutralTertiaryAltHover: string;
  neutralTertiaryAltBackground: string;
  neutralTertiaryAltBackgroundHover: string;
  neutralTertiaryAltBorder: string;
  neutralTertiaryAltBorderHover: string;
  neutralQuaternary: string;
  neutralQuaternaryHover: string;
  neutralQuaternaryBackground: string;
  neutralQuaternaryBackgroundHover: string;
  neutralQuaternaryBorder: string;
  neutralQuaternaryBorderHover: string;
  neutralQuaternaryAlt: string;
  neutralQuaternaryAltHover: string;
  neutralQuaternaryAltBackground: string;
  neutralQuaternaryAltBackgroundHover: string;
  neutralQuaternaryAltBorder: string;
  neutralQuaternaryAltBorderHover: string;
  neutralLight: string;
  neutralLightHover: string;
  neutralLightBackground: string;
  neutralLightBackgroundHover: string;
  neutralLightBorder: string;
  neutralLightBorderHover: string;
  neutralLighter: string;
  neutralLighterHover: string;
  neutralLighterBackground: string;
  neutralLighterBackgroundHover: string;
  neutralLighterBorder: string;
  neutralLighterBorderHover: string;
  neutralLighterAlt: string;
  neutralLighterAltHover: string;
  neutralLighterAltBackground: string;
  neutralLighterAltBackgroundHover: string;
  neutralLighterAltBorder: string;
  neutralLighterAltBorderHover: string;
  white: string;
  whiteHover: string;
  whiteBackground: string;
  whiteBackgroundHover: string;
  whiteBorder: string;
  whiteBorderHover: string;
  whiteTranslucent40: string;
  whiteTranslucent40Hover: string;
  whiteTranslucent40Background: string;
  whiteTranslucent40BackgroundHover: string;
  whiteTranslucent40Border: string;
  whiteTranslucent40BorderHover: string;
  yellow: string;
  yellowHover: string;
  yellowBackground: string;
  yellowBackgroundHover: string;
  yellowBorder: string;
  yellowBorderHover: string;
  yellowLight: string;
  yellowLightHover: string;
  yellowLightBackground: string;
  yellowLightBackgroundHover: string;
  yellowLightBorder: string;
  yellowLightBorderHover: string;
  orange: string;
  orangeHover: string;
  orangeBackground: string;
  orangeBackgroundHover: string;
  orangeBorder: string;
  orangeBorderHover: string;
  orangeLight: string;
  orangeLightHover: string;
  orangeLightBackground: string;
  orangeLightBackgroundHover: string;
  orangeLightBorder: string;
  orangeLightBorderHover: string;
  orangeLighter: string;
  orangeLighterHover: string;
  orangeLighterBackground: string;
  orangeLighterBackgroundHover: string;
  orangeLighterBorder: string;
  orangeLighterBorderHover: string;
  redDark: string;
  redDarkHover: string;
  redDarkBackground: string;
  redDarkBackgroundHover: string;
  redDarkBorder: string;
  redDarkBorderHover: string;
  red: string;
  redHover: string;
  redBackground: string;
  redBackgroundHover: string;
  redBorder: string;
  redBorderHover: string;
  magentaDark: string;
  magentaDarkHover: string;
  magentaDarkBackground: string;
  magentaDarkBackgroundHover: string;
  magentaDarkBorder: string;
  magentaDarkBorderHover: string;
  magenta: string;
  magentaHover: string;
  magentaBackground: string;
  magentaBackgroundHover: string;
  magentaBorder: string;
  magentaBorderHover: string;
  magentaLight: string;
  magentaLightHover: string;
  magentaLightBackground: string;
  magentaLightBackgroundHover: string;
  magentaLightBorder: string;
  magentaLightBorderHover: string;
  purpleDark: string;
  purpleDarkHover: string;
  purpleDarkBackground: string;
  purpleDarkBackgroundHover: string;
  purpleDarkBorder: string;
  purpleDarkBorderHover: string;
  purple: string;
  purpleHover: string;
  purpleBackground: string;
  purpleBackgroundHover: string;
  purpleBorder: string;
  purpleBorderHover: string;
  purpleLight: string;
  purpleLightHover: string;
  purpleLightBackground: string;
  purpleLightBackgroundHover: string;
  purpleLightBorder: string;
  purpleLightBorderHover: string;
  blueDark: string;
  blueDarkHover: string;
  blueDarkBackground: string;
  blueDarkBackgroundHover: string;
  blueDarkBorder: string;
  blueDarkBorderHover: string;
  blueMid: string;
  blueMidHover: string;
  blueMidBackground: string;
  blueMidBackgroundHover: string;
  blueMidBorder: string;
  blueMidBorderHover: string;
  blue: string;
  blueHover: string;
  blueBackground: string;
  blueBackgroundHover: string;
  blueBorder: string;
  blueBorderHover: string;
  blueLight: string;
  blueLightHover: string;
  blueLightBackground: string;
  blueLightBackgroundHover: string;
  blueLightBorder: string;
  blueLightBorderHover: string;
  tealDark: string;
  tealDarkHover: string;
  tealDarkBackground: string;
  tealDarkBackgroundHover: string;
  tealDarkBorder: string;
  tealDarkBorderHover: string;
  teal: string;
  tealHover: string;
  tealBackground: string;
  tealBackgroundHover: string;
  tealBorder: string;
  tealBorderHover: string;
  tealLight: string;
  tealLightHover: string;
  tealLightBackground: string;
  tealLightBackgroundHover: string;
  tealLightBorder: string;
  tealLightBorderHover: string;
  greenDark: string;
  greenDarkHover: string;
  greenDarkBackground: string;
  greenDarkBackgroundHover: string;
  greenDarkBorder: string;
  greenDarkBorderHover: string;
  green: string;
  greenHover: string;
  greenBackground: string;
  greenBackgroundHover: string;
  greenBorder: string;
  greenBorderHover: string;
  greenLight: string;
  greenLightHover: string;
  greenLightBackground: string;
  greenLightBackgroundHover: string;
  greenLightBorder: string;
  greenLightBorderHover: string;
}

export const ColorClassNames: IColorClassNames = {} as IColorClassNames;

for (const colorName in DefaultPalette) {
  if (DefaultPalette.hasOwnProperty(colorName)) {
    // Foreground color
    _defineGetter(ColorClassNames, colorName, '', false, 'color');

    // Hover color
    _defineGetter(ColorClassNames, colorName, 'Hover', true, 'color');

    // Background color
    _defineGetter(ColorClassNames, colorName, 'Background', false, 'background');

    // Background hover
    _defineGetter(ColorClassNames, colorName, 'BackgroundHover', true, 'background');

    // Border color
    _defineGetter(ColorClassNames, colorName, 'Border', false, 'borderColor');

    // Border hover color
    _defineGetter(ColorClassNames, colorName, 'BorderHover', true, 'borderColor');
  }
}

/**
 * Defines a getter for the given class configuration.
 */
function _defineGetter(
  obj: IColorClassNames,
  colorName: string,
  suffix: string,
  isHover: boolean,
  cssProperty: string,
): void {
  Object.defineProperty(obj, colorName + suffix, {
    get: (): string => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const style: IRawStyle = { [cssProperty]: (getTheme().palette as any)[colorName] };

      return mergeStyles(isHover ? { selectors: { ':hover': style } } : style).toString();
    },
    enumerable: true,
    configurable: true,
  });
}
