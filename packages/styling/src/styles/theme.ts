import { Customizations, merge, getWindow } from '@uifabric/utilities';
import { IPalette, ISemanticColors, ITheme, IPartialTheme, IFontStyles, IEffects } from '../interfaces/index';
import { DefaultFontStyles } from './DefaultFontStyles';
import { DefaultPalette, DefaultSpacing, DefaultEffects } from './index';
import { loadTheme as legacyLoadTheme } from '@microsoft/load-themed-styles';
import { IRawStyle } from '@uifabric/merge-styles';

let _theme: ITheme = createTheme({
  palette: DefaultPalette,
  semanticColors: _makeSemanticColors(DefaultPalette, DefaultEffects, undefined, false, false),
  fonts: DefaultFontStyles,
  isInverted: false,
  disableGlobalClassNames: false,
});
let _onThemeChangeCallbacks: Array<(theme: ITheme) => void> = [];

export const ThemeSettingName = 'theme';

export function initializeThemeInCustomizations(): void {
  if (!Customizations.getSettings([ThemeSettingName]).theme) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win: any = getWindow();

    if (win?.FabricConfig?.theme) {
      _theme = createTheme(win.FabricConfig.theme);
    }

    // Set the default theme.
    Customizations.applySettings({ [ThemeSettingName]: _theme });
  }
}

initializeThemeInCustomizations();

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
  legacyLoadTheme({ ..._theme.palette, ..._theme.semanticColors, ..._theme.effects, ..._loadFonts(_theme) });

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
  const lines: { [key: string]: string } = {};

  for (const fontName of Object.keys(theme.fonts)) {
    const font: IRawStyle = theme.fonts[fontName as keyof IFontStyles];

    for (const propName of Object.keys(font)) {
      const name: string = fontName + propName.charAt(0).toUpperCase() + propName.slice(1);
      let value = font[propName as keyof IRawStyle] as string;

      if (propName === 'fontSize' && typeof value === 'number') {
        // if it's a number, convert it to px by default like our theming system does
        value = value + 'px';
      }
      lines[name] = value;
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
  let newEffects = { ...DefaultEffects, ...theme.effects };

  if (!theme.palette || !theme.palette.accent) {
    newPalette.accent = newPalette.themePrimary;
  }

  // mix in custom overrides with good slots first, since custom overrides might be used in fixing deprecated slots
  let newSemanticColors = {
    ..._makeSemanticColors(newPalette, newEffects, theme.semanticColors, !!theme.isInverted, depComments),
    ...theme.semanticColors,
  };

  let defaultFontStyles: IFontStyles = { ...DefaultFontStyles };

  if (theme.defaultFontStyle) {
    for (const fontStyle of Object.keys(defaultFontStyles) as (keyof IFontStyles)[]) {
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.defaultFontStyle);
    }
  }

  if (theme.fonts) {
    for (const fontStyle of Object.keys(theme.fonts) as (keyof IFontStyles)[]) {
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.fonts[fontStyle]);
    }
  }

  return {
    palette: newPalette,
    fonts: {
      ...defaultFontStyles,
    },
    rtl: theme.rtl,
    semanticColors: newSemanticColors,
    isInverted: !!theme.isInverted,
    disableGlobalClassNames: !!theme.disableGlobalClassNames,
    spacing: {
      ...DefaultSpacing,
      ...theme.spacing,
    },
    effects: newEffects,
  };
}

/** Generates all the semantic slot colors based on the theme so far
 * We'll use these as fallbacks for semantic slots that the passed in theme did not define.
 * The caller must still mix in the customized semantic slots at the end.
 */
function _makeSemanticColors(
  p: IPalette,
  e: IEffects,
  s: Partial<ISemanticColors> | undefined,
  isInverted: boolean,
  depComments: boolean,
): ISemanticColors {
  let toReturn: ISemanticColors = {
    // DEFAULTS
    bodyBackground: p.white,
    bodyBackgroundHovered: p.neutralLighter,
    bodyBackgroundChecked: p.neutralLight,
    bodyStandoutBackground: p.neutralLighterAlt,
    bodyFrameBackground: p.white,
    bodyFrameDivider: p.neutralLight,
    bodyText: p.neutralPrimary,
    bodyTextChecked: p.black,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralLight,
    disabledBodyText: p.neutralTertiary,
    disabledBodySubtext: p.neutralTertiaryAlt,
    disabledBorder: p.neutralTertiaryAlt,
    focusBorder: p.neutralSecondary,
    cardStandoutBackground: p.white,
    cardShadow: e.elevation4,
    cardShadowHovered: '', // set in second pass
    variantBorder: p.neutralLight,
    variantBorderHovered: p.neutralTertiary,
    defaultStateBackground: p.neutralLighterAlt,

    // LINKS
    actionLink: p.neutralPrimary,
    actionLinkHovered: p.neutralDark,
    link: p.themePrimary,
    linkHovered: p.themeDarker,

    // BUTTONS
    buttonBackground: p.white,
    buttonBackgroundChecked: p.neutralTertiaryAlt,
    buttonBackgroundHovered: p.neutralLighter,
    buttonBackgroundCheckedHovered: p.neutralLight,
    buttonBackgroundPressed: p.neutralLight,
    buttonBackgroundDisabled: p.neutralLighter,
    buttonBorder: p.neutralSecondaryAlt,
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.neutralDark,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.black,
    buttonTextPressed: p.neutralDark,
    buttonTextDisabled: p.neutralTertiary,
    buttonBorderDisabled: p.neutralLighter,

    primaryButtonBackground: p.themePrimary,
    primaryButtonBackgroundHovered: p.themeDarkAlt,
    primaryButtonBackgroundPressed: p.themeDark,
    primaryButtonBackgroundDisabled: p.neutralLighter,
    primaryButtonBorder: 'transparent',
    primaryButtonText: p.white,
    primaryButtonTextHovered: p.white,
    primaryButtonTextPressed: p.white,
    primaryButtonTextDisabled: p.neutralQuaternary,

    accentButtonBackground: p.accent,
    accentButtonText: p.white,

    // INPUTS
    inputBorder: p.neutralSecondary,
    inputBorderHovered: p.neutralPrimary,
    inputBackground: p.white,
    inputBackgroundChecked: p.themePrimary,
    inputBackgroundCheckedHovered: p.themeDark,
    inputPlaceholderBackgroundChecked: p.themeLighter,
    inputForegroundChecked: p.white,
    inputIcon: p.themePrimary,
    inputIconHovered: p.themeDark,
    inputIconDisabled: p.neutralTertiary,
    inputFocusBorderAlt: p.themePrimary,
    smallInputBorder: p.neutralSecondary,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,
    disabledBackground: p.neutralLighter,
    disabledText: p.neutralTertiary,
    disabledSubtext: p.neutralQuaternary,

    // LISTS
    listBackground: p.white,
    listText: p.neutralPrimary,
    listItemBackgroundHovered: p.neutralLighter,
    listItemBackgroundChecked: p.neutralLight,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt,

    listHeaderBackgroundHovered: p.neutralLighter,
    listHeaderBackgroundPressed: p.neutralLight,

    // MENUS
    menuBackground: p.white,
    menuDivider: p.neutralTertiaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePrimary,
    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundPressed: p.neutralLight,
    menuItemText: p.neutralPrimary,
    menuItemTextHovered: p.neutralDark,

    errorText: !isInverted ? '#a4262c' : '#F1707B',

    messageText: !isInverted ? '#323130' : '#F3F2F1',
    messageLink: !isInverted ? '#005A9E' : '#6CB8F6',
    messageLinkHovered: !isInverted ? '#004578' : '#82C7FF',

    infoIcon: !isInverted ? '#605e5c' : '#C8C6C4',
    errorIcon: !isInverted ? '#A80000' : '#F1707B',
    blockingIcon: !isInverted ? '#FDE7E9' : '#442726',
    warningIcon: !isInverted ? '#797775' : '#C8C6C4',
    severeWarningIcon: !isInverted ? '#D83B01' : '#FCE100',
    successIcon: !isInverted ? '#107C10' : '#92C353',

    infoBackground: !isInverted ? '#f3f2f1' : '#323130',
    errorBackground: !isInverted ? '#FDE7E9' : '#442726',
    blockingBackground: !isInverted ? '#FDE7E9' : '#442726',
    warningBackground: !isInverted ? '#FFF4CE' : '#433519',
    severeWarningBackground: !isInverted ? '#FED9CC' : '#4F2A0F',
    successBackground: !isInverted ? '#DFF6DD' : '#393D1B',

    // Deprecated slots, later pass by _fixDeprecatedSlots() for self-referential slots
    warningHighlight: !isInverted ? '#ffb900' : '#fff100',
    warningText: '',
    successText: !isInverted ? '#107C10' : '#92c353',
    listTextColor: '',
    menuItemBackgroundChecked: p.neutralLight,

    // mix in customized semantic slots for second pass
    ...s,
  };

  // second pass for self-referential slots
  toReturn = {
    ...toReturn,
    cardShadowHovered: !isInverted ? e.elevation8 : '0 0 1px ' + toReturn.variantBorderHovered,
  };

  return _fixDeprecatedSlots(toReturn, depComments!);
}

function _fixDeprecatedSlots(s: ISemanticColors, depComments: boolean): ISemanticColors {
  // Add @deprecated tag as comment if enabled
  let dep = '';
  if (depComments === true) {
    dep = ' /* @deprecated */';
  }

  /* eslint-disable deprecation/deprecation */
  s.listTextColor = s.listText + dep;
  s.menuItemBackgroundChecked += dep;
  s.warningHighlight += dep;
  s.warningText = s.messageText + dep;
  s.successText += dep;
  /* eslint-enable deprecation/deprecation */
  return s;
}
