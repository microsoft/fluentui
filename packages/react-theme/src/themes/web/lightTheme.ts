import {
  createBrandColorTokens,
  createNeutralColorTokens,
  ghostColorTokens,
  sharedColorTokens,
  transparentColorTokens,
} from '../../utils/light/index';

import { brandColors } from '../../global/index';
import { Theme } from '../../types';
import { globalTheme } from './globalTheme';
import { createShadowLevelTokens } from '../../utils/shadows';

const neutralColorTokens = createNeutralColorTokens(brandColors.web);
export const webLightTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: neutralColorTokens,
      ghost: ghostColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brandColors.web),
    },
    shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
  },
};
