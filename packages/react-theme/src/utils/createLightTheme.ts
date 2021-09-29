import { createShadowLevelTokens } from './shadows';
import { generateSharedColorTokens, generateNeutralColorTokens } from '../alias/light';
import { createGlobalTheme } from '../global/utils';
import { sharedColors as globalSharedColors } from '../global/colors';
import type { BrandVariants, Theme } from '../types';

export const createLightTheme: (brand: BrandVariants) => Theme = brand => {
  const global = createGlobalTheme(brand, globalSharedColors);
  const neutral = generateNeutralColorTokens(global);
  return {
    global,
    alias: {
      color: {
        ...generateSharedColorTokens(globalSharedColors),
        neutral,
      } as Theme['alias']['color'],
      shadow: createShadowLevelTokens(neutral.neutralShadowAmbient, neutral.neutralShadowKey),
    },
  };
};
