// import * as React from 'react';
import type { Brands, BrandVariants, Theme } from '@fluentui/react-theme';

export type AccentColors = Record<string, Brands>;

/**
 * This function returns a list of the accent colors in the theme that use brand colors. We specifically look for color
 * tokens, hence including 'color', and exclude color palette tokens, hence removing 'palette'. We are not looking for
 * neutrals, so we search for 'Brand' and remove 'NeutralStroke'. We also don't care about the Shadow values, so they
 * are excluded. Additionally, there are overrides for specific edge cases that do not match the above criteria.
 * @param theme The theme that is being passed in
 * @param brand The brand that the theme uses
 * @returns A list of color tokens whos values are overridable by the user
 */
export const BrandColors = (theme: Theme, brand: BrandVariants): AccentColors => {
  const addList: string[] = ['colorNeutralStrokeAccessibleSelected'];
  const removeList: string[] = ['colorBrandBackgroundInverted', 'colorNeutralForegroundOnBrand'];

  const overridableColorTokens: string[] = Object.keys(theme).filter(color => {
    if (addList.filter(exceptionColor => exceptionColor === color).length > 0) {
      return true;
    }
    if (removeList.filter(exceptionColor => exceptionColor === color).length > 0) {
      return false;
    }
    return (
      color.startsWith('color') &&
      !color.includes('Palette') &&
      color.includes('Brand') &&
      !color.includes('Shadow') &&
      !color.includes('NeutralStroke')
    );
  });

  const hexColorToBrand: Record<string, Brands> = {
    [brand[10]]: 10,
    [brand[20]]: 20,
    [brand[30]]: 30,
    [brand[40]]: 40,
    [brand[50]]: 50,
    [brand[60]]: 60,
    [brand[70]]: 70,
    [brand[80]]: 80,
    [brand[90]]: 90,
    [brand[100]]: 100,
    [brand[110]]: 110,
    [brand[120]]: 120,
    [brand[130]]: 130,
    [brand[140]]: 140,
    [brand[150]]: 150,
    [brand[160]]: 160,
  };

  const brandColors: AccentColors = {};

  for (let i = 0; i < overridableColorTokens.length; i++) {
    const key = overridableColorTokens[i];
    const themeColor = ((theme as unknown) as Record<string, string>)[key];
    brandColors[key] = hexColorToBrand[themeColor];
  }

  return brandColors;
};
