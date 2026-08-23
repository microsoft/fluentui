export { FluentProvider, fluentProviderClassNames } from './components/FluentProvider';
export type { ThemeClassName, FluentProviderProps } from './components/FluentProvider';

/**
 * The shipped theme class names, re-exported from the theme package so the provider and
 * its themes come from one import.
 */
export {
  themeClassNames,
  teamsDarkThemeClassName,
  teamsDarkV21ThemeClassName,
  teamsHighContrastThemeClassName,
  teamsLightThemeClassName,
  teamsLightV21ThemeClassName,
  webDarkThemeClassName,
  webLightThemeClassName,
} from '@fluentui/react-tailwind-theme-preview/theme-class-names';

/** The headless context Provider, for consumers who bring their own theming. */
export { Provider, renderProvider, useProvider } from '@fluentui/react-headless-components-preview/provider';
