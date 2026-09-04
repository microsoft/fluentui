export { FluentProvider, fluentProviderClassNames } from './components/FluentProvider';
export type { FluentProviderProps, ThemeClassName } from './components/FluentProvider';

/**
 * Provider-adjacent, windmod-original (no headless counterpart): scales a subtree by a
 * unitless factor on the ambient base scale, re-stamping the enclosing FluentProvider's
 * theme class so every token family follows.
 */
export { ScaleRegion } from './components/ScaleRegion';
export type { ScaleRegionProps } from './components/ScaleRegion';

/**
 * The shipped theme class names, re-exported from the theme package so the provider and
 * its themes come from one import.
 */
export {
  teamsDarkThemeClassName,
  teamsDarkV21ThemeClassName,
  teamsHighContrastThemeClassName,
  teamsLightThemeClassName,
  teamsLightV21ThemeClassName,
  themeClassNames,
  webDarkThemeClassName,
  webLightThemeClassName,
} from '@fluentui/react-tailwind-theme-preview/theme-class-names';

/** The headless context Provider, for consumers who bring their own theming. */
export { Provider, renderProvider, useProvider } from '@fluentui/react-headless-components-preview/provider';
