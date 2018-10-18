import { Customizations } from '@uifabric/utilities';
import { ISemanticColors, ITheme, IPartialTheme } from '../interfaces/index';
import { IPalette, IThemeCore, resolveThemeCore, createThemeCore } from '@uifabric/theming-core';
import { DefaultFontStyles, DefaultFontFamilies } from './DefaultFontStyles';
import { DefaultSpacing } from './DefaultSpacing';
import { loadTheme as legacyLoadTheme } from '@microsoft/load-themed-styles';
import { createThemeRegistry } from '@uifabric/theming-core';
import { DefaultEffects } from './DefaultEffects';

// Platform default values to use as a hidden parent theme
const _defaultThemeCore = createThemeCore(DefaultFontFamilies);
const _platformDefaultTheme: ITheme = {
  ..._defaultThemeCore,
  semanticColors: _makeSemanticColorsFromPalette(_defaultThemeCore.palette, false, false),
  fonts: DefaultFontStyles,
  spacing: DefaultSpacing,
  effects: DefaultEffects,
  isInverted: false,
  addDeprecatedComments: false,
  disableGlobalClassNames: false
};

const _registry = createThemeRegistry<ITheme, IPartialTheme>(_platformDefaultTheme, _resolveTheme);
_registry.registerTheme({});

let _onThemeChangeCallbacks: Array<(theme: ITheme) => void> = [];

export const ThemeSettingName = 'theme';

if (!Customizations.getSettings([ThemeSettingName]).theme) {
  let win = typeof window !== 'undefined' ? window : undefined;

  // tslint:disable:no-string-literal no-any
  if (win && (win as any)['FabricConfig'] && (win as any)['FabricConfig'].theme) {
    createTheme((win as any)['FabricConfig'].theme);
  }
  // tslint:enable:no-string-literal no-any

  // Set the default theme.
  Customizations.applySettings({ [ThemeSettingName]: getTheme() });
}

/**
 * Optionally turn on deprecated comment mode
 *
 * @param depComments - if it is true this will switch into deprecated comment mode.  There
 * is no going back here because the initial design of this parameter is less than ideal.
 * Because it is defaulted to false rather than being optional there is potential for
 * thrashing the themes.
 */
function _ensureDeprecatedComments(depComments: boolean): void {
  if (depComments && !_platformDefaultTheme.addDeprecatedComments) {
    _platformDefaultTheme.addDeprecatedComments = true;
    _registry.updatePlatformDefaults(_platformDefaultTheme);
  }
}

/**
 * Gets the theme object
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function getTheme(depComments: boolean = false): ITheme {
  _ensureDeprecatedComments(depComments);
  return _registry.getTheme();
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
  _ensureDeprecatedComments(depComments);
  createTheme(theme, depComments);
  const defaultTheme = getTheme();

  // Invoke the legacy method of theming the page as well.
  legacyLoadTheme({ ...defaultTheme.palette, ...defaultTheme.semanticColors });

  Customizations.applySettings({ [ThemeSettingName]: getTheme() });

  _onThemeChangeCallbacks.forEach((callback: (theme: ITheme) => void) => {
    try {
      callback(getTheme());
    } catch (e) {
      // don't let a bad callback break everything else
    }
  });

  return getTheme();
}

function _getResolvedBool(baseVal: boolean, optional?: boolean): boolean {
  return optional !== undefined ? optional : baseVal;
}

function _resolveTheme(partial: IPartialTheme | undefined, parent: ITheme): ITheme {
  if (!partial) {
    partial = {};
  }
  const resolvedBase: IThemeCore = resolveThemeCore(partial, parent);

  // note given that accent is required this seems like it can be removed
  if (!resolvedBase.palette.accent) {
    resolvedBase.palette.accent = resolvedBase.palette.themePrimary;
  }

  const isInverted = _getResolvedBool(parent.isInverted, partial.isInverted);
  const disableGlobalClassNames = _getResolvedBool(parent.disableGlobalClassNames, partial.disableGlobalClassNames);
  const addDeprecatedComments = _getResolvedBool(parent.addDeprecatedComments, partial.addDeprecatedComments);

  return {
    ...resolvedBase,
    semanticColors: _makeSemanticColorsFromPalette(resolvedBase.palette, isInverted, addDeprecatedComments),
    fonts: Object.assign({}, parent.fonts, partial.fonts),
    spacing: Object.assign({}, parent.spacing, partial.spacing),
    effects: Object.assign({}, parent.effects, partial.effects),
    isInverted,
    disableGlobalClassNames,
    addDeprecatedComments
  };
}

/**
 * Creates a custom theme definition which can be used with the Customizer.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function createTheme(theme: IPartialTheme, depComments: boolean = false): ITheme {
  _registry.registerTheme(theme);
  return _registry.getTheme();
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
    disabledText: p.neutralTertiary,
    disabledBodyText: p.neutralTertiary,
    disabledSubtext: p.neutralQuaternary,
    disabledBodySubtext: p.neutralTertiaryAlt,

    focusBorder: p.neutralSecondary,
    variantBorder: p.neutralLight,
    variantBorderHovered: p.neutralTertiary,
    defaultStateBackground: p.neutralLighterAlt,

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
    smallInputBorder: p.neutralSecondary,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,

    buttonBackground: p.neutralLighter,
    buttonBackgroundChecked: p.neutralTertiaryAlt,
    buttonBackgroundHovered: p.neutralLight,
    buttonBackgroundCheckedHovered: p.neutralLight,
    buttonBackgroundPressed: p.neutralLight,
    buttonBackgroundDisabled: p.neutralLighter,
    buttonBorder: 'transparent',
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.neutralDark,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.black,
    buttonTextPressed: p.neutralDark,
    buttonTextDisabled: p.neutralTertiary,
    buttonBorderDisabled: 'transparent',

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
