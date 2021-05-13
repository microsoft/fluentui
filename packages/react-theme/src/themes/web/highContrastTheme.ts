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

const neutralColorTokens = createNeutralColorTokens(brandColors.web);
export const webHighContrastTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: neutralColorTokens,
      subtle: subtleColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(),
    },
    shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
  },
};
