import { createTheme } from '@fluentui/styles';

import { animations } from './animations';
import * as siteVariables from './siteVariables';
import * as componentVariables from './componentVariables';
import * as componentStyles from './componentStyles';
import { fontFaces } from './fontFaces';
import { staticStyles } from './staticStyles';
import type { ThemePrepared } from '@fluentui/styles';
import type { TeamsThemeStylesProps } from './types';

export const teamsTheme: ThemePrepared<TeamsThemeStylesProps> = createTheme(
  {
    siteVariables,
    componentVariables,
    componentStyles,
    fontFaces,
    staticStyles,
    animations,
  },
  'teams',
);
