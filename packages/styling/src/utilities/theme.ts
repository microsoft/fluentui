import * as assign from 'object-assign';
import {
  IPalette,
  IFontStyles,
  ISemanticColors
} from '../interfaces/index';
import {
  DefaultPalette,
  DefaultFontStyles
} from '../styles/index';

export interface ITheme {
  palette: IPalette;
  fonts: IFontStyles;
  semanticColors: ISemanticColors;
}

const _theme: ITheme = {
  palette: DefaultPalette,
  semanticColors: _makeSemanticColorsFromPalette(DefaultPalette),
  fonts: DefaultFontStyles
};

/**
 * Gets the theme object.
 */
export function getTheme(): ITheme {
  return _theme;
}

/**
 * Mixes the given theme settings into the current theme object.
 */
export function loadTheme(theme: ITheme): void {
  _theme.palette = assign({}, _theme.palette, theme.palette);
  _theme.semanticColors = assign({}, _makeSemanticColorsFromPalette(_theme.palette), theme.semanticColors);
  _theme.fonts = assign({}, _theme.fonts, theme.fonts);
}

// Generates all the semantic slot colors based on the Fabric palette.
// We'll use these as fallbacks for semantic slots that the passed in theme did not define.
function _makeSemanticColorsFromPalette(p: IPalette): ISemanticColors {
  return {
    bodyBackground: p.white,
    bodyText: p.neutralPrimary,
    bodySubtext: p.neutralSecondary,

    disabledBackground: p.neutralLighter,
    disabledText: p.neutralTertiaryAlt,
    disabledSubtext: p.neutralQuaternary,

    focusBorder: p.black,

    // errorBackground: todo,
    errorText: p.redDark,

    inputBorder: p.neutralTertiary,
    inputBorderHovered: p.neutralPrimary,
    inputBackgroundSelected: p.themePrimary,
    inputBackgroundSelectedHovered: p.themeDarkAlt,
    inputForegroundSelected: p.white
  };
}
