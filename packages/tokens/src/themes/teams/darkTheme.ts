import { createTeamsDarkTheme } from '../../utils/createTeamsDarkTheme';
import { brandTeams, brandTeamsV3 } from '../../global/brandColors';
import type { Theme } from '../../types';
import { fontFamilies } from '../../alias/teamsFontFamilies';

export const teamsDarkTheme: Theme = {
  ...createTeamsDarkTheme(brandTeams),
  ...fontFamilies,
};

export const teamsDarkV3Theme: Theme = {
  ...createTeamsDarkTheme(brandTeamsV3),
  ...fontFamilies,
};
