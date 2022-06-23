import type { BrandVariants, Theme, Brands } from '@fluentui/react-theme';
import type { AccentColors } from './BrandTokens';

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
