import { Theme } from '../index';
import { memoizeFunction } from '@uifabric/utilities';
import { IPartialTheme } from '@uifabric/styling';

/**
 * Convert legacy ITheme to new Theme.
 */
export const convertLegacyTheme = memoizeFunction(
  (legacyTheme: IPartialTheme): Theme => {
    const newTheme: Theme = {
      stylesheets: [],

      // TODO: convert theme once we know its shape.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tokens: legacyTheme as any,
    };

    return newTheme;
  },
);
