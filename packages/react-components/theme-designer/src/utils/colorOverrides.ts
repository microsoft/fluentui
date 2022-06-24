import type { Brands, BrandVariants, Theme } from '@fluentui/react-theme';

export type ColorOverrides = Record<string, Brands>;

export const themeOverrides = (theme: Theme, brand: BrandVariants, overrides: ColorOverrides): Partial<Theme> => {
  return Object.keys(overrides).reduce((a: Record<string, string>, c) => {
    a[c] = brand[overrides[c]];
    return a;
  }, {});
};
