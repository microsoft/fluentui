import { createTeamsDarkTheme } from '../../utils/createTeamsDarkTheme';
import { brandTeams } from '../../global/brandColors';
import type { Theme } from '../../types';
import { fontFamilies } from '../../alias/teamsFontFamilies';

export const teamsDarkTheme: Theme = {
  ...createTeamsDarkTheme(brandTeams),
  ...fontFamilies,
};
