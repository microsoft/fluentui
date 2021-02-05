import { borderRadius } from './borderRadius';
import { sharedColors, black, white, hyperlink, selected, disabled, grey } from './colors';
import { textAlignments, fontFamilies, fontWeights, fontSizes, lineHeights } from './fonts';
import { strokeWidths } from './strokeWidths';
import { Theme, BrandVariants } from '../types';

export const createGlobalTheme = (brand: BrandVariants): Theme['global'] => {
  return {
    color: {
      black,
      white,
      hyperlink,
      selected,
      disabled,
    },
    palette: {
      ...sharedColors,
      brand: brand,
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
  };
};
