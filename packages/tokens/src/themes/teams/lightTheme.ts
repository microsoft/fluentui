import { createLightTheme } from '../../utils/createLightTheme';
import { brandTeams, brandTeamsV21 } from '../../global/brandColors';
import type { Theme } from '../../types';
import { fontFamilies } from '../../alias/teamsFontFamilies';

export const teamsLightTheme: Theme = {
  ...createLightTheme(brandTeams),
  ...fontFamilies,
};

export const teamsLightV21Theme: Theme = {
  ...createLightTheme(brandTeamsV21),
  ...fontFamilies,
};
