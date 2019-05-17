import { IPalette, ISemanticColors, ITheme, IPartialTheme, createTheme } from 'office-ui-fabric-react/lib/Styling';
import { VariantThemeType } from './variantThemeType';

function makeThemeFromPartials(
  originalTheme: ITheme,
  partialPalette: Partial<IPalette>,
  partialSemantic: Partial<ISemanticColors>
): ITheme {
  // Create variant palette
  let variantTheme = createTheme({ palette: { ...originalTheme.palette, ...partialPalette } });
  // Change semantic colors to use updated variant palette values
  variantTheme.semanticColors = { ...variantTheme.semanticColors, ...partialSemantic };
  // Fill in the rest of the theme
  variantTheme = { ...originalTheme, palette: variantTheme.palette, semanticColors: variantTheme.semanticColors };
  return variantTheme;
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
    bodyFrameDivider: !fullTheme.isInverted ? p.neutralLight : p.neutralQuaternaryAlt,
    bodyText: p.neutralPrimary,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralQuaternaryAlt,
    focusBorder: p.neutralSecondary,
    variantBorder: p.neutralLight,
    variantBorderHovered: p.neutralTertiary,
    defaultStateBackground: p.neutralLight,

    actionLink: p.neutralPrimary,
    actionLinkHovered: p.neutralDark,
    link: p.themeDarkAlt,
    linkHovered: p.themeDarker,
    disabledBackground: !fullTheme.isInverted ? p.neutralLight : p.neutralLighter,
    disabledText: p.neutralTertiary,
    disabledBodyText: p.neutralTertiary,
    disabledBodySubtext: p.neutralTertiaryAlt,
    disabledBorder: p.neutralTertiary,

    inputBorder: p.neutralSecondaryAlt,
    inputBorderHovered: p.neutralPrimary,
    inputBackground: p.white,
    inputFocusBorderAlt: p.themePrimary,
    smallInputBorder: p.neutralSecondary,
    smallInputBorderHovered: p.neutralDark,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,
    inputBackgroundChecked: p.themePrimary,
    inputBackgroundCheckedHovered: p.themeDark,
    inputForegroundChecked: p.white,
    inputForegroundCheckedHovered: p.white,

    buttonBackground: p.neutralLighter,
    buttonBackgroundHovered: p.neutralLight,
    buttonBackgroundPressed: !fullTheme.isInverted ? p.neutralQuaternaryAlt : p.neutralTertiaryAlt,
    buttonBackgroundChecked: p.neutralQuaternaryAlt,
    buttonBackgroundCheckedHovered: p.neutralQuaternary,
    buttonBackgroundDisabled: p.neutralLight,
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.neutralDark,
    buttonTextPressed: p.neutralDark,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.neutralDark,
    buttonTextDisabled: !fullTheme.isInverted ? p.neutralTertiary : p.neutralTertiaryAlt,
    buttonSubText: p.neutralSecondary,
    buttonSubTextHovered: p.neutralPrimary,
    buttonBorder: p.neutralSecondaryAlt,
    buttonBorderHovered: p.neutralSecondaryAlt,
    buttonBorderPressed: p.neutralSecondaryAlt,
    buttonBorderDisabled: p.neutralLight,
    buttonIcon: p.themeDarkAlt,
    buttonIconHovered: p.themeDarker,
    buttonDivider: p.neutralTertiaryAlt,
    buttonFocusBorder: p.neutralSecondary,
    primaryButtonBackground: p.themePrimary,
    primaryButtonBackgroundHovered: p.themeDarkAlt,
    primaryButtonBackgroundPressed: p.themeDark,
    primaryButtonBackgroundDisabled: p.neutralLight,
    primaryButtonBorder: 'transparent',
    primaryButtonText: p.white,
    primaryButtonTextHovered: p.white,
    primaryButtonTextPressed: p.white,
    primaryButtonTextDisabled: p.neutralTertiary,
    primaryButtonSubtext: p.white,
    primaryButtonSubtextHovered: p.white,
    primaryButtonBorderHovered: p.themeDarkAlt,
    primaryButtonBorderPressed: p.themeDark,
    primaryButtonBorderDisabled: p.neutralLight,
    primaryButtonIcon: p.white,
    primaryButtonIconHovered: p.white,
    primaryButtonFocusBorder: p.white,
    actionButtonBackground: p.neutralLighter,
    actionButtonBackgroundHovered: p.neutralLight,
    actionButtonBackgroundPressed: p.neutralQuaternaryAlt,
    actionButtonBackgroundChecked: p.neutralQuaternaryAlt,
    actionButtonBackgroundCheckedHovered: p.neutralQuaternary,
    actionButtonText: p.neutralPrimary,
    actionButtonTextHovered: p.neutralDark,
    actionButtonTextPressed: p.neutralDark,
    actionButtonTextChecked: p.neutralDark,
    actionButtonTextCheckedHovered: p.neutralDark,
    actionButtonTextDisabled: p.neutralTertiary,
    actionButtonIcon: p.themeDarkAlt,
    actionButtonIconHovered: p.themeDarker,
    actionButtonSubIcon: p.neutralSecondary,
    actionButtonSubIconHovered: p.neutralPrimary,
    actionButtonDivider: p.neutralTertiaryAlt,

    accentButtonBackground: p.accent,
    accentButtonText: p.white,

    menuBackground: p.white,
    menuDivider: p.neutralTertiaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePRimary,
    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundPressed: p.neutralLight,
    menuItemText: p.neutralPrimary,
    menuItemTextHovered: !fullTheme.isInverted ? p.neutralDark : p.neutralPrimary
  };

  return makeThemeFromPartials(fullTheme, partialPalette, partialSemantic);
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
    bodyFrameDivider: !fullTheme.isInverted ? p.themeLighter : p.neutralQuaternary,
    bodyText: p.neutralPrimary,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralQuaternaryAlt,
    inputBorder: p.neutralSecondaryAlt,
    inputBorderHovered: p.neutralPrimary,
    inputFocusBorderAlt: p.themePrimary,
    smallInputBorder: p.neutralSecondary,
    smallInputBorderHovered: p.neutralDark,
    inputBackground: p.white,
    inputBackgroundChecked: p.themePrimary,
    inputBackgroundCheckedHovered: p.themeDark,
    inputForeground: p.neutralSecondary,
    inputForgroundHovered: p.neutralDark,
    inputForegroundChecked: p.white,
    inputForegroundCheckedHovered: p.white,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,
    focusBorder: p.neutralSecondary,
    variantBorder: p.neutralLight,
    variantBorderHovered: p.neutralTertiary,
    defaultStateBackground: p.neutralLight,

    actionLink: p.neutralPrimary,
    actionLinkHovered: p.neutralDark,
    link: p.themeDarkAlt,
    linkHovered: p.themeDarker,
    disabledBackground: p.neutralLight,
    disabledBorder: p.neutralTertiary,
    disabledText: p.neutralTertiary,
    disabledBodyText: p.neutralTertiary,
    disabledBodySubtext: p.neutralTertiaryAlt,

    buttonBackground: p.themeLighterAlt,
    buttonBackgroundHovered: p.themeLighter,
    buttonBackgroundPressed: !fullTheme.isInverted ? p.themeLight : p.neutralTertiaryAlt,
    buttonBackgroundChecked: p.themeLight,
    buttonBackgroundCheckedHovered: p.themeTertiary,
    buttonBackgroundDisabled: p.neutralLight,
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.neutralDark,
    buttonTextPressed: p.neutralDark,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.neutralDark,
    buttonTextDisabled: !fullTheme.isInverted ? p.neutralTertiary : p.neutralTertiaryAlt,
    buttonSubtext: p.neutralSecondary,
    buttonSubtextHovered: p.neutralPrimary,
    buttonBorder: p.neutralSecondaryAlt,
    buttonBorderHovered: p.neutralSecondaryAlt,
    buttonBorderPressed: p.neutralSecondaryAlt,
    buttonBorderDisabled: p.neutralLight,
    buttonIcon: p.themeDarkAlt,
    buttonIconHovered: p.themeDarker,
    buttonDivider: p.neutralTertiaryAlt,
    buttonFocusBorder: p.neutralSecondary,
    primaryButtonBackground: p.themePrimary,
    primaryButtonBackgroundHovered: p.themeDarkAlt,
    primaryButtonBackgroundPressed: p.themeDark,
    primaryButtonBackgroundDisabled: p.neutralLight,
    primaryButtonText: p.white,
    primaryButtonTextHovered: p.white,
    primaryButtonTextPressed: p.white,
    primaryButtonTextDisabled: p.neutralTertiary,
    primaryButtonSubtext: p.white,
    primaryButtonSubtextHovered: p.white,
    primaryButtonBorder: p.themePrimary,
    primaryButtonBorderHovered: p.themeDarkAlt,
    primaryButtonBorderPressed: p.themeDark,
    primaryButtonBorderDisabled: p.neutralLight,
    primaryButtonIcon: p.white,
    primaryButtonIconHovered: p.white,
    primaryButtonFocusBorder: p.white,
    actionButtonBackground: p.themeLighterAlt,
    actionButtonBackgroundHovered: p.themeLighter,
    actionButtonBackgroundPressed: p.themeLight,
    actionButtonBackgroundChecked: p.themeLight,
    actionButtonBackgroundCheckedHovered: p.themeTertiary,
    actionButtonBackgroundDisabled: p.neutralLight,
    actionButtonText: p.neutralPrimary,
    actionButtonTextHovered: p.neutralDark,
    actionButtonTextPressed: p.neutralDark,
    actionButtonTextChecked: p.neutralDark,
    actionButtonTextCheckedHovered: p.neutralDark,
    actionButtonTextDisabled: p.neutralTertiary,
    actionButtonIcon: p.themeDarkAlt,
    actionButtonIconHovered: p.themeDarker,
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
    menuItemTextHovered: !fullTheme.isInverted ? p.neutralDark : p.neutralPrimary
  };

  return makeThemeFromPartials(fullTheme, partialPalette, partialSemantic);
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
    bodyDivider: p.themeSecondary,
    disabledBorder: p.themeTertiary,
    smallInputBorder: p.white,
    smallInputBorderHovered: p.white,
    inputBorder: p.themeDarkAlt,
    inputBorderHovered: p.themeDarker,
    inputBackground: p.white,
    inputBackgroundChecked: p.white,
    inputBackgroundCheckedHovered: p.themeLighter,
    inputForground: p.white,
    inputForgroundHovered: p.themeLighter,
    inputForegroundChecked: p.themePrimary,
    inputForegroundCheckedHovered: p.themeDark,
    inputFocusBorderAlt: p.themeTertiary,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,
    focusBorder: p.white,
    variantBorder: p.themeDarkAlt,
    variantBorderHovered: p.themeDarker,
    defaultStateBackground: p.neutralLighterAlt,

    actionLink: p.white,
    actionLinkHovered: p.white,
    link: p.white,
    linkHovered: p.white,
    disabledBackground: p.themeDarkAlt,
    disabledText: p.themeTertiary,
    disabledBodyText: p.themeTertiary,
    disabledBodySubtext: p.themeTertiary,

    buttonBackground: p.themePrimary,
    buttonBackgroundHovered: p.themeDarkAlt,
    buttonBackgroundPressed: p.themeDark,
    buttonBackgroundChecked: p.themeDark,
    buttonBackgroundCheckedHovered: p.themeDarker,
    buttonBackgroundDisabled: !fullTheme.isInverted ? p.themeLighter : p.themeLight,
    buttonText: p.white,
    buttonTextChecked: p.white,
    buttonTextCheckedHovered: p.white,
    buttonTextHovered: p.white,
    buttonTextPressed: p.white,
    buttonTextDisabled: p.themeTertiary,
    buttonSubtext: p.white,
    buttonSubtextHovered: p.white,
    buttonBorder: p.white,
    buttonBorderHovered: p.white,
    buttonBorderPressed: p.white,
    buttonBorderDisabled: p.themeLighter,
    buttonIcon: p.white,
    buttonIconHovered: p.white,
    buttonDivider: p.themeTertiary,
    buttonFocusBorder: p.white,
    primaryButtonBackground: p.white,
    primaryButtonBackgroundHovered: !fullTheme.isInverted ? p.themeLighter : p.themeLight,
    primaryButtonBackgroundPressed: !fullTheme.isInverted ? p.themeLight : p.themeTertiary,
    primaryButtonBackgroundDisabled: p.themeLighter,
    primaryButtonText: !fullTheme.isInverted ? p.themePrimary : p.neutralPrimary,
    primaryButtonTextHovered: !fullTheme.isInverted ? p.themeDark : p.neutralDark,
    primaryButtonTextPressed: !fullTheme.isInverted ? p.themeDark : p.neutralDark,
    primaryButtonTextDisabled: p.themeTertiary,
    primaryButtonSubtext: p.themePrimary,
    primaryButtonSubtextHovered: p.themeDark,
    primaryButtonBorder: p.white,
    primaryButtonBorderHovered: p.themeLighter,
    primaryButtonBorderPressed: p.themeLight,
    primaryButtonBorderDisabled: p.themeLighter,
    primaryButtonIcon: p.themePrimary,
    primaryButtonIconHovered: p.themeDark,
    primaryButtonFocusBorder: p.themePrimary,
    actionButtonBackground: p.themePrimary,
    actionButtonBackgroundHovered: p.themeDarkAlt,
    actionButtonBackgroundPressed: p.themeDark,
    actionButtonBackgroundChecked: p.themeDark,
    actionButtonBackgroundCheckedHovered: p.themeDarker,
    actionButtonBackgroundDisabled: p.themeLighter,
    actionButtonText: p.white,
    actionButtonTextHovered: p.white,
    actionButtonTextPressed: p.white,
    actionButtonTextChecked: p.white,
    actionButtonTextCheckedHovered: p.white,
    actionButtonTextDisabled: p.themeTertiary,
    actionButtonIcon: p.white,
    actionButtonIconHovered: p.white,
    actionButtonSubIcon: p.white,
    actionButtonSubIconHovered: p.white,
    actionButtonDivider: p.themeTertiary,

    accentButtonBackground: p.white,
    accentButtonText: !fullTheme.isInverted ? p.themePrimary : p.neutralPrimary,

    menuBackground: p.white,
    menuDivider: p.neutralTertiaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePrimary,
    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundPressed: p.neutralLight,
    menuItemText: p.neutralPrimary,
    menuItemTextHovered: !fullTheme.isInverted ? p.neutralDark : p.neutralPrimary
  };

  // Strong variant is unique here, we've redefined the entire palette and are
  // effectively inverting the theme. Thus, do not mix in the original theme's value
  // for the palette and semanticColors, since they will not work well "inverted",
  // instead, use the new palette and then generate semanticColors from scratch.

  // Create variant palette
  let variantTheme = createTheme({ palette: { ...fullTheme.palette, ...partialPalette } });
  // Change semantic colors to use updated variant palette values
  variantTheme.semanticColors = { ...variantTheme.semanticColors, ...partialSemantic };
  // Fill in the rest of the theme
  variantTheme = {
    ...fullTheme,
    palette: variantTheme.palette,
    semanticColors: variantTheme.semanticColors,
    isInverted: !fullTheme.isInverted
  };
  return variantTheme;
}
