import {
  webLightTheme,
  webDarkTheme,
  webHighContrastTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-theme';

import type { Theme } from '@fluentui/react-theme';

export { FluentProvider } from '@fluentui/react-provider';

export const themes = [
  { id: 'web-light', label: 'Web Light', theme: webLightTheme, exportName: 'webLightTheme' },
  { id: 'web-dark', label: 'Web Dark', theme: webDarkTheme, exportName: 'webDarkTheme' },
  {
    id: 'web-high-contrast',
    label: 'Web High Contrast',
    theme: webHighContrastTheme,
    exportName: 'webHighContrastTheme',
  },
  { id: 'teams-light', label: 'Teams Light', theme: teamsLightTheme, exportName: 'teamsLightTheme' },
  { id: 'teams-dark', label: 'Teams Dark', theme: teamsDarkTheme, exportName: 'teamsDarkTheme' },
  {
    id: 'teams-high-contrast',
    label: 'Teams High Contrast',
    theme: teamsHighContrastTheme,
    exportName: 'tmsHighContrastTheme',
  },
] as const;

export const defaultTheme = themes[0];

export type ThemeIds = typeof themes[number]['id'];
export type ThemeLabels = typeof themes[number]['label'];

export type { Theme };
