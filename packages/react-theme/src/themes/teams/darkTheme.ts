import { createNeutralColorTokens, sharedColorTokens } from '../../utils/dark/index';
import { createShadowLevelTokens } from '../../utils/light/index';
import { brandColors, sharedColors, fontFamilies, fontWeights, fontSizes, lineHeights, grey } from '../../global/index';
import { Theme } from '../../types';

const common = {
  sharedColors,
  sharedColorTokens,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
};

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
  brandColors: brandColors.teams,
  neutralColorTokens: teamsNeutralColorTokens,
  shadowLevels: createShadowLevelTokens(
    teamsNeutralColorTokens.neutralShadowAmbientDarker,
    teamsNeutralColorTokens.neutralShadowKeyDarker,
  ),
  ...common,
};
