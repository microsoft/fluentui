import { BrandVariants, Theme } from '../types';
import { createShadowLevelTokens } from './shadows';
import { generateSharedColorTokens, neutralColorTokens } from '../alias/highContrast';
import { createGlobalTheme } from '../global/utils';

export const createHighContrastTheme: (brand: BrandVariants) => Theme = brand => {
  const global = createGlobalTheme(brand);
  return {
    global,
    alias: {
      color: {
        ...generateSharedColorTokens(global.palette),
        neutral: neutralColorTokens,
      } as Theme['alias']['color'],
      shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
    },
  };
};
