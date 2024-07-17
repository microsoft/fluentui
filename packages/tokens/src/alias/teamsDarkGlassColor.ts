import type { BrandVariants, ColorTokens } from '../types';
import { generateColorTokens as generateTeamsDarkColorTokens } from './teamsDarkColor';

export const generateColorTokens = (brand: BrandVariants): ColorTokens => {
  const darkColorTokens = generateTeamsDarkColorTokens(brand);
  return {
    ...darkColorTokens,
    // New tokens
    colorMaterialTertiaryBackground: '#29292960',
    // Token overrides
    colorNeutralBackground1: 'transparent',
    colorNeutralStroke2: darkColorTokens.colorNeutralStrokeAlpha,
    colorNeutralBackground1Hover: darkColorTokens.colorNeutralBackground1,
    colorNeutralBackground1Pressed: darkColorTokens.colorSubtleBackgroundLightAlphaPressed,
  };
};
