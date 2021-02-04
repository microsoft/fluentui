import {
  createBrandColorTokens,
  createNeutralColorTokens,
  ghostColorTokens,
  sharedColorTokens,
  transparentColorTokens,
} from '../../utils/highContrast';
import { brandColors } from '../../global';
import { Theme } from '../../types';
import { globalTheme } from './globalTheme';
import { createShadowLevelTokens } from '../../utils/shadows';

const teamsNeutralColorTokens = createNeutralColorTokens(brandColors.teams);

export const teamsHighContrastTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: teamsNeutralColorTokens,
      ghost: ghostColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(),
    },
    shadow: createShadowLevelTokens(
      teamsNeutralColorTokens.neutralShadowAmbient,
      teamsNeutralColorTokens.neutralShadowKey,
    ),
  },
};
