/* eslint-disable react-hooks/exhaustive-deps */
// import * as React from 'react';
import type { Brands, BrandVariants, Theme } from '@fluentui/react-theme';

export type AccentColors = Record<string, Brands>;

export const BrandTokens = (theme: Theme, brand: BrandVariants): AccentColors => {
  const exceptionsList: string[] = ['colorBrandBackgroundInverted', 'colorNeutralStrokeAccessibleSelected'];

  const colors: string[] = Object.keys(theme).filter(color => {
    const colorExceptions = exceptionsList.filter(exceptionColor => exceptionColor === color).length > 0;
    return (
      (color.startsWith('color') &&
        !color.includes('Palette') &&
        color.includes('Brand') &&
        !color.includes('Shadow') &&
        !color.includes('NeutralStroke')) ||
      colorExceptions
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

  const brandTokens: AccentColors = {};

  for (let i = 0; i < colors.length; i++) {
    const key = colors[i];
    const themeColor = ((theme as unknown) as Record<string, string>)[key];
    brandTokens[key] = hexColorToBrand[themeColor];
  }

  return brandTokens;
};
