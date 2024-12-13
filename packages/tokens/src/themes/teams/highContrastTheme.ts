import { createHighContrastTheme } from '../../utils/createHighContrastTheme';
import type { Theme } from '../../types';
import { fontFamilies } from '../../alias/teamsFontFamilies';

export const teamsHighContrastTheme: Theme = {
  ...createHighContrastTheme(),
  ...fontFamilies,
};
