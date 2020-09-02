import { mergeThemes, createTheme } from '@fluentui/styles';
import * as siteVariables from './siteVariables';
import * as componentVariables from './componentVariables';
import { teamsTheme } from '../teams';

export const teamsHighContrastTheme = mergeThemes(
  teamsTheme,
  createTheme(
    {
      siteVariables,
      componentVariables,
    },
    'teams-high-contrast',
  ),
);
