import {
  IPalette,
  ISemanticColors,
  ITheme,
  IPartialTheme
} from '@uifabric/styling';
import { createTheme } from '@uifabric/styling';

/* Variants
 * Variants are themes based off the current theme.
 * Each variant is a subset of the current theme, rearranging slots to create a theme of a different style.
 * Variants are meant to be applied to sections of a page, not the entire page.
 * They can be used to highlight or de-emphasize sections of a page.
 *
 * Variants are still under development.
 */

/**
 * A variant where the background a softer version of the primary color. Most other colors remain unchanged.
 *
 * @export
 * @param {IPartialTheme} theme the theme for which to build a variant for
 * @returns {ITheme} the variant theme
 */
export function getSoftVariant(theme: IPartialTheme): ITheme {
  const fullTheme = createTheme(theme);
  const p = fullTheme.palette;

  // commented lines are unchanged, but left in for tracking purposes
  // in a tint variant, most colors remain unchanged
  const partialPalette: Partial<IPalette> = {
    // theme
    // themeDarker: '#004578',
    // themeDark: '#005a9e',
    // themeDarkAlt: '#106ebe',
    // themePrimary: '#0078d4',
    // themeSecondary: '#2b88d8',
    // themeTertiary: '#71afe5',
    // themeLight: '#c7e0f4',
    // themeLighter: '#deecf9',
    // themeLighterAlt: '#eff6fc',

    // foregrounds
    // black: '#000000',
    // neutralDark: '#212121',
    // neutralPrimary: '#333333',
    // neutralPrimaryAlt: '#3c3c3c',
    // neutralSecondary: '#666666',
    // neutralTertiary: '#a6a6a6',

    // backgrounds
    // neutralTertiaryAlt: '#c8c8c8', // themeLighter?
    // neutralQuaternary: '#d0d0d0',
    // neutralQuaternaryAlt: '#dadada',
    // neutralLight: '#eaeaea',
    // neutralLighter: '#f4f4f4',
    // neutralLighterAlt: '#f8f8f8',
    white: p.themeLighterAlt
  };

  const partialSemantic: Partial<ISemanticColors> = {
    bodyBackground: p.themeLighterAlt,

    inputBorder: p.themeLighter,
    // inputBorderHovered: p.neutralPrimary,
    inputBackground: p.themeLighter,
    // inputBackgroundChecked: p.themePrimary,
    // inputBackgroundCheckedHovered: p.themeDarkAlt,
    inputForegroundChecked: p.themeLighterAlt,
    // inputFocusBorderAlt: p.themePrimary,
  };

  return createTheme({ ...theme, ...{ palette: partialPalette, semanticColors: partialSemantic } });
}

/**
 * A variant where the background is a strong version of the primary color. All colors change.
 * The background becomes shades of the primary color.
 * The foreground/text becomes shades of the background color.
 * The primary color becomes shades of the background.
 *
 * @export
 * @param {IPartialTheme} theme the theme for which to build a variant for
 * @returns {ITheme} the variant theme
 */
export function getStrongVariant(theme: IPartialTheme): ITheme {
  const fullTheme = createTheme(theme);
  const p = fullTheme.palette;

  // dirty algorithm:
  // in a tricolor theme, foreground doesn't get used?
  // theme colors -> background shades
  // foregrounds -> background shades
  // backgrounds -> theme colors
  const partialPalette: Partial<IPalette> = {
    // theme
    themeDarker: p.white,
    themeDark: p.neutralLighterAlt,
    themeDarkAlt: p.neutralLighterAlt,
    themePrimary: p.white,
    themeSecondary: p.neutralLighter,
    themeTertiary: p.neutralLight,
    themeLight: p.neutralQuaternaryAlt,
    themeLighter: p.neutralQuaternary,
    themeLighterAlt: p.neutralTertiaryAlt,

    // foregrounds
    black: p.neutralLighterAlt,
    neutralDark: p.neutralLighter,
    neutralPrimary: p.white,
    neutralPrimaryAlt: p.neutralLight,
    neutralSecondary: p.neutralQuaternaryAlt,
    neutralTertiary: p.neutralQuaternary,

    // backgrounds
    neutralTertiaryAlt: p.themeLighterAlt,
    neutralQuaternary: p.themeLighter,
    neutralQuaternaryAlt: p.themeLight,
    neutralLight: p.themeTertiary,
    neutralLighter: p.themeSecondary,
    neutralLighterAlt: p.themePrimary,
    white: p.themeDarkAlt
  };

  const partialSemantic: Partial<ISemanticColors> = {
    bodyBackground: p.themeDarkAlt,
    bodyText: p.white,

    inputBorder: p.themeDark,
    // inputBorderHovered: p.neutralPrimary,
    inputBackground: p.themeDark,
    inputBackgroundChecked: p.white,
    // inputBackgroundCheckedHovered: p.themeDarkAlt,
    inputForegroundChecked: p.themeDark,
    // inputFocusBorderAlt: p.themePrimary,
  };

  return createTheme({ ...theme, ...{ palette: partialPalette, semanticColors: partialSemantic } });
}