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
import { generateSharedColorTokens, neutralColorTokens } from './aliasDark';

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

export const generateDarkTheme: (brand: BrandVariants) => Theme = brand => {
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

export const generatedDarkTheme = generateDarkTheme({
  shade10: '#924EB4',
  shade20: '#8A46AD',
  shade30: '#833DA6',
  shade40: '#7B359E',
  shade50: '#732C97',
  shade60: '#6C2490',
  primary: '#9A57BC',
  tint10: '#A86CC7',
  tint20: '#B781D2',
  tint30: '#C596DD',
  tint40: '#D4ABE8',
  tint50: '#E2C0F3',
  tint60: '#F1D5FF',
});
export const webDarkTheme = generateDarkTheme(brandColors.web);
