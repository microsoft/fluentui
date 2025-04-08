import { createLightTheme } from '../../utils/createLightTheme';
import { brandTeams } from '../../global/brandColors';
import type { Theme } from '../../types';
import { fontFamilies } from '../../alias/teamsFontFamilies';

export const teamsLightTheme: Theme = {
  ...createLightTheme(brandTeams),
  ...fontFamilies,
};
