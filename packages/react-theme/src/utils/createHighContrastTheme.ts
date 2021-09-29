import { createShadowLevelTokens } from './shadows';
import { generateSharedColorTokens, generateNeutralColorTokens } from '../alias/highContrast';
import { createGlobalTheme } from '../global/utils';
import { sharedColors as globalSharedColors } from '../global/colors';
import type { BrandVariants, Theme } from '../types';

export const createHighContrastTheme: (brand: BrandVariants) => Theme = brand => {
  const global = createGlobalTheme(brand, globalSharedColors);
  const neutral = generateNeutralColorTokens(global);
  return {
    global,
    alias: {
      color: {
        ...generateSharedColorTokens(globalSharedColors, global.color),
        neutral,
      } as Theme['alias']['color'],
      shadow: createShadowLevelTokens(neutral.neutralShadowAmbient, neutral.neutralShadowKey),
    },
  };
};
