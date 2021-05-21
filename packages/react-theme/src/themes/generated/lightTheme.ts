import { NeutralColorTokens, Theme } from '../../types';
import { borderRadius } from '../../global/borderRadius';
import { fontFamilies, fontSizes, fontWeights, lineHeights, textAlignments } from '../../global/fonts';
import { strokeWidths } from '../../global/strokeWidths';
import { disabled, hyperlink, selected } from '../../global';

import { black, brand, grey, sharedColors, white } from './colors';
import {
  createBrandColorTokens,
  createNeutralColorTokens,
  sharedColorTokens,
  subtleColorTokens,
  transparentColorTokens,
} from '../../utils/light';

import { createShadowLevelTokens } from '../../utils/shadows';
import { aliasColorTokens } from './alias';
import { aliasColorTokensDev } from './alias-dev';

const globalTheme: Theme['global'] = {
  color: {
    black,
    white,
    hyperlink,
    selected,
    disabled,
  },
  palette: {
    ...sharedColors,
    brand,
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

const neutralColorTokens = createNeutralColorTokens(brand);
export const generatedLightTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      // neutral: neutralColorTokens,
      neutral: (aliasColorTokens as unknown) as NeutralColorTokens,
      subtle: subtleColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brand),
    },
    shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const generatedLightTheme__DEV = {
  alias: {
    color: {
      neutral: aliasColorTokensDev,
    },
  },
};
