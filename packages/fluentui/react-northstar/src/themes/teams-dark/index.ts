import { createTheme, mergeThemes } from '@fluentui/styles';
import * as siteVariables from './siteVariables';
import * as componentVariables from './componentVariables';
import { teamsTheme } from '../teams';

export const teamsDarkTheme = mergeThemes(
  teamsTheme,
  createTheme(
    {
      siteVariables,
      componentVariables,
    },
    'teams-dark',
  ),
);
