import { BrandVariants, Theme } from '../../types';
import { borderRadius } from '../../global/borderRadius';
import { fontFamilies, fontSizes, fontWeights, lineHeights, textAlignments } from '../../global/fonts';
import { strokeWidths } from '../../global/strokeWidths';
import { brandColors } from '../../global/colors';

import { createShadowLevelTokens } from '../../utils/shadows';

import {
  black,
  grey,
  sharedColors,
  white,
  hcHyperlink,
  hcHighlight,
  hcDisabled,
  hcCanvas,
  hcCanvasText,
  hcHighlightText,
  hcButtonText,
  hcButtonFace,
} from './colors';
import { generateSharedColorTokens, neutralColorTokens } from './aliasTeamsDark';

const generateGlobalTheme: (brand: BrandVariants) => Theme['global'] = brand => ({
  color: {
    white,
    black,
    hcHyperlink,
    hcHighlight,
    hcDisabled,
    hcCanvas,
    hcCanvasText,
    hcHighlightText,
    hcButtonText,
    hcButtonFace,
  },
  palette: {
    ...sharedColors,
    brand, // FIXME
    grey,
  },
  type: {
    alignment: textAlignments,
    fontFamilies: fontFamilies,
    fontSizes: fontSizes,
    fontWeights: fontWeights,
    lineHeights: lineHeights,
  },
  borderRadius: borderRadius,
  strokeWidth: strokeWidths,
});

export const generateTeamsDarkTheme: (brand: BrandVariants) => Theme = brand => {
  const global = generateGlobalTheme(brand);
  return {
    global,
    alias: {
      color: {
        ...generateSharedColorTokens(global.palette),
        neutral: neutralColorTokens,
      } as Theme['alias']['color'],
      shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
    },
  };
};

export const teamsDarkTheme = generateTeamsDarkTheme(brandColors.teams);
