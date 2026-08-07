/**
 * CSS class names for the shipped Fluent themes (theming Phase 2b).
 *
 * Each class is emitted, at build time, by `@fluentui/react-tailwind-theme` inside
 * `@layer fui.theme` and contains ONLY custom-property declarations — the canonical
 * kebab-case token variables (`--color-neutral-background-1: …`, see
 * `migration/griffel-to-tailwind/reports/token-rename-map.json`). Applying one of these
 * classes to any DOM node themes that node's subtree; the default (web light) values are
 * emitted at `:root, :host`, so a theme class is only needed for non-default themes or
 * scoped theming.
 *
 * These constants are the JS read path for the class names — pass them to
 * `FluentProvider`'s `themeClassName` prop or put them on any element directly.
 *
 * LOCKSTEP CONTRACT: the react-tailwind-theme generator
 * (`scripts/generate-themes-css.js`) derives the emitted class names from the theme
 * export names and asserts they equal the constants in this file (it text-reads this
 * file, same as it reads `tokens.ts`); `themeClassNames.test.ts` asserts the same
 * derivation from the jest side. Renaming a theme or a class requires updating both in
 * the same change.
 */

export const webLightThemeClassName = 'fui-theme-web-light';
export const webDarkThemeClassName = 'fui-theme-web-dark';
export const teamsLightThemeClassName = 'fui-theme-teams-light';
export const teamsDarkThemeClassName = 'fui-theme-teams-dark';
export const teamsHighContrastThemeClassName = 'fui-theme-teams-high-contrast';
export const teamsLightV21ThemeClassName = 'fui-theme-teams-light-v21';
export const teamsDarkV21ThemeClassName = 'fui-theme-teams-dark-v21';

/** Union of the shipped theme class names. */
export type ThemeClassName =
  | typeof webLightThemeClassName
  | typeof webDarkThemeClassName
  | typeof teamsLightThemeClassName
  | typeof teamsDarkThemeClassName
  | typeof teamsHighContrastThemeClassName
  | typeof teamsLightV21ThemeClassName
  | typeof teamsDarkV21ThemeClassName;

/**
 * Map from the historical theme export name (`webLightTheme`, …) to its CSS class name.
 * Handy for harnesses that enumerate themes; the per-theme constants above are the
 * primary read path.
 */
export const themeClassNames = {
  webLightTheme: webLightThemeClassName,
  webDarkTheme: webDarkThemeClassName,
  teamsLightTheme: teamsLightThemeClassName,
  teamsDarkTheme: teamsDarkThemeClassName,
  teamsHighContrastTheme: teamsHighContrastThemeClassName,
  teamsLightV21Theme: teamsLightV21ThemeClassName,
  teamsDarkV21Theme: teamsDarkV21ThemeClassName,
} as const;
