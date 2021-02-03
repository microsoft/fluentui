import {
  createBrandColorTokens,
  createNeutralColorTokens,
  sharedColorTokens,
  transparentColorTokens,
  ghostColorTokens,
} from '../../utils/light';
import { Theme } from '../../types';
import { brandColors } from '../../global';
import { globalTheme } from './globalTheme';

export const teamsLightTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: createNeutralColorTokens(brandColors.teams),
      ghost: ghostColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brandColors.teams),
    },
  },
};
