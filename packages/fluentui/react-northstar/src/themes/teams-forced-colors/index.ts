import { createTheme, mergeThemes } from '@fluentui/styles';
import { teamsHighContrastTheme } from '../teams-high-contrast';
import * as componentStyles from './componentStyles';

export const teamsForcedColorsTheme = mergeThemes(
  teamsHighContrastTheme,
  createTheme(
    {
      componentStyles,
    },
    'teams-forced-colors',
  ),
);
