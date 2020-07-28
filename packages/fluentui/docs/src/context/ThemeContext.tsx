import * as React from 'react';

export type ThemeName = 'teamsTheme' | 'teamsDarkTheme' | 'teamsHighContrastTheme';
type ThemeOption = { text: string; value: ThemeName };

export type ThemeContextData = {
  themeName: ThemeName;
  themeOptions: ThemeOption[];
  changeTheme: (event: React.SyntheticEvent, data: { value: ThemeOption }) => void;
};

export const themeContextDefaults: ThemeContextData = {
  themeName: 'teamsTheme',
  themeOptions: [
    { text: 'Teams', value: 'teamsTheme' },
    { text: 'Teams Dark', value: 'teamsDarkTheme' },
    { text: 'Teams High Contrast', value: 'teamsHighContrastTheme' },
  ],
  changeTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeContextData>(themeContextDefaults);
