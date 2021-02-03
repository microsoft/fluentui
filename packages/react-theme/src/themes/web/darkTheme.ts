import {
  createBrandColorTokens,
  createNeutralColorTokens,
  ghostColorTokens,
  sharedColorTokens,
  transparentColorTokens,
} from '../../utils/dark';
import { Theme } from '../../types';
import { brandColors } from '../../global';
import { globalTheme } from './globalTheme';

export const webDarkTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: createNeutralColorTokens(brandColors.web),
      ghost: ghostColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brandColors.web),
    },
  },
};
