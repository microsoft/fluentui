import { Theme, ThemePrepared } from './types';
import { merge } from '@uifabric/utilities';

/**
 * TODO: createTheme
 */
export const createTheme = (...themes: (undefined | Theme | ThemePrepared)[]): ThemePrepared => {
  const partialTheme = merge<Theme>({ tokens: {}, stylesheets: [] }, ...themes);

  return partialTheme as ThemePrepared;
};
