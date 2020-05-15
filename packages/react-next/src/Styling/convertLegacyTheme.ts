import { Theme } from '@fluentui/react-theme-provider';
import { ITheme, memoizeFunction } from 'office-ui-fabric-react';

/**
 * Convert legacy ITheme to new Theme.
 */
export const convertLegacyTheme = memoizeFunction(
  (legacyTheme: ITheme): Theme => {
    const newTheme: Theme = {
      stylesheets: [],

      // TODO: convert theme once we know its shape.
      tokens: legacyTheme as any,
    };

    return newTheme;
  },
);
