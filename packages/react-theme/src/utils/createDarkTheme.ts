import { createShadowLevelTokens } from './shadows';
import { generateSharedColorTokens, neutralColorTokens } from '../alias/dark';
import { neutralColorTokens as highContrastColorTokens } from '../alias/highContrast';
import { createGlobalTheme } from '../global/utils';
import { hcMediaQuery } from './hcMediaQuery';
import type { BrandVariants, Theme } from '../types';

export const createDarkTheme: (brand: BrandVariants) => Theme = brand => {
  const global = createGlobalTheme(brand);
  return {
    global,
    alias: {
      color: {
        ...generateSharedColorTokens(global.palette),
        neutral: hcMediaQuery && hcMediaQuery.matches ? highContrastColorTokens : neutralColorTokens,
      } as Theme['alias']['color'],
      shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
    },
  };
};
