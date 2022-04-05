import { createTheme, mergeThemes } from '@fluentui/styles';
import * as siteVariables from './siteVariables';
import * as componentVariables from './componentVariables';
import { teamsDarkTheme } from '../teams-dark';

export const teamsDarkV2Theme = mergeThemes(
  teamsDarkTheme,
  createTheme(
    {
      siteVariables,
      componentVariables,
    },
    'teams-dark-v2',
  ),
);
