import { Theme, ThemePrepared } from './Theme';
import { merge } from '@uifabric/utilities';

/**
 * TODO: createTheme
 */
export const createTheme = (...themes: Theme[]): ThemePrepared => {
  const partialTheme = merge<Theme>({}, ...themes);

  return partialTheme as ThemePrepared;
};
