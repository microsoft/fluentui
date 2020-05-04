import { Theme, ThemePrepared } from './types';
import { merge } from '@uifabric/utilities';

/**
 * TODO: createTheme
 */
export const createTheme = (...themes: Theme[]): ThemePrepared => {
  const partialTheme = merge<Theme>({}, ...themes);

  return partialTheme as ThemePrepared;
};
