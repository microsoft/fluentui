import { mergeThemes, createTheme } from '@fluentui/styles';
import * as siteVariables from './siteVariables';
import * as componentVariables from './componentVariables';
import * as componentStyles from './componentStyles';
import { teamsTheme } from '../teams';

export const systemColorsTheme = mergeThemes(
  teamsTheme,
  createTheme(
    {
      siteVariables,
      componentVariables,
      componentStyles,
    },
    'system-colors',
  ),
);
