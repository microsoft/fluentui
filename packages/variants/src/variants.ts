import { IPalette, ISemanticColors, ITheme, IPartialTheme, createTheme } from 'office-ui-fabric-react/lib/Styling';
import { VariantThemeType } from './variantThemeType';

function makeThemeFromPartials(
  originalTheme: IPartialTheme,
  partialPalette: Partial<IPalette>,
  partialSemantic: Partial<ISemanticColors>
): ITheme {
  return createTheme({
    ...originalTheme,
    ...{
      palette: { ...originalTheme.palette, ...partialPalette },
      semanticColors: { ...originalTheme.semanticColors, ...partialSemantic }
    }
  });
}

/**
 * Returns the specified variant theme for the given theme.
 * Do not generate a variant from a variant, the results will be ugly.
 *
 * @export
 * @param {IPartialTheme} theme the theme to build a variant for
 * @param {VariantThemeType} variant the variant type designation
 * @returns {ITheme} the variant theme
 */
export function getVariant(theme: IPartialTheme, variant: VariantThemeType): ITheme {
  switch (variant) {
    case VariantThemeType.Neutral:
      return getNeutralVariant(theme);
    case VariantThemeType.Soft:
      return getSoftVariant(theme);
    case VariantThemeType.Strong:
      return getStrongVariant(theme);
    default:
      return createTheme(theme);
  }
}

/**
 * A variant where the background is a soft shade of the neutral color. Most other colors remain unchanged.
 *
 * @export
 * @param {IPartialTheme} theme the theme to build a variant for
 * @returns {ITheme} the variant theme
 */
export function getNeutralVariant(theme: IPartialTheme): ITheme {
  const fullTheme = createTheme(theme);
  const p = fullTheme.palette;

  // commented lines are unchanged, but left in for tracking purposes
  // in a neutral variant, most colors remain unchanged
  const partialPalette: Partial<IPalette> = {
    // theme - shifts a shade stronger to account for contrast against stronger background
    // themeDarker: '#004578', // can't go darker, stays the same
    themeDark: p.themeDarker,
    themeDarkAlt: p.themeDark,
    themePrimary: p.themeDarkAlt,
    themeSecondary: p.themePrimary,
    themeTertiary: p.themeSecondary,
    themeLight: p.themeTertiary,
    themeLighter: p.themeLight,
    themeLighterAlt: p.themeLighterAlt,

    // foregrounds
    // black: '#000000',
    // neutralDark: '#212121',
    // neutralPrimary: '#333333',
    // neutralPrimaryAlt: '#3c3c3c',
    // neutralSecondary: '#666666',
    // neutralTertiary: '#a6a6a6',

    // backgrounds - background is still the same scale, just squish it a bit
    // neutralTertiaryAlt: '#c8c8c8',
    neutralQuaternary: p.neutralTertiaryAlt,
    neutralQuaternaryAlt: p.neutralQuaternary,
    neutralLight: p.neutralQuaternaryAlt,
    neutralLighter: p.neutralLight,
    neutralLighterAlt: p.neutralLight,
    white: p.neutralLighter
  };

  const partialSemantic: Partial<ISemanticColors> = {
    bodyBackground: p.neutralLighter,
    bodyStandoutBackground: p.neutralLight,
    bodyFrameBackground: !fullTheme.isInverted ? p.neutralLight : p.neutralLighter,
    bodyFrameDivider: !fullTheme.isInverted ? p.neutralLight : p.neutralQuaternary,
    variantBorder: !fullTheme.isInverted ? p.neutralQuaternaryAlt : p.neutralLighterAlt
  };

  return makeThemeFromPartials(theme, partialPalette, partialSemantic);
}

/**
 * A variant where the background is a soft version of the primary color. Most other colors remain unchanged.
 *
 * @export
 * @param {IPartialTheme} theme the theme to build a variant for
 * @returns {ITheme} the variant theme
 */
export function getSoftVariant(theme: IPartialTheme): ITheme {
  const fullTheme = createTheme(theme);
  const p = fullTheme.palette;

  // commented lines are unchanged, but left in for tracking purposes
  // in a soft variant, most colors remain unchanged
  const partialPalette: Partial<IPalette> = {
    // theme - shifts a shade stronger to account for contrast against stronger background
    // themeDarker: '#004578', // can't go darker, stays the same
    themeDark: p.themeDarker,
    themeDarkAlt: p.themeDark,
    themePrimary: p.themeDarkAlt,
    themeSecondary: p.themePrimary,
    themeTertiary: p.themeSecondary,
    themeLight: p.themeTertiary,
    themeLighter: p.themeLight,
    themeLighterAlt: p.themeLighter,

    // foregrounds
    // black: '#000000',
    // neutralDark: '#212121',
    // neutralPrimary: '#333333',
    // neutralPrimaryAlt: '#3c3c3c',
    // neutralSecondary: '#666666',
    // neutralTertiary: '#a6a6a6',

    // backgrounds - page background starts at themeLighterAlt or themeLight, depending on inverted theme or not,
    // then gets steps stronger from there
    neutralTertiaryAlt: !fullTheme.isInverted ? p.themeDarkAlt : p.themeDarker,
    neutralQuaternary: !fullTheme.isInverted ? p.themePrimary : p.themeDark,
    neutralQuaternaryAlt: !fullTheme.isInverted ? p.themeSecondary : p.themeDarkAlt,
    neutralLight: !fullTheme.isInverted ? p.themeTertiary : p.themePrimary,
    neutralLighter: !fullTheme.isInverted ? p.themeLight : p.themeSecondary,
    neutralLighterAlt: !fullTheme.isInverted ? p.themeLighter : p.themeTertiary,
    white: !fullTheme.isInverted ? p.themeLighterAlt : p.themeLight
  };

  const partialSemantic: Partial<ISemanticColors> = {
    bodyBackground: !fullTheme.isInverted ? p.themeLighterAlt : p.themeLight,
    bodyStandoutBackground: !fullTheme.isInverted ? p.themeLighter : p.themeTertiary,
    bodyFrameBackground: !fullTheme.isInverted ? p.themeLighter : p.themeLight,
    bodyFrameDivider: !fullTheme.isInverted ? p.themeLighter : p.themeTertiary,

    inputBorder: p.themeLighter,
    // inputBorderHovered: p.neutralPrimary,
    inputBackground: p.themeLighter,
    // inputBackgroundChecked: p.themePrimary,
    // inputBackgroundCheckedHovered: p.themeDarkAlt,
    inputForegroundChecked: p.themeLighter,
    // inputFocusBorderAlt: p.themePrimary,
    variantBorder: !fullTheme.isInverted ? p.neutralLight : p.neutralLighterAlt
  };

  return makeThemeFromPartials(theme, partialPalette, partialSemantic);
}

/**
 * A variant where the background is a strong version of the primary color. All colors change.
 * The background becomes shades of the primary color.
 * The foreground/text becomes shades of the background color.
 * The primary color becomes shades of the background.
 *
 * @export
 * @param {IPartialTheme} theme the theme to build a variant for
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
    neutralQuaternary: p.themeLighterAlt, // something needs to overlap here since we're out of slots
    neutralQuaternaryAlt: p.themeLighter,
    neutralLight: p.themeLight,
    neutralLighter: p.themeTertiary,
    neutralLighterAlt: p.themeSecondary,
    white: p.themePrimary
  };

  const partialSemantic: Partial<ISemanticColors> = {
    bodyBackground: p.themePrimary,
    bodyStandoutBackground: p.themeDarkAlt,
    bodyFrameBackground: !fullTheme.isInverted ? p.themeDarkAlt : p.themePrimary,
    bodyFrameDivider: !fullTheme.isInverted ? p.themeDarkAlt : p.themeTertiary,

    bodyText: p.white,
    bodySubtext: p.white,

    inputBorder: p.themeDark,
    // inputBorderHovered: p.neutralPrimary,
    inputBackground: p.themeDark,
    inputBackgroundChecked: p.white,
    // inputBackgroundCheckedHovered: p.themePrimary,
    inputForegroundChecked: p.themeDark,
    // inputFocusBorderAlt: p.themePrimary,
    variantBorder: p.themeDark
  };

  // Strong variant is unique here, we've redefined the entire palette and are
  // effectively inverting the theme. Thus, do not mix in the original theme's value
  // for the palette and semanticColors, since they will not work well "inverted",
  // instead, use the new palette and then generate semanticColors from scratch.
  return createTheme({
    ...theme,
    ...{
      palette: partialPalette,
      semanticColors: partialSemantic,
      isInverted: !theme.isInverted
    }
  });
}
