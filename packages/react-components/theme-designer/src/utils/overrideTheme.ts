import type { BrandVariants, Theme } from '@fluentui/react-theme';
import type { ColorOverrides } from './colorOverrides';

export const overrideTheme = (theme: Theme, brand: BrandVariants, overrides: ColorOverrides): Theme => {
  const overridedTokens = Object.keys(overrides).reduce((a: Record<string, string>, c) => {
    a[c] = brand[overrides[c]];
    return a;
  }, {});

  return { ...theme, ...overridedTokens };
};
