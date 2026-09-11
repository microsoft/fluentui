export declare const webLightThemeClassName: 'fui-theme-web-light';
export declare const webDarkThemeClassName: 'fui-theme-web-dark';
export declare const teamsLightThemeClassName: 'fui-theme-teams-light';
export declare const teamsDarkThemeClassName: 'fui-theme-teams-dark';
export declare const teamsHighContrastThemeClassName: 'fui-theme-teams-high-contrast';
export declare const teamsLightV21ThemeClassName: 'fui-theme-teams-light-v21';
export declare const teamsDarkV21ThemeClassName: 'fui-theme-teams-dark-v21';

/** Union of the shipped theme class names. */
export type ThemeClassName =
  | typeof webLightThemeClassName
  | typeof webDarkThemeClassName
  | typeof teamsLightThemeClassName
  | typeof teamsDarkThemeClassName
  | typeof teamsHighContrastThemeClassName
  | typeof teamsLightV21ThemeClassName
  | typeof teamsDarkV21ThemeClassName;

/** Map from the historical theme export name (`webLightTheme`, …) to its CSS class name. */
export declare const themeClassNames: {
  readonly webLightTheme: typeof webLightThemeClassName;
  readonly webDarkTheme: typeof webDarkThemeClassName;
  readonly teamsLightTheme: typeof teamsLightThemeClassName;
  readonly teamsDarkTheme: typeof teamsDarkThemeClassName;
  readonly teamsHighContrastTheme: typeof teamsHighContrastThemeClassName;
  readonly teamsLightV21Theme: typeof teamsLightV21ThemeClassName;
  readonly teamsDarkV21Theme: typeof teamsDarkV21ThemeClassName;
};
