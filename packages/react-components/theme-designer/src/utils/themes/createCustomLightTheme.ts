import type { BrandVariants, Theme, Brands } from '@fluentui/react-theme';

export interface AccentColor {
  brandValue: Brands;
  usage: string;
}

export interface AccentColors {
  colorNeutralForeground2BrandHover: AccentColor;
  colorNeutralForeground2BrandPressed: AccentColor;
  colorNeutralForeground2BrandSelected: AccentColor;
  colorNeutralForeground3BrandHover: AccentColor;
  colorNeutralForeground3BrandPressed: AccentColor;
  colorNeutralForeground3BrandSelected: AccentColor;
  colorBrandForegroundLink: AccentColor;
  colorBrandForegroundLinkHover: AccentColor;
  colorBrandForegroundLinkPressed: AccentColor;
  colorBrandForegroundLinkSelected: AccentColor;
  colorCompoundBrandForeground1: AccentColor;
  colorCompoundBrandForeground1Hover: AccentColor;
  colorCompoundBrandForeground1Pressed: AccentColor;
  colorBrandForeground1: AccentColor;
  colorBrandForeground2: AccentColor;
  colorBrandForegroundInverted: AccentColor;
  colorBrandForegroundInvertedHover: AccentColor;
  colorBrandForegroundInvertedPressed: AccentColor;
  colorBrandForegroundOnLight: AccentColor;
  colorBrandForegroundOnLightHover: AccentColor;
  colorBrandForegroundOnLightPressed: AccentColor;
  colorBrandForegroundOnLightSelected: AccentColor;
  colorBrandBackground: AccentColor;
  colorBrandBackgroundHover: AccentColor;
  colorBrandBackgroundPressed: AccentColor;
  colorBrandBackgroundSelected: AccentColor;
  colorCompoundBrandBackground: AccentColor;
  colorCompoundBrandBackgroundHover: AccentColor;
  colorCompoundBrandBackgroundPressed: AccentColor;
  colorBrandBackgroundStatic: AccentColor;
  colorBrandBackground2: AccentColor;
  colorBrandBackgroundInvertedHover: AccentColor;
  colorBrandBackgroundInvertedPressed: AccentColor;
  colorBrandBackgroundInvertedSelected: AccentColor;
  colorNeutralStrokeAccessibleSelected: AccentColor;
  colorCompoundBrandStroke: AccentColor;
  colorCompoundBrandStrokeHover: AccentColor;
  colorCompoundBrandStrokePressed: AccentColor;
}

export const createCustomLightTheme: (lightTheme: Theme, brand: BrandVariants, accentColors: AccentColors) => Theme = (
  lightTheme,
  brand,
  accentColors,
) => {
  const accentColorValues = Object.keys(accentColors).map(accentColor => {
    const accentColorValue = ((accentColors as unknown) as Record<string, AccentColor>)[accentColor];
    if (!accentColorValue) {
      return;
    }
    return brand[accentColorValue.brandValue];
  });
  return { ...lightTheme, ...accentColorValues };
};
