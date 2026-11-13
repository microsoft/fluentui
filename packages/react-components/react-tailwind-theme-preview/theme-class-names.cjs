/**
 * CommonJS twin of theme-class-names.mjs — keep the two files' values identical.
 * The lockstep generator asserts against the .mjs; this file exists so `require()`
 * consumers (e.g. react-windmod-preview's lib-commonjs build) can load the constants.
 */
'use strict';

const webLightThemeClassName = 'fui-theme-web-light';
const webDarkThemeClassName = 'fui-theme-web-dark';
const teamsLightThemeClassName = 'fui-theme-teams-light';
const teamsDarkThemeClassName = 'fui-theme-teams-dark';
const teamsHighContrastThemeClassName = 'fui-theme-teams-high-contrast';
const teamsLightV21ThemeClassName = 'fui-theme-teams-light-v21';
const teamsDarkV21ThemeClassName = 'fui-theme-teams-dark-v21';

const themeClassNames = {
  webLightTheme: webLightThemeClassName,
  webDarkTheme: webDarkThemeClassName,
  teamsLightTheme: teamsLightThemeClassName,
  teamsDarkTheme: teamsDarkThemeClassName,
  teamsHighContrastTheme: teamsHighContrastThemeClassName,
  teamsLightV21Theme: teamsLightV21ThemeClassName,
  teamsDarkV21Theme: teamsDarkV21ThemeClassName,
};

module.exports = {
  webLightThemeClassName,
  webDarkThemeClassName,
  teamsLightThemeClassName,
  teamsDarkThemeClassName,
  teamsHighContrastThemeClassName,
  teamsLightV21ThemeClassName,
  teamsDarkV21ThemeClassName,
  themeClassNames,
};
