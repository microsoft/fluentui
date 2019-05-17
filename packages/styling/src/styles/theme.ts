import { Customizations, merge } from '@uifabric/utilities';
import { IPalette, ISemanticColors, ITheme, IPartialTheme, IFontStyles } from '../interfaces/index';
import { DefaultFontStyles } from './DefaultFontStyles';
import { DefaultPalette } from './DefaultPalette';
import { DefaultSpacing } from './DefaultSpacing';
import { loadTheme as legacyLoadTheme } from '@microsoft/load-themed-styles';
import { DefaultEffects } from './DefaultEffects';

let _theme: ITheme = createTheme({
  palette: DefaultPalette,
  semanticColors: _makeSemanticColorsFromPalette(DefaultPalette, false, false),
  fonts: DefaultFontStyles,
  isInverted: false,
  disableGlobalClassNames: false
});
let _onThemeChangeCallbacks: Array<(theme: ITheme) => void> = [];

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
 * Gets the theme object
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function getTheme(depComments: boolean = false): ITheme {
  if (depComments === true) {
    _theme = createTheme({}, depComments);
  }
  return _theme;
}

/**
 * Registers a callback that gets called whenever the theme changes.
 * This should only be used when the component cannot automatically get theme changes through its state.
 * This will not register duplicate callbacks.
 */
export function registerOnThemeChangeCallback(callback: (theme: ITheme) => void): void {
  if (_onThemeChangeCallbacks.indexOf(callback) === -1) {
    _onThemeChangeCallbacks.push(callback);
  }
}

/**
 * See registerOnThemeChangeCallback().
 * Removes previously registered callbacks.
 */
export function removeOnThemeChangeCallback(callback: (theme: ITheme) => void): void {
  const i = _onThemeChangeCallbacks.indexOf(callback);
  if (i === -1) {
    return;
  }

  _onThemeChangeCallbacks.splice(i, 1);
}

/**
 * Applies the theme, while filling in missing slots.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function loadTheme(theme: IPartialTheme, depComments: boolean = false): ITheme {
  _theme = createTheme(theme, depComments);

  // Invoke the legacy method of theming the page as well.
  legacyLoadTheme({ ..._theme.palette, ..._theme.semanticColors, ..._loadFonts(_theme) });

  Customizations.applySettings({ [ThemeSettingName]: _theme });

  _onThemeChangeCallbacks.forEach((callback: (theme: ITheme) => void) => {
    try {
      callback(_theme);
    } catch (e) {
      // don't let a bad callback break everything else
    }
  });

  return _theme;
}

/**
 * Loads font variables into a JSON object.
 * @param theme - The theme object
 */
function _loadFonts(theme: ITheme): { [name: string]: string } {
  const lines = {};

  for (const fontName of Object.keys(theme.fonts)) {
    const font = theme.fonts[fontName];
    for (const propName of Object.keys(font)) {
      const name = 'ms-font-' + fontName + '-' + propName;
      lines[name] = `"[theme:${name}, default: ${font[propName]}]"`;
    }
  }
  return lines;
}

/**
 * Creates a custom theme definition which can be used with the Customizer.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function createTheme(theme: IPartialTheme, depComments: boolean = false): ITheme {
  let newPalette = { ...DefaultPalette, ...theme.palette };

  if (!theme.palette || !theme.palette.accent) {
    newPalette.accent = newPalette.themePrimary;
  }

  // mix in custom overrides with good slots first, since custom overrides might be used in fixing deprecated slots
  let newSemanticColors = {
    ..._makeSemanticColorsFromPalette(newPalette, !!theme.isInverted, depComments),
    ...theme.semanticColors
  };

  let defaultFontStyles: IFontStyles = { ...DefaultFontStyles };

  if (theme.defaultFontStyle) {
    for (const fontStyle of Object.keys(defaultFontStyles)) {
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.defaultFontStyle);
    }
  }

  if (theme.fonts) {
    for (const fontStyle of Object.keys(theme.fonts)) {
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.fonts[fontStyle]);
    }
  }

  return {
    palette: newPalette,
    fonts: {
      ...defaultFontStyles
    },
    semanticColors: newSemanticColors,
    isInverted: !!theme.isInverted,
    disableGlobalClassNames: !!theme.disableGlobalClassNames,
    spacing: {
      ...DefaultSpacing,
      ...theme.spacing
    },
    effects: {
      ...DefaultEffects,
      ...theme.effects
    }
  };
}

/**
 * Helper to pull a given property name from a given set of sources, in order, if available. Otherwise returns the property name.
 */
function _expandFrom<TRetVal, TMapType>(propertyName: string | TRetVal | undefined, ...maps: TMapType[]): TRetVal {
  if (propertyName) {
    for (const map of maps) {
      if (map[propertyName as string]) {
        return map[propertyName as string];
      }
    }
  }

  return propertyName as TRetVal;
}

// Generates all the semantic slot colors based on the Fabric palette.
// We'll use these as fallbacks for semantic slots that the passed in theme did not define.
function _makeSemanticColorsFromPalette(p: IPalette, isInverted: boolean, depComments: boolean): ISemanticColors {
  let toReturn: ISemanticColors = {
    bodyBackground: p.white,
    bodyStandoutBackground: p.neutralLighterAlt,
    bodyFrameBackground: p.white,
    bodyFrameDivider: p.neutralLight,
    bodyText: p.neutralPrimary,
    bodyTextChecked: p.black,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralLight,

    disabledBackground: p.neutralLighter,
    disabledBorder: p.neutralTertiary,
    disabledText: p.neutralTertiary,
    disabledBodyText: p.neutralTertiary,
    disabledSubtext: p.neutralQuaternary,
    disabledBodySubtext: p.neutralTertiaryAlt,

    focusBorder: p.neutralSecondary,
    variantBorder: p.neutralLight,
    variantBorderHovered: p.neutralTertiary,
    defaultStateBackground: p.neutralLighterAlt,

    errorText: !isInverted ? p.redDark : '#f1707b',
    warningText: !isInverted ? '#323130' : '#e1dfdd',
    successText: !isInverted ? '#107C10' : '#92c353',
    errorBackground: !isInverted ? '#fde7e9' : '#442726',
    blockingBackground: !isInverted ? '#fde7e9' : '#442726',
    warningBackground: !isInverted ? '#fff4ce' : '#433519',
    warningHighlight: !isInverted ? '#ffb900' : '#fff100',
    successBackground: !isInverted ? '#dff6dd' : '#393d1b',

    inputBorder: p.neutralSecondaryAlt,
    inputBorderHovered: p.neutralPrimary,
    inputBackground: p.white,
    inputBackgroundChecked: p.themePrimary,
    inputForeground: p.neutralSecondary,
    inputForegroundHovered: p.neutralPrimary,
    inputBackgroundCheckedHovered: p.themeDarkAlt,
    inputForegroundChecked: p.white,
    inputForegroundCheckedHovered: p.white,
    inputFocusBorderAlt: p.themePrimary,
    smallInputBorder: p.neutralSecondary,
    smallInputBorderHovered: p.neutralSecondary,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,

    buttonBackground: p.white,
    buttonBackgroundChecked: p.neutralLight,
    buttonBackgroundHovered: p.neutralLighter,
    buttonBackgroundCheckedHovered: p.neutralQuaternaryAlt,
    buttonBackgroundPressed: p.neutralLight,
    buttonBackgroundDisabled: p.neutralLighter,
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.neutralDark,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.neutralDark,
    buttonTextPressed: p.neutralDark,
    buttonTextDisabled: p.neutralTertiary,
    buttonSubtext: p.neutralSecondary,
    buttonSubtextHovered: p.neutralPrimary,
    buttonBorder: p.neutralSecondaryAlt,
    buttonBorderHovered: p.neutralSecondaryAlt,
    buttonBorderPressed: p.neutralSecondaryAlt,
    buttonBorderDisabled: p.neutralLighter,
    buttonIcon: p.themePrimary,
    buttonIconHovered: p.themeDark,
    buttonDivider: p.neutralSecondaryAlt,
    buttonFocusBorder: p.neutralSecondary,

    primaryButtonBackground: p.themePrimary,
    primaryButtonBackgroundHovered: p.themeDarkAlt,
    primaryButtonBackgroundPressed: p.themeDark,
    primaryButtonBackgroundDisabled: p.neutralLighter,
    primaryButtonText: p.white,
    primaryButtonTextHovered: p.white,
    primaryButtonTextPressed: p.white,
    primaryButtonTextDisabled: p.neutralTertiary,
    primaryButtonSubtext: p.white,
    primaryButtonSubtextHovered: p.white,
    primaryButtonBorder: p.themePrimary,
    primaryButtonBorderHovered: p.themeDarkAlt,
    primaryButtonBorderPressed: p.themeDark,
    primaryButtonBorderDisabled: p.neutralLighter,
    primaryButtonIcon: p.white,
    primaryButtonIconHovered: p.white,
    primaryButtonFocusBorder: p.white,

    actionButtonBackground: p.white,
    actionButtonBackgroundHovered: p.neutralLighter,
    actionButtonBackgroundPressed: p.neutralLight,
    actionButtonBackgroundChecked: p.neutralLight,
    actionButtonBackgroundCheckedHovered: p.neutralQuaternaryAlt,
    actionButtonBackgroundDisabled: p.neutralLighter,
    actionButtonText: p.neutralPrimary,
    actionButtonTextHovered: p.neutralDark,
    actionButtonTextPressed: p.neutralDark,
    actionButtonTextChecked: p.neutralDark,
    actionButtonTextCheckedHovered: p.neutralDark,
    actionButtonTextDisabled: p.neutralTertiary,
    actionButtonIcon: p.themePrimary,
    actionButtonIconHovered: p.themeDark,
    actionButtonSubIcon: p.neutralSecondary,
    actionButtonSubIconHovered: p.neutralPrimary,
    actionButtonDivider: p.neutralTertiaryAlt,

    accentButtonBackground: p.accent,
    accentButtonText: p.white,

    menuBackground: p.white,
    menuDivider: p.neutralTertiaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePrimary,
    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundPressed: p.neutralLight,
    menuItemText: p.neutralPrimary,
    menuItemTextHovered: p.neutralDark,

    listBackground: p.white,
    listText: p.neutralPrimary,
    listItemBackgroundHovered: p.neutralLighter,
    listItemBackgroundChecked: p.neutralLight,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt,

    listHeaderBackgroundHovered: p.neutralLighter,
    listHeaderBackgroundPressed: p.neutralLight,

    actionLink: p.neutralPrimary,
    actionLinkHovered: p.neutralDark,
    link: p.themePrimary,
    linkHovered: p.themeDarker,

    // Deprecated slots, second pass by _fixDeprecatedSlots() later for self-referential slots
    listTextColor: '',
    menuItemBackgroundChecked: p.neutralLight
  };

  return _fixDeprecatedSlots(toReturn, depComments!);
}

function _fixDeprecatedSlots(s: ISemanticColors, depComments: boolean): ISemanticColors {
  // Add @deprecated tag as comment if enabled
  let dep = '';
  if (depComments === true) {
    dep = ' /* @deprecated */';
  }

  s.listTextColor = s.listText + dep;
  s.menuItemBackgroundChecked += dep;
  return s;
}
