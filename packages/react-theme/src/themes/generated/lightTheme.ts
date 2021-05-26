import { BrandVariants, Theme } from '../../types';
import { borderRadius } from '../../global/borderRadius';
import { fontFamilies, fontSizes, fontWeights, lineHeights, textAlignments } from '../../global/fonts';
import { strokeWidths } from '../../global/strokeWidths';
import { brandColors } from '../../global/colors';

import { createShadowLevelTokens } from '../../utils/shadows';

import { black, grey, sharedColors, white, hyperlink, selected, disabled } from './colors';
import { neutralColorTokens, sharedColorTokens } from './alias';
import { aliasColorTokensDev } from './alias-dev';

const generateGlobalTheme: (brand: BrandVariants) => Theme['global'] = brand => ({
  color: {
    black,
    white,
    hyperlink,
    selected,
    disabled,
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

export const generateLightTheme: (brand: BrandVariants) => Theme = brand => ({
  global: generateGlobalTheme(brand),
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: neutralColorTokens,
    } as Theme['alias']['color'],
    shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
  },
});

export const generatedLightTheme = generateLightTheme({
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
export const teamsLightTheme = generateLightTheme(brandColors.teams);
export const webLightTheme = generateLightTheme(brandColors.web);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const generatedLightTheme__DEV = {
  alias: {
    color: aliasColorTokensDev,
  },
};
