/**
 * Class names for the shipped themes. Each has its own stylesheet — `css/themes/<name>.css`,
 * published as `./themes/<name>.css` — whose file stem is the class name without its
 * `fui-theme-` prefix. Import that file and apply the class to any element to theme its
 * subtree. There is NO default theme, so nothing is themed until you do; that is Griffel's
 * contract, where a provider given no theme object leaves every token unset.
 *
 * The generator asserts these constants match the emitted classes AND the package's
 * `./themes/*` export keys; rename all three together. Keep theme-class-names.cjs identical.
 */

export const webLightThemeClassName = 'fui-theme-web-light';
export const webDarkThemeClassName = 'fui-theme-web-dark';
export const teamsLightThemeClassName = 'fui-theme-teams-light';
export const teamsDarkThemeClassName = 'fui-theme-teams-dark';
export const teamsHighContrastThemeClassName = 'fui-theme-teams-high-contrast';
export const teamsLightV21ThemeClassName = 'fui-theme-teams-light-v21';
export const teamsDarkV21ThemeClassName = 'fui-theme-teams-dark-v21';

/** Theme export name → class name. */
export const themeClassNames = {
  webLightTheme: webLightThemeClassName,
  webDarkTheme: webDarkThemeClassName,
  teamsLightTheme: teamsLightThemeClassName,
  teamsDarkTheme: teamsDarkThemeClassName,
  teamsHighContrastTheme: teamsHighContrastThemeClassName,
  teamsLightV21Theme: teamsLightV21ThemeClassName,
  teamsDarkV21Theme: teamsDarkV21ThemeClassName,
};
