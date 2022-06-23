import type { BrandVariants, Theme } from '@fluentui/react-theme';
import type { AccentColors } from './BrandColors';

export const createCustomTheme = (theme: Theme, brand: BrandVariants, accentColors: AccentColors): Theme => {
  const accentColorValues = Object.keys(accentColors).map(accentColor => {
    return brand[accentColors[accentColor]];
  });
  return { ...theme, ...accentColorValues };
};
