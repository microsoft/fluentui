import { borderRadius } from './borderRadius';
import {
  black,
  white,
  grey,
  whiteAlpha,
  blackAlpha,
  hcButtonFace,
  hcButtonText,
  hcCanvas,
  hcCanvasText,
  hcDisabled,
  hcHighlight,
  hcHighlightText,
  hcHyperlink,
} from './colors';
import { textAlignments, fontFamilies, fontWeights, fontSizes, lineHeights } from './fonts';
import { strokeWidths } from './strokeWidths';
import type { BrandVariants, GlobalSharedColors, Theme } from '../types';

export const createGlobalTheme = (brand: BrandVariants, globalSharedColors: GlobalSharedColors): Theme['global'] => {
  return {
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
      ...globalSharedColors,
      brand: brand,
      grey,
      whiteAlpha,
      blackAlpha,
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
  };
};
