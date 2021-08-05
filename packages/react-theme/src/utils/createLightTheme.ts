import { BrandVariants, Theme } from '../types';
import { createShadowLevelTokens } from './shadows';
import { generateSharedColorTokens, neutralColorTokens } from '../alias/light';
import { createGlobalTheme } from '../global/utils';

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
