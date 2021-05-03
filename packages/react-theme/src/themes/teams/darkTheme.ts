import {
  createBrandColorTokens,
  createNeutralColorTokens,
  subtleColorTokens,
  sharedColorTokens,
  transparentColorTokens,
} from '../../utils/dark/index';
import { brandColors, grey } from '../../global/index';
import { Theme } from '../../types';
import { globalTheme } from './globalTheme';
import { createShadowLevelTokens } from '../../utils/shadows';

const teamsNeutralColorTokens = createNeutralColorTokens(brandColors.teams, {
  neutralBackground2: grey[14],
  neutralBackground2Hover: grey[20],
  neutralBackground2Pressed: grey[16],
  neutralBackground2Selected: grey[18],

  neutralBackground3: grey[12],
  neutralBackground3Hover: grey[18],
  neutralBackground3Pressed: grey[14],
  neutralBackground3Selected: grey[16],

  neutralBackground4: grey[8],
  neutralBackground4Hover: grey[14],
  neutralBackground4Pressed: grey[10],
  neutralBackground4Selected: grey[12],

  neutralBackground5: grey[4],
  neutralBackground5Hover: grey[10],
  neutralBackground5Pressed: grey[6],
  neutralBackground5Selected: grey[8],
});

export const teamsDarkTheme: Theme = {
  global: globalTheme,
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: teamsNeutralColorTokens,
      subtle: subtleColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brandColors.teams),
    },
    shadow: createShadowLevelTokens(
      teamsNeutralColorTokens.neutralShadowAmbient,
      teamsNeutralColorTokens.neutralShadowKey,
    ),
  },
};
