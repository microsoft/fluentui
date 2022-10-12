import {
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-theme';

import type { Theme } from '@fluentui/react-theme';

export const WEB_LIGHT = 'web-light';
export const WEB_DARK = 'web-dark';
export const TEAMS_LIGHT = 'teams-light';
export const TEAMS_DARK = 'teams-dark';
export const TEAMS_HIGH_CONTRAST = 'teams-high-contrast';

export const themes = [
  { id: WEB_LIGHT, label: 'Web Light', theme: webLightTheme },
  { id: WEB_DARK, label: 'Web Dark', theme: webDarkTheme },
  { id: TEAMS_LIGHT, label: 'Teams Light', theme: teamsLightTheme },
  { id: TEAMS_DARK, label: 'Teams Dark', theme: teamsDarkTheme },
  { id: TEAMS_HIGH_CONTRAST, label: 'Teams High Contrast', theme: teamsHighContrastTheme },
] as const;

export const defaultTheme = themes[0];

export type ThemeIds = typeof themes[number]['id'];
export type ThemeLabels = typeof themes[number]['label'];

export type { Theme };
