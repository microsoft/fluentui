import * as React from 'react';

export type ThemeName =
  | 'teamsTheme'
  | 'teamsDarkTheme'
  | 'teamsHighContrastTheme'
  | 'teamsV2Theme'
  | 'teamsDarkV2Theme'
  | 'teamsForcedColorsTheme';
export type ThemeOption = { text: string; value: ThemeName };

export type ThemeContextData = {
  themeName: ThemeName;
  themeOptions: ThemeOption[];
  changeTheme: (event: React.SyntheticEvent, data: { value: ThemeOption }) => void;
};

export const themeContextDefaults: ThemeContextData = {
  themeName: 'teamsV2Theme',
  themeOptions: [
    { text: 'Teams', value: 'teamsTheme' },
    { text: 'Teams Dark', value: 'teamsDarkTheme' },
    { text: 'Teams High Contrast', value: 'teamsHighContrastTheme' },
    { text: 'Teams V2', value: 'teamsV2Theme' },
    { text: 'Teams Dark V2', value: 'teamsDarkV2Theme' },
    { text: 'Teams Forced Colors', value: 'teamsForcedColorsTheme' },
  ],
  changeTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeContextData>(themeContextDefaults);
