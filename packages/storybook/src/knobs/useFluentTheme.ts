import {
  webLightTheme,
  webDarkTheme,
  webHighContrastTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Theme,
} from '@fluentui/react-theme';
import { select } from '@storybook/addon-knobs';

const themeSelectorLabel = 'Theme';

const themeOptions = [
  { label: 'Web Light', theme: webLightTheme },
  { label: 'Web Dark', theme: webDarkTheme },
  { label: 'Web High Contrast', theme: webHighContrastTheme },
  { label: 'Teams Light', theme: teamsLightTheme },
  { label: 'Teams Dark', theme: teamsDarkTheme },
  { label: 'Teams High Contrast', theme: teamsHighContrastTheme },
];

export const useFluentTheme = (): { label: string; theme: Theme } =>
  // Casting any here due to issue: https://github.com/storybookjs/storybook/issues/9751
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select(themeSelectorLabel, themeOptions as any, themeOptions[0] as any);
