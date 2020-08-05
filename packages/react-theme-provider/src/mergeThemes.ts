import { PartialTheme, Theme } from './types';
import { merge } from '@uifabric/utilities';

/**
 * Merges all themes on top of a blank initial theme and ensures the theme is fully qualified.
 */
export const mergeThemes = (...themes: (undefined | PartialTheme | Theme)[]): Theme => {
  const partialTheme = merge<PartialTheme | Theme>({}, ...themes);

  // Correctly merge stylesheets array
  partialTheme.stylesheets = [];
  themes.forEach(theme => theme && theme.stylesheets && partialTheme.stylesheets?.push(...theme.stylesheets));

  return partialTheme as Theme;
};
