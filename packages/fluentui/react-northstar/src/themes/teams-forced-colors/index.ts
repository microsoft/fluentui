import { createTheme, mergeThemes } from '@fluentui/styles';
import { teamsHighContrastTheme } from '../teams-high-contrast';
import * as componentStyles from './componentStyles';
import * as componentVariables from './componentVariables';

export const teamsForcedColorsTheme = mergeThemes(
  teamsHighContrastTheme,
  createTheme(
    {
      componentStyles,
      componentVariables,
    },
    'teams-forced-colors',
  ),
);
