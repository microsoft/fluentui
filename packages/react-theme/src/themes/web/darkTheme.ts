import {
  createBrandColorTokens,
  createNeutralColorTokens,
  subtleColorTokens,
  sharedColorTokens,
  transparentColorTokens,
} from '../../utils/dark/index';
import { Theme } from '../../types';
import { brandColors } from '../../global/index';
import { globalTheme } from './globalTheme';
import { createShadowLevelTokens } from '../../utils/shadows';

const neutralColorTokens = createNeutralColorTokens(brandColors.web);
export const webDarkTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: neutralColorTokens,
      subtle: subtleColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brandColors.web),
    },
    shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
  },
};
