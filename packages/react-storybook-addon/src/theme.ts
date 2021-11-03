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
  { id: 'web-light', label: 'Web Light', theme: webLightTheme },
  { id: 'web-dark', label: 'Web Dark', theme: webDarkTheme },
  { id: 'web-high-contrast', label: 'Web High Contrast', theme: webHighContrastTheme },
  { id: 'teams-light', label: 'Teams Light', theme: teamsLightTheme },
  { id: 'teams-dark', label: 'Teams Dark', theme: teamsDarkTheme },
  { id: 'teams-high-contrast', label: 'Teams High Contrast', theme: teamsHighContrastTheme },
] as const;

export const defaultTheme = themes[0];

export type ThemeIds = typeof themes[number]['id'];
export type ThemeLabels = typeof themes[number]['label'];

export type { Theme };
