// import * as React from 'react';
import type { Brands, BrandVariants, Theme } from '@fluentui/react-theme';

export type AccentColors = Record<string, Brands>;

export const BrandColors = (theme: Theme, brand: BrandVariants): AccentColors => {
  const addList: string[] = ['colorNeutralStrokeAccessibleSelected'];
  const removeList: string[] = ['colorBrandBackgroundInverted', 'colorNeutralForegroundOnBrand'];

  const colors: string[] = Object.keys(theme).filter(color => {
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

  for (let i = 0; i < colors.length; i++) {
    const key = colors[i];
    const themeColor = ((theme as unknown) as Record<string, string>)[key];
    brandColors[key] = hexColorToBrand[themeColor];
  }

  return brandColors;
};
