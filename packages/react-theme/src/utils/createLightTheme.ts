import { createShadowLevelTokens } from './shadows';
import { generateSharedColorTokens, neutralColorTokens } from '../alias/light';
import { createGlobalTheme } from '../global/utils';
import type { BrandVariants, Theme } from '../types';

export const createLightTheme: (brand: BrandVariants) => Theme = brand => {
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
