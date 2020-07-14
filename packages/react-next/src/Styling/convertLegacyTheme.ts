import { Theme } from '@fluentui/react-theme-provider';
import { memoizeFunction, IPartialTheme } from 'office-ui-fabric-react';

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
