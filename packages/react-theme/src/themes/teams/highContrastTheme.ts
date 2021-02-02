import { createNeutralColorTokens, sharedColorTokens } from '../../utils/highContrast';
import { brandColors, sharedColors, fontFamilies, fontWeights, fontSizes, lineHeights } from '../../global';
import { Theme } from '../../types';
const common = {
  sharedColors,
  sharedColorTokens,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
};

export const teamsHighContrastTheme: Theme = {
  brandColors: brandColors.teams,
  ghostColorTokens: {
    ghostBackground: 'red',
    ghostBackgroundHover: 'red',
    ghostBackgroundPressed: 'red',
    ghostBackgroundSelected: 'red',
  },
  transparentColorTokens: {
    transparentBackground: 'rgba(255, 0, 0, 0.2)',
    transparentBackgroundHover: 'rgba(255, 0, 0, 0.2)',
    transparentBackgroundPressed: 'rgba(255, 0, 0, 0.2)',
    transparentBackgroundSelected: 'rgba(255, 0, 0, 0.2)',
  },
  neutralColorTokens: createNeutralColorTokens(brandColors.teams),
  ...common,
};
