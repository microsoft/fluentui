import { createTeamsDarkTheme } from '../../utils/createTeamsDarkTheme';
import { brandTeams, brandTeamsV21 } from '../../global/brandColors';
import type { Theme } from '../../types';
import { fontFamilies } from '../../alias/teamsFontFamilies';

export const teamsDarkTheme: Theme = {
  ...createTeamsDarkTheme(brandTeams),
  ...fontFamilies,
};

export const teamsDarkV21Theme: Theme = {
  ...createTeamsDarkTheme(brandTeamsV21),
  ...fontFamilies,
};
