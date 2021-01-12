import { createTheme, mergeThemes } from '@fluentui/styles';
import { teamsTheme } from '../teams';
import * as siteVariables from './siteVariables';
import * as componentVariables from './componentVariables';

export const teamsV2Theme = mergeThemes(
  teamsTheme,
  createTheme(
    {
      siteVariables,
      componentVariables,
    },
    'teams-v2',
  ),
);
