import { Customizations } from '@uifabric/utilities/lib/Customizations';
import {
  IPalette,
  ISemanticColors,
  ITheme,
  IPartialTheme
} from '../interfaces/index';
import {
  DefaultFontStyles
} from './DefaultFontStyles';
import {
  DefaultPalette
} from './DefaultPalette';
import { loadTheme as legacyLoadTheme } from '@microsoft/load-themed-styles';

let _theme: ITheme = {
  palette: DefaultPalette,
  semanticColors: _makeSemanticColorsFromPalette(DefaultPalette, false),
  fonts: DefaultFontStyles,
  isInverted: false
};

export const ThemeSettingName = 'theme';

if (!Customizations.getSettings([ThemeSettingName]).theme) {
  let win = typeof window !== 'undefined' ? window : undefined;

  // tslint:disable:no-string-literal no-any
  if (win && (win as any)['FabricConfig'] && (win as any)['FabricConfig'].theme) {
    _theme = createTheme((win as any)['FabricConfig'].theme);
  }
  // tslint:enable:no-string-literal no-any

  // Set the default theme.
  Customizations.applySettings({ [ThemeSettingName]: _theme });
}

/**
 * Gets the theme object.
 */
export function getTheme(): ITheme {
  return _theme;
}

/**
 * Applies the theme, while filling in missing slots.
 */
export function loadTheme(theme: IPartialTheme): ITheme {
  _theme = createTheme(theme);

  // Invoke the legacy method of theming the page as well.
  legacyLoadTheme({ ..._theme.palette, ..._theme.semanticColors });

  Customizations.applySettings({ [ThemeSettingName]: _theme });

  return _theme;
}

/**
 * Creates a custom theme definition which can be used with the Customizer.
 */
export function createTheme(theme: IPartialTheme): ITheme {
  let newPalette = { ...DefaultPalette, ...theme.palette };

  if (!theme.palette || !theme.palette.accent) {
    newPalette.accent = newPalette.themePrimary;
  }

  return {
    palette: newPalette,
    fonts: {
      ...DefaultFontStyles,
      ...theme.fonts
    },
    semanticColors: { ..._makeSemanticColorsFromPalette(newPalette, !!theme.isInverted), ...theme.semanticColors },
    isInverted: !!theme.isInverted
  } as ITheme;
}

// Generates all the semantic slot colors based on the Fabric palette.
// We'll use these as fallbacks for semantic slots that the passed in theme did not define.
function _makeSemanticColorsFromPalette(p: IPalette, isInverted: boolean): ISemanticColors {
  return {
    bodyBackground: p.white,
    bodyText: p.neutralPrimary,
    bodyTextChecked: p.black,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralLight,

    disabledBackground: p.neutralLighter,
    disabledText: p.neutralTertiary,
    disabledBodyText: p.neutralTertiaryAlt,
    disabledSubtext: p.neutralQuaternary,

    focusBorder: p.black,

    errorText: !isInverted ? p.redDark : '#ff5f5f',
    warningText: !isInverted ? '#333333' : '#ffffff',
    errorBackground: !isInverted ? 'rgba(232, 17, 35, .2)' : 'rgba(232, 17, 35, .5)',
    blockingBackground: !isInverted ? 'rgba(234, 67, 0, .2)' : 'rgba(234, 67, 0, .5)',
    warningBackground: !isInverted ? 'rgba(255, 185, 0, .2)' : 'rgba(255, 251, 0, .6)',
    warningHighlight: !isInverted ? '#ffb900' : '#fff100',
    successBackground: !isInverted ? 'rgba(186, 216, 10, .2)' : 'rgba(186, 216, 10, .4)',

    inputBorder: p.neutralTertiary,
    inputBorderHovered: p.neutralPrimary,
    inputBackground: p.white,
    inputBackgroundChecked: p.themePrimary,
    inputBackgroundCheckedHovered: p.themeDarkAlt,
    inputForegroundChecked: p.white,
    inputFocusBorderAlt: p.themePrimary,

    buttonBackground: p.neutralLighter,
    buttonBackgroundChecked: p.neutralTertiaryAlt,
    buttonBackgroundHovered: p.neutralLight,
    buttonBackgroundCheckedHovered: p.neutralLight,
    buttonBorder: 'transparent',
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.black,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.black,

    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundChecked: p.neutralQuaternaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePrimary,

    listBackground: p.white,
    listTextColor: p.neutralPrimary,
    listItemBackgroundHovered: p.neutralLighter,
    listItemBackgroundChecked: p.neutralLight,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt
  };
}

/* Variants
 * Variants are variations of the base theme. These are currently in development.
 */

// a variant where the background is a light tint of the theme color
function _getTintVariant(theme?: IPartialTheme) {
  let fullTheme: ITheme; // only exists for typesafety
  if (theme) {
    fullTheme = createTheme(theme);
  } else {
    fullTheme = _theme;
  }

  // commented lines are unchanged, but left in for tracking purposes
  let basePalette: Partial<IPalette> = {
    // theme
    // themeDarker: '#004578',
    // themeDark: '#005a9e',
    // themeDarkAlt: '#106ebe',
    // themePrimary: '#0078d7',
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
    // neutralTertiaryAlt: '#c8c8c8',
    // neutralQuaternary: '#d0d0d0',
    // neutralQuaternaryAlt: '#dadada',
    // neutralLight: '#eaeaea',
    // neutralLighter: '#f4f4f4',
    // neutralLighterAlt: '#f8f8f8',
    white: fullTheme.palette.themeLighterAlt
  };

  let palette: IPalette = { ...fullTheme.palette, ...basePalette };

  let partialSemantic: Partial<ISemanticColors> = {
    bodyBackground: fullTheme.palette.themeLighterAlt,

    inputBorder: fullTheme.palette.themeLighter, // should this be transparent?
    // inputBorderHovered: p.neutralPrimary,
    inputBackground: fullTheme.palette.themeLighter,
    inputBackgroundCheckedHovered: p.themeDarkAlt,
    inputForegroundChecked: p.white,
    inputFocusBorderAlt: p.themePrimary,

    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundChecked: p.neutralQuaternaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePrimary,

    listBackground: p.white,
    listTextColor: p.neutralPrimary,
    listItemBackgroundHovered: p.neutralLighter,
    listItemBackgroundChecked: p.neutralLight,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt
  }

  let semantic: ISemanticColors = _makeSemanticColorsFromPalette(palette, _theme.isInverted);
}

// a variant where the background is a strong shade of the theme color, and inverted
function _getStrongVariant(theme?: IPartialTheme) {
  if (theme) {
    theme = createTheme(theme);
  } else {
    theme = _theme;
  }

  let fullTheme: ITheme = theme as ITheme; // only exists for typesafety

  // commented lines are unchanged, but left in for tracking purposes
  let basePalette: Partial<IPalette> = {
    // theme
    // themeDarker: '#004578',
    // themeDark: '#005a9e',
    // themeDarkAlt: '#106ebe',
    // themePrimary: '#0078d7',
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
    // neutralTertiaryAlt: '#c8c8c8',
    // neutralQuaternary: '#d0d0d0',
    // neutralQuaternaryAlt: '#dadada',
    // neutralLight: '#eaeaea',
    // neutralLighter: '#f4f4f4',
    // neutralLighterAlt: '#f8f8f8',
    white: fullTheme.palette.themeLighterAlt
  };

  let palette: IPalette = { ...fullTheme.palette, ...basePalette };

  let semantic: ISemanticColors = _makeSemanticColorsFromPalette(palette, !_theme.isInverted);
}