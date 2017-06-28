import {
  IPalette,
  IFontStyles,
  ISemanticColors
} from '../interfaces/index';
import {
  DefaultFontStyles
} from './DefaultFontStyles';
import {
  DefaultPalette
} from './DefaultPalette';
import { Customizer, getWindow } from '@uifabric/utilities/lib/index';
export interface ITheme {
  palette: IPalette;
  fonts: IFontStyles;
  semanticColors?: ISemanticColors;
}
import { loadTheme as legacyLoadTheme } from '@microsoft/load-themed-styles';

let _theme: ITheme = {
  palette: DefaultPalette,
  semanticColors: _makeSemanticColorsFromPalette(DefaultPalette),
  fonts: DefaultFontStyles
};

let win = getWindow();

// tslint:disable:no-string-literal no-any
if (win && (win as any)['FabricConfig'] && (win as any)['FabricConfig'].theme) {
  _theme = createTheme((win as any)['FabricConfig'].theme);
}
// tslint:enable:no-string-literal no-any

Customizer.setDefault('theme', _theme);

/**
 * Gets the theme object.
 */
export function getTheme(): ITheme {
  return _theme;
}

/**
 * Loads the default global theme definition.
 */
export function loadTheme(theme: Partial<ITheme>): void {
  _theme = createTheme(theme);

  // Load the legacy theme from the palette.
  legacyLoadTheme(_theme.palette as {});

  Customizer.setDefault('theme', _theme);
}

/**
 * Creates a custom theme definition which can be used with the Customizer.
 */
export function createTheme(theme: Partial<ITheme>): ITheme {
  let newPalette = { ..._theme.palette, ...theme.palette };

  return {
    palette: newPalette,
    fonts: {
      ..._theme.fonts,
      ...theme.fonts
    },
    semanticColors: { ..._makeSemanticColorsFromPalette(newPalette), ...theme.semanticColors }
  } as ITheme;
}

// Generates all the semantic slot colors based on the Fabric palette.
// We'll use these as fallbacks for semantic slots that the passed in theme did not define.
function _makeSemanticColorsFromPalette(p: IPalette): ISemanticColors {
  return {
    bodyBackground: p.white,
    bodyText: p.neutralPrimary,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralLight,

    disabledBackground: p.neutralLighter,
    disabledText: p.neutralTertiaryAlt,
    disabledSubtext: p.neutralQuaternary,

    focusBorder: p.black,

    // errorBackground: todo,
    errorText: p.redDark,

    inputBorder: p.neutralTertiary,
    inputBorderHovered: p.neutralPrimary,
    inputBackgroundChecked: p.themePrimary,
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
    listItemBackgroundChecked: p.neutralQuaternary,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt
  };
}
