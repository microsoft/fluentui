import { Theme, ThemePrepared } from './types';
import { merge } from '@uifabric/utilities';

/**
 * Creates a blank initial theme
 */
const createDefaultTheme = () => ({
  stylesheets: [],
  tokens: {},
});

/**
 * Merges all themes on top of a blank initial theme and ensures the theme is fully qualified.
 */
export const createTheme = (...themes: (undefined | Theme | ThemePrepared)[]): ThemePrepared => {
  const partialTheme = merge<Theme>(createDefaultTheme(), ...themes);

  // Correctly merge stylesheets array
  partialTheme.stylesheets = [];
  themes.forEach(theme => theme && theme.stylesheets && partialTheme.stylesheets?.push(...theme.stylesheets));

  return partialTheme as ThemePrepared;
};
