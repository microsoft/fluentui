import { IEffects, IPalette, Theme as ThemeV8 } from '@fluentui/react';
import {
  BorderRadiusTokens,
  ColorTokens,
  ShadowTokens,
  Theme as ThemeV9,
  webLightTheme,
} from '@fluentui/react-components';
import { blackAlpha, whiteAlpha } from './themeDuplicates';

/**
 * Creates v9 color tokens from a v8 palette.
 */
const mapAliasColors = (palette: IPalette, inverted: boolean): ColorTokens => {
  return {
    colorNeutralForeground1: palette.neutralPrimary,
    colorNeutralForeground1Hover: palette.neutralPrimary,
    colorNeutralForeground1Pressed: palette.neutralPrimary,
    colorNeutralForeground1Selected: palette.neutralPrimary,
    colorNeutralForeground2: palette.neutralSecondary,
    colorNeutralForeground2Hover: palette.neutralPrimary,
    colorNeutralForeground2Pressed: palette.neutralPrimary,
    colorNeutralForeground2Selected: palette.neutralPrimary,
    colorNeutralForeground2BrandHover: palette.themePrimary,
    colorNeutralForeground2BrandPressed: palette.themeDarkAlt,
    colorNeutralForeground2BrandSelected: palette.themePrimary,
    colorNeutralForeground3: palette.neutralTertiary,
    colorNeutralForeground3Hover: palette.neutralSecondary,
    colorNeutralForeground3Pressed: palette.neutralSecondary,
    colorNeutralForeground3Selected: palette.neutralSecondary,
    colorNeutralForeground3BrandHover: palette.themePrimary,
    colorNeutralForeground3BrandPressed: palette.themeDarkAlt,
    colorNeutralForeground3BrandSelected: palette.themePrimary,
    colorNeutralForeground4: palette.neutralQuaternary,
    colorNeutralForegroundDisabled: palette.neutralTertiaryAlt,
    colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
    colorBrandForegroundLink: palette.themeDarkAlt,
    colorBrandForegroundLinkHover: palette.themeDark,
    colorBrandForegroundLinkPressed: palette.themeDarker,
    colorBrandForegroundLinkSelected: palette.themeDarkAlt,
    colorNeutralForeground2Link: palette.neutralSecondary,
    colorNeutralForeground2LinkHover: palette.neutralPrimary,
    colorNeutralForeground2LinkPressed: palette.neutralPrimary,
    colorNeutralForeground2LinkSelected: palette.neutralPrimary,
    colorCompoundBrandForeground1: palette.themePrimary,
    colorCompoundBrandForeground1Hover: palette.themeDarkAlt,
    colorCompoundBrandForeground1Pressed: palette.themeDark,
    colorBrandForeground1: palette.themePrimary,
    colorBrandForeground2: palette.themeDarkAlt,
    colorNeutralForeground1Static: palette.neutralPrimary,
    colorNeutralForegroundInverted: palette.white,
    colorNeutralForegroundInvertedHover: palette.white,
    colorNeutralForegroundInvertedPressed: palette.white,
    colorNeutralForegroundInvertedSelected: palette.white,
    colorNeutralForegroundOnBrand: palette.white,
    colorNeutralForegroundInvertedLink: palette.white,
    colorNeutralForegroundInvertedLinkHover: palette.white,
    colorNeutralForegroundInvertedLinkPressed: palette.white,
    colorNeutralForegroundInvertedLinkSelected: palette.white,
    colorBrandForegroundInverted: palette.themeSecondary,
    colorBrandForegroundInvertedHover: palette.themeTertiary,
    colorBrandForegroundInvertedPressed: palette.themeSecondary,
    colorBrandForegroundOnLight: palette.themePrimary,
    colorBrandForegroundOnLightHover: palette.themeDarkAlt,
    colorBrandForegroundOnLightPressed: palette.themeDark,
    colorBrandForegroundOnLightSelected: palette.themeDark,
    colorNeutralBackground1: palette.white,
    colorNeutralBackground1Hover: palette.neutralLighter,
    colorNeutralBackground1Pressed: palette.neutralQuaternaryAlt,
    colorNeutralBackground1Selected: palette.neutralLight,
    colorNeutralBackground2: palette.neutralLighterAlt,
    colorNeutralBackground2Hover: palette.neutralLighter,
    colorNeutralBackground2Pressed: palette.neutralQuaternaryAlt,
    colorNeutralBackground2Selected: palette.neutralLight,
    colorNeutralBackground3: palette.neutralLighter,
    colorNeutralBackground3Hover: palette.neutralLight,
    colorNeutralBackground3Pressed: palette.neutralQuaternary,
    colorNeutralBackground3Selected: palette.neutralQuaternaryAlt,
    colorNeutralBackground4: palette.neutralLighter,
    colorNeutralBackground4Hover: palette.neutralLighterAlt,
    colorNeutralBackground4Pressed: palette.neutralLighter,
    colorNeutralBackground4Selected: palette.white,
    colorNeutralBackground5: palette.neutralLight,
    colorNeutralBackground5Hover: palette.neutralLighter,
    colorNeutralBackground5Pressed: palette.neutralLighter,
    colorNeutralBackground5Selected: palette.neutralLighterAlt,
    colorNeutralBackground6: palette.neutralLight,
    colorNeutralBackgroundInverted: palette.neutralSecondary,
    colorSubtleBackground: 'transparent',
    colorSubtleBackgroundHover: palette.neutralLighter,
    colorSubtleBackgroundPressed: palette.neutralQuaternaryAlt,
    colorSubtleBackgroundSelected: palette.neutralLight,
    colorSubtleBackgroundLightAlphaHover: inverted ? whiteAlpha[10] : whiteAlpha[80],
    colorSubtleBackgroundLightAlphaPressed: inverted ? whiteAlpha[5] : whiteAlpha[50],
    colorSubtleBackgroundLightAlphaSelected: 'transparent',
    colorSubtleBackgroundInverted: 'transparent',
    colorSubtleBackgroundInvertedHover: blackAlpha[10],
    colorSubtleBackgroundInvertedPressed: blackAlpha[30],
    colorSubtleBackgroundInvertedSelected: blackAlpha[20],
    colorTransparentBackground: 'transparent',
    colorTransparentBackgroundHover: 'transparent',
    colorTransparentBackgroundPressed: 'transparent',
    colorTransparentBackgroundSelected: 'transparent',
    colorNeutralBackgroundDisabled: palette.neutralLighter,
    colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
    colorNeutralStencil1: palette.neutralLight,
    colorNeutralStencil2: palette.neutralLighterAlt,
    colorBackgroundOverlay: blackAlpha[10],
    colorScrollbarOverlay: blackAlpha[50],
    colorBrandBackground: palette.themePrimary,
    colorBrandBackgroundHover: palette.themeDarkAlt,
    colorBrandBackgroundPressed: palette.themeDarker,
    colorBrandBackgroundSelected: palette.themeDark,
    colorCompoundBrandBackground: palette.themePrimary,
    colorCompoundBrandBackgroundHover: palette.themeDarkAlt,
    colorCompoundBrandBackgroundPressed: palette.themeDark,
    colorBrandBackgroundStatic: palette.themePrimary,
    colorBrandBackground2: palette.themeLighterAlt,
    colorBrandBackgroundInverted: palette.white,
    colorBrandBackgroundInvertedHover: palette.themeLighterAlt,
    colorBrandBackgroundInvertedPressed: palette.themeLight,
    colorBrandBackgroundInvertedSelected: palette.themeLighter,
    colorNeutralStrokeAccessible: palette.neutralSecondary,
    colorNeutralStrokeAccessibleHover: palette.neutralSecondary,
    colorNeutralStrokeAccessiblePressed: palette.neutralSecondary,
    colorNeutralStrokeAccessibleSelected: palette.themePrimary,
    colorNeutralStroke1: palette.neutralQuaternary,
    colorNeutralStroke1Hover: palette.neutralTertiaryAlt,
    colorNeutralStroke1Pressed: palette.neutralTertiaryAlt,
    colorNeutralStroke1Selected: palette.neutralTertiaryAlt,
    colorNeutralStroke2: palette.neutralQuaternaryAlt,
    colorNeutralStroke3: palette.neutralLighter,
    colorNeutralStrokeOnBrand: palette.white,
    colorNeutralStrokeOnBrand2: palette.white,
    colorNeutralStrokeOnBrand2Hover: palette.white,
    colorNeutralStrokeOnBrand2Pressed: palette.white,
    colorNeutralStrokeOnBrand2Selected: palette.white,
    colorBrandStroke1: palette.themePrimary,
    colorBrandStroke2: palette.themeLight,
    colorCompoundBrandStroke: palette.themePrimary,
    colorCompoundBrandStrokeHover: palette.themeDarkAlt,
    colorCompoundBrandStrokePressed: palette.themeDark,
    colorNeutralStrokeDisabled: palette.neutralQuaternaryAlt,
    colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
    colorTransparentStroke: 'transparent',
    colorTransparentStrokeInteractive: 'transparent',
    colorTransparentStrokeDisabled: 'transparent',
    colorStrokeFocus1: palette.white,
    colorStrokeFocus2: palette.black,
    colorNeutralShadowAmbient: 'rgba(0,0,0,0.12)',
    colorNeutralShadowKey: 'rgba(0,0,0,0.14)',
    colorNeutralShadowAmbientLighter: 'rgba(0,0,0,0.06)',
    colorNeutralShadowKeyLighter: 'rgba(0,0,0,0.07)',
    colorNeutralShadowAmbientDarker: 'rgba(0,0,0,0.20)',
    colorNeutralShadowKeyDarker: 'rgba(0,0,0,0.24)',
    colorBrandShadowAmbient: 'rgba(0,0,0,0.30)',
    colorBrandShadowKey: 'rgba(0,0,0,0.25)',
  };
};

/**
 * Creates v9 shadow tokens from v8 effects.
 */
const mapShadowTokens = (effects: IEffects): Partial<ShadowTokens> => {
  return {
    shadow4: effects.elevation4,
    shadow8: effects.elevation8,
    shadow16: effects.elevation16,
    shadow64: effects.elevation64,
  };
};

/**
 * Creates v9 border radius tokens from v8 effects
 */
const mapBorderRadiusTokens = (effects: IEffects): Partial<BorderRadiusTokens> => {
  return {
    borderRadiusSmall: effects.roundedCorner2,
    borderRadiusMedium: effects.roundedCorner4,
    borderRadiusLarge: effects.roundedCorner6,
  };
};

/**
 * Creates a v9 theme from a v8 theme.
 * You can optional pass a base v9 theme; otherwise webLightTheme is used.
 */
export const createv9Theme = (themeV8: ThemeV8, baseThemeV9?: ThemeV9): ThemeV9 => {
  const baseTheme = baseThemeV9 ?? webLightTheme;

  return {
    ...baseTheme,
    ...mapAliasColors(themeV8.palette, themeV8.isInverted),
    ...mapShadowTokens(themeV8.effects),
    ...mapBorderRadiusTokens(themeV8.effects),
  };
};
