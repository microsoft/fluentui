import {
  createTheme,
  DefaultPalette,
  IPalette,
  Theme as ThemeV8,
  ISemanticColors,
  IFontStyles,
  IFontWeight,
  IEffects,
} from '@fluentui/react';

import { BrandVariants, Theme as ThemeV9 } from '@fluentui/react-components';

import { black, blackAlpha, grey, sharedColors, white, whiteAlpha } from './themeDuplicates';

/**
 * Creates a v8 palette given a brand ramp
 */
const mapPalette = (brandColors: BrandVariants): IPalette => {
  return {
    ...DefaultPalette,

    // map v9 chromatic
    black: black,
    blackTranslucent40: blackAlpha[40],
    neutralDark: grey[8],
    neutralPrimary: grey[14],
    neutralPrimaryAlt: grey[22],
    neutralSecondary: grey[36],
    neutralSecondaryAlt: grey[52],
    neutralTertiary: grey[62],
    neutralTertiaryAlt: grey[78],
    neutralQuaternary: grey[82],
    neutralQuaternaryAlt: grey[88],
    neutralLight: grey[92],
    neutralLighter: grey[96],
    neutralLighterAlt: grey[98],
    accent: brandColors[80],
    white: white,
    whiteTranslucent40: whiteAlpha[40],

    // map v9 shared colors
    yellowDark: sharedColors.marigold.shade10,
    yellow: sharedColors.yellow.primary,
    yellowLight: sharedColors.yellow.tint40,
    orange: sharedColors.orange.primary,
    orangeLight: sharedColors.orange.tint20,
    orangeLighter: sharedColors.orange.tint40,
    redDark: sharedColors.darkRed.primary,
    red: sharedColors.red.primary,
    magentaDark: sharedColors.magenta.shade30,
    magenta: sharedColors.magenta.primary,
    magentaLight: sharedColors.magenta.tint30,
    purpleDark: sharedColors.darkPurple.primary,
    purple: sharedColors.purple.primary,
    purpleLight: sharedColors.purple.tint40,
    blueDark: sharedColors.darkBlue.primary,
    blueMid: sharedColors.royalBlue.primary,
    blue: sharedColors.blue.primary,
    blueLight: sharedColors.lightBlue.primary,
    tealDark: sharedColors.darkTeal.primary,
    teal: sharedColors.teal.primary,
    tealLight: sharedColors.lightTeal.primary,
    greenDark: sharedColors.darkGreen.primary,
    green: sharedColors.green.primary,
    greenLight: sharedColors.lightGreen.primary,

    // map the v9 brand ramp
    themeDarker: brandColors[40],
    themeDark: brandColors[60],
    themeDarkAlt: brandColors[70],
    themePrimary: brandColors[80],
    themeSecondary: brandColors[90],
    themeTertiary: brandColors[120],
    themeLight: brandColors[140],
    themeLighter: brandColors[150],
    themeLighterAlt: brandColors[160],
  };
};

/**
 * Returns v9 theme colors overlaid on a base set of v8 semantic colors
 */
const mapSemanticColors = (baseColors: ISemanticColors, theme: ThemeV9): ISemanticColors => {
  return {
    ...baseColors,
    accentButtonBackground: theme.colorBrandBackground,
    accentButtonText: theme.colorNeutralForegroundOnBrand,
    actionLink: theme.colorNeutralForeground1,
    actionLinkHovered: theme.colorNeutralForeground1Hover,
    // blockingBackground,
    // blockingIcon,
    bodyBackground: theme.colorNeutralBackground1,
    bodyBackgroundChecked: theme.colorNeutralBackground1Selected,
    bodyBackgroundHovered: theme.colorNeutralBackground1Hover,
    bodyDivider: theme.colorNeutralStroke2,
    bodyFrameBackground: theme.colorNeutralBackground1,
    bodyFrameDivider: theme.colorNeutralStroke2,
    bodyStandoutBackground: theme.colorNeutralBackground2,
    bodySubtext: theme.colorNeutralForeground2,
    bodyText: theme.colorNeutralForeground1,
    bodyTextChecked: theme.colorNeutralForeground1Selected,
    buttonBackground: theme.colorNeutralBackground1,
    buttonBackgroundChecked: theme.colorNeutralBackground1Selected,
    buttonBackgroundCheckedHovered: theme.colorNeutralBackground1Hover,
    buttonBackgroundDisabled: theme.colorNeutralBackgroundDisabled,
    buttonBackgroundHovered: theme.colorNeutralBackground1Hover,
    buttonBackgroundPressed: theme.colorNeutralBackground1Pressed,
    buttonBorder: theme.colorNeutralStroke1,
    buttonBorderDisabled: theme.colorNeutralStrokeDisabled,
    buttonText: theme.colorNeutralForeground1,
    buttonTextChecked: theme.colorNeutralForeground1,
    buttonTextCheckedHovered: theme.colorNeutralForeground1,
    buttonTextDisabled: theme.colorNeutralForegroundDisabled,
    buttonTextHovered: theme.colorNeutralForeground1,
    buttonTextPressed: theme.colorNeutralForeground1,
    cardShadow: theme.shadow4,
    cardShadowHovered: theme.shadow8,
    cardStandoutBackground: theme.colorNeutralBackground1,
    defaultStateBackground: theme.colorNeutralBackground2,
    disabledBackground: theme.colorNeutralBackgroundDisabled,
    disabledBodySubtext: theme.colorNeutralForegroundDisabled,
    disabledBodyText: theme.colorNeutralForegroundDisabled,
    disabledBorder: theme.colorNeutralStrokeDisabled,
    disabledSubtext: theme.colorNeutralForegroundDisabled,
    disabledText: theme.colorNeutralForegroundDisabled,
    // errorBackground,
    // errorIcon,
    // errorText: ,
    focusBorder: theme.colorStrokeFocus2,
    // infoBackground,
    // infoIcon,
    inputBackground: theme.colorNeutralBackground1,
    inputBackgroundChecked: theme.colorBrandBackground,
    inputBackgroundCheckedHovered: theme.colorBrandBackgroundHover,
    inputBorder: theme.colorNeutralStrokeAccessible,
    inputBorderHovered: theme.colorNeutralStrokeAccessibleHover,
    inputFocusBorderAlt: theme.colorBrandStroke1,
    inputForegroundChecked: theme.colorNeutralForegroundOnBrand,
    inputIcon: theme.colorNeutralForeground3,
    inputIconDisabled: theme.colorNeutralForegroundDisabled,
    inputIconHovered: theme.colorNeutralForeground3,
    inputPlaceholderBackgroundChecked: theme.colorBrandBackgroundInvertedSelected,
    inputPlaceholderText: theme.colorNeutralForeground4,
    inputText: theme.colorNeutralForeground1,
    inputTextHovered: theme.colorNeutralForeground1Hover,
    link: theme.colorBrandForegroundLink,
    linkHovered: theme.colorBrandForegroundLinkHover,
    listBackground: theme.colorNeutralBackground1,
    listHeaderBackgroundHovered: theme.colorNeutralBackground1Hover,
    listHeaderBackgroundPressed: theme.colorNeutralBackground1Pressed,
    listItemBackgroundChecked: theme.colorNeutralBackground1Selected,
    listItemBackgroundCheckedHovered: theme.colorNeutralBackground1Selected,
    listItemBackgroundHovered: theme.colorNeutralBackground1Hover,
    listText: theme.colorNeutralForeground1,
    listTextColor: theme.colorNeutralForeground1,
    menuBackground: theme.colorNeutralBackground1,
    menuDivider: theme.colorNeutralStroke2,
    menuHeader: theme.colorNeutralForeground3,
    menuIcon: theme.colorNeutralForeground1,
    menuItemBackgroundChecked: theme.colorNeutralBackground1,
    menuItemBackgroundHovered: theme.colorNeutralBackground1Hover,
    menuItemBackgroundPressed: theme.colorNeutralBackground1Hover,
    menuItemText: theme.colorNeutralForeground1,
    menuItemTextHovered: theme.colorNeutralForeground1Hover,
    messageLink: theme.colorBrandForegroundLink,
    messageLinkHovered: theme.colorBrandForegroundLinkHover,
    messageText: theme.colorNeutralForeground1,
    primaryButtonBackground: theme.colorBrandBackground,
    primaryButtonBackgroundDisabled: theme.colorNeutralBackgroundDisabled,
    primaryButtonBackgroundHovered: theme.colorBrandBackgroundHover,
    primaryButtonBackgroundPressed: theme.colorBrandBackgroundPressed,
    primaryButtonBorder: theme.colorTransparentStroke,
    primaryButtonText: theme.colorNeutralForegroundOnBrand,
    primaryButtonTextDisabled: theme.colorNeutralForegroundDisabled,
    primaryButtonTextHovered: theme.colorNeutralForegroundOnBrand,
    primaryButtonTextPressed: theme.colorNeutralForegroundOnBrand,
    // severeWarningBackground,
    // severeWarningIcon,
    // smallInputBorder,
    // successBackground,
    // successIcon,
    // successText: ,
    // variantBorder,
    // variantBorderHovered,
    // warningBackground,
    // warningHighlight,
    // warningIcon,
    // warningText: ,
  };
};

/**
 * Overlays v9 fonts on a set of base v8 fonts.
 */
const mapFonts = (baseFonts: IFontStyles, theme: ThemeV9): IFontStyles => {
  return {
    ...baseFonts,
    tiny: {
      ...baseFonts.tiny,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase100,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    xSmall: {
      ...baseFonts.xSmall,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase100,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    small: {
      ...baseFonts.small,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase200,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    smallPlus: {
      ...baseFonts.smallPlus,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase200,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    medium: {
      ...baseFonts.medium,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase300,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    mediumPlus: {
      ...baseFonts.mediumPlus,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase400,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    large: {
      ...baseFonts.large,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase400,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    xLarge: {
      ...baseFonts.xxLarge,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase500,
      fontWeight: theme.fontWeightSemibold as IFontWeight,
    },
    xxLarge: {
      ...baseFonts.xxLarge,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeHero700,
      fontWeight: theme.fontWeightSemibold as IFontWeight,
    },
    superLarge: {
      ...baseFonts.superLarge,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeHero900,
      fontWeight: theme.fontWeightSemibold as IFontWeight,
    },
    mega: {
      ...baseFonts.mega,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeHero1000,
      fontWeight: theme.fontWeightSemibold as IFontWeight,
    },
  };
};

/**
 * Overlays v9 shadows and border radii on a base set of v8 effects.
 */
const mapEffects = (baseEffects: IEffects, theme: ThemeV9): IEffects => {
  return {
    ...baseEffects,
    elevation4: theme.shadow4,
    elevation8: theme.shadow8,
    elevation16: theme.shadow16,
    elevation64: theme.shadow64,
    roundedCorner2: theme.borderRadiusSmall,
    roundedCorner4: theme.borderRadiusMedium,
    roundedCorner6: theme.borderRadiusLarge,
  };
};

/**
 * Creates a v8 theme from v9 brand colora and theme.
 * You can optionally pass a v8 base theme.
 * Otherwise the default v8 theme is used.
 *
 * The v9 colors, fonts, and effects are applied on top of the v8 theme
 * to allow v8 components to look as much like v9 components as possible.
 */
export const createv8Theme = (brandColors: BrandVariants, themeV9: ThemeV9, themeV8?: ThemeV8): ThemeV8 => {
  const baseTheme = themeV8 || createTheme();

  return {
    ...baseTheme,
    palette: mapPalette(brandColors),
    semanticColors: mapSemanticColors(baseTheme.semanticColors, themeV9),
    fonts: mapFonts(baseTheme.fonts, themeV9),
    effects: mapEffects(baseTheme.effects, themeV9),
  };
};
