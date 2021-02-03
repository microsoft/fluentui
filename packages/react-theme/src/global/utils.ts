import { borderRadius } from './borderRadius';
import { sharedColors, black, white, hyperlink, selected, disabled, grey } from './colors';
import { textAlignments, fontFamilies, fontWeights, fontSizes, lineHeights } from './fonts';
import { strokeWidths } from './strokeWidths';
import { Theme, BrandVariants } from '../types';

// TODO: global doesn't vary by light/dark/contrast, why utils are from light?
import { createNeutralColorTokens, createShadowLevelTokens } from '../utils/light';

export const createGlobalTheme = (brand: BrandVariants): Theme['global'] => {
  const { neutralShadowAmbient, neutralShadowKey } = createNeutralColorTokens(brand);
  const shadow = createShadowLevelTokens(neutralShadowAmbient, neutralShadowKey);

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
    shadow: shadow,
  };
};
