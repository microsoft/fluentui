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
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralLight,

    disabledBackground: p.neutralLighter,
    disabledText: p.neutralTertiaryAlt,
    disabledSubtext: p.neutralQuaternary,

    focusBorder: p.black,

    errorBackground: !isInverted ? 'rgba(232, 17, 35, .2)' : 'rgba(232, 17, 35, .5)',
    errorText: !isInverted ? p.redDark : '#ff5f5f',
    blockingBackground: !isInverted ? 'rgba(234, 67, 0, .2)' : 'rgba(234, 67, 0, .5)',
    warningBackground: !isInverted ? 'rgba(255, 185, 0, .2)' : 'rgba(255, 251, 0, .6)',
    warningHighlight: !isInverted ? '#ffb900' : '#fff100',
    successBackground: !isInverted ? 'rgba(186, 216, 10, .2)' : 'rgba(186, 216, 10, .4)',

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
    listItemBackgroundChecked: p.neutralLight,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt
  };
}
