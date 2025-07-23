import { createLightTheme } from '../../utils/createLightTheme';
import { brandTeams, brandTeamsV3 } from '../../global/brandColors';
import type { Theme } from '../../types';
import { fontFamilies } from '../../alias/teamsFontFamilies';

export const teamsLightTheme: Theme = {
  ...createLightTheme(brandTeams),
  ...fontFamilies,
};

export const teamsLightV3Theme: Theme = {
  ...createLightTheme(brandTeamsV3),
  ...fontFamilies,
};
