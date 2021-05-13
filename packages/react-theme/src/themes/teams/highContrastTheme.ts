import {
  createBrandColorTokens,
  createNeutralColorTokens,
  subtleColorTokens,
  sharedColorTokens,
  transparentColorTokens,
} from '../../utils/highContrast/index';
import { brandColors } from '../../global/index';
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
      subtle: subtleColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(),
    },
    shadow: createShadowLevelTokens(
      teamsNeutralColorTokens.neutralShadowAmbient,
      teamsNeutralColorTokens.neutralShadowKey,
    ),
  },
};
