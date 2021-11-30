import * as React from 'react';

export type ThemeName =
  | 'teamsTheme'
  | 'teamsDarkTheme'
  | 'teamsHighContrastTheme'
  | 'teamsV2Theme'
  | 'teamsDarkV2Theme'
  | 'systemColorsTheme';
export type ThemeOption = { text: string; value: ThemeName };

export type ThemeContextData = {
  themeName: ThemeName;
  themeOptions: ThemeOption[];
  changeTheme: (event: React.SyntheticEvent, data: { value: ThemeOption }) => void;
};

export const themeContextDefaults: ThemeContextData = {
  themeName: 'systemColorsTheme',
  themeOptions: [
    // { text: 'Teams', value: 'teamsTheme' },
    // { text: 'Teams Dark', value: 'teamsDarkTheme' },
    // { text: 'Teams High Contrast', value: 'teamsHighContrastTheme' },
    // { text: 'Teams V2', value: 'teamsV2Theme' },
    // { text: 'Teams Dark V2', value: 'teamsDarkV2Theme' },
    { text: 'System Colors', value: 'systemColorsTheme' },
  ],
  changeTheme: () => {},
};

// Existing screener tests assume that they're running with the v1 theme, so
// set that as the default theme when inside screener. This check is safe
// because this context is only used in the documentation website.
if (location.pathname.includes('/react-northstar-screener')) {
  themeContextDefaults.themeName = 'teamsTheme';
}

export const ThemeContext = React.createContext<ThemeContextData>(themeContextDefaults);
