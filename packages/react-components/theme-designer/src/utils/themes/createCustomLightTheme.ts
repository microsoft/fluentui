import type { BrandVariants, Theme, Brands } from '@fluentui/react-theme';

export interface AccentColors {
  colorNeutralForeground2BrandHover: Brands;
  colorNeutralForeground2BrandPressed: Brands;
  colorNeutralForeground2BrandSelected: Brands;
  colorNeutralForeground3BrandHover: Brands;
  colorNeutralForeground3BrandPressed: Brands;
  colorNeutralForeground3BrandSelected: Brands;
  colorBrandForegroundLink: Brands;
  colorBrandForegroundLinkHover: Brands;
  colorBrandForegroundLinkPressed: Brands;
  colorBrandForegroundLinkSelected: Brands;
  colorCompoundBrandForeground1: Brands;
  colorCompoundBrandForeground1Hover: Brands;
  colorCompoundBrandForeground1Pressed: Brands;
  colorBrandForeground1: Brands;
  colorBrandForeground2: Brands;
  colorBrandForegroundInverted: Brands;
  colorBrandForegroundInvertedHover: Brands;
  colorBrandForegroundInvertedPressed: Brands;
  colorBrandForegroundOnLight: Brands;
  colorBrandForegroundOnLightHover: Brands;
  colorBrandForegroundOnLightPressed: Brands;
  colorBrandForegroundOnLightSelected: Brands;
  colorBrandBackground: Brands;
  colorBrandBackgroundHover: Brands;
  colorBrandBackgroundPressed: Brands;
  colorBrandBackgroundSelected: Brands;
  colorCompoundBrandBackground: Brands;
  colorCompoundBrandBackgroundHover: Brands;
  colorCompoundBrandBackgroundPressed: Brands;
  colorBrandBackgroundStatic: Brands;
  colorBrandBackground2: Brands;
  colorBrandBackgroundInvertedHover: Brands;
  colorBrandBackgroundInvertedPressed: Brands;
  colorBrandBackgroundInvertedSelected: Brands;
  colorNeutralStrokeAccessibleSelected: Brands;
  colorCompoundBrandStroke: Brands;
  colorCompoundBrandStrokeHover: Brands;
  colorCompoundBrandStrokePressed: Brands;
}

export const createCustomLightTheme: (lightTheme: Theme, brand: BrandVariants, accentColors: AccentColors) => Theme = (
  lightTheme,
  brand,
  accentColors,
) => {
  const accentColorValues = Object.keys(accentColors).map(accentColor => {
    const accentColorValue = ((accentColors as unknown) as Record<string, Brands>)[accentColor];
    if (!accentColorValue) {
      return;
    }
    return brand[accentColorValue];
  });
  return { ...lightTheme, ...accentColorValues };
};
