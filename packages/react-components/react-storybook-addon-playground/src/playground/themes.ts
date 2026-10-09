import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme, type Theme } from '@fluentui/react-components';

export interface ThemeOption {
  id: string;
  label: string;
  theme: Theme;
  dark: boolean;
}

export const themeOptions: ThemeOption[] = [
  { id: 'web-light', label: 'Web Light', theme: webLightTheme, dark: false },
  { id: 'web-dark', label: 'Web Dark', theme: webDarkTheme, dark: true },
  { id: 'teams-light', label: 'Teams Light', theme: teamsLightTheme, dark: false },
  { id: 'teams-dark', label: 'Teams Dark', theme: teamsDarkTheme, dark: true },
];

export const defaultThemeOption = themeOptions[0];

export function getThemeOption(id: string | null | undefined): ThemeOption {
  return themeOptions.find(option => option.id === id) ?? defaultThemeOption;
}
