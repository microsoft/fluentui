import {
  createBrandColorTokens,
  createNeutralColorTokens,
  sharedColorTokens,
  transparentColorTokens,
  ghostColorTokens,
} from '../../utils/light/index';
import { Theme } from '../../types';
import { brandColors } from '../../global/index';
import { globalTheme } from './globalTheme';
import { createShadowLevelTokens } from '../../utils/shadows';

const neutralColorTokens = createNeutralColorTokens(brandColors.teams);
export const teamsLightTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: neutralColorTokens,
      ghost: ghostColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brandColors.teams),
    },
    shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
  },
};
