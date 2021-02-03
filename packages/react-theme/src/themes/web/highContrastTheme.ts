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

export const webHighContrastTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: createNeutralColorTokens(brandColors.web),
      ghost: ghostColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(),
    },
  },
};
