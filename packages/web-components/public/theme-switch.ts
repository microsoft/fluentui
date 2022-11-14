import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/react-theme';
import { setTheme } from '../src/theme';

const themes = {
  'web-light': webLightTheme,
  'web-dark': webDarkTheme,
  'teams-light': teamsLightTheme,
  'teams-dark': teamsDarkTheme,
};

export function switchTheme(themeName: keyof typeof themes) {
  setTheme(themes[themeName]);
}
