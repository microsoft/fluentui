import { Theme } from '../../types';
import { borderRadius } from '../../global/borderRadius';
import { fontFamilies, fontSizes, fontWeights, lineHeights, textAlignments } from '../../global/fonts';
import { strokeWidths } from '../../global/strokeWidths';

import { createShadowLevelTokens } from '../../utils/shadows';

import { black, brand, grey, sharedColors, white } from './colors';
import { neutralColorTokens, sharedColorTokens } from './alias';
import { aliasColorTokensDev } from './alias-dev';

const globalTheme: Theme['global'] = {
  color: {
    black,
    white,
    hyperlink: 'red', // FIXME
    selected: 'red', // FIXME
    disabled: 'red', // FIXME
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

export const generatedLightTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: neutralColorTokens,
    } as Theme['alias']['color'],
    shadow: createShadowLevelTokens(neutralColorTokens.neutralShadowAmbient, neutralColorTokens.neutralShadowKey),
  },
};

export const teamsLightTheme = generatedLightTheme;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const generatedLightTheme__DEV = {
  alias: {
    color: aliasColorTokensDev,
  },
};
