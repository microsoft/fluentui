import { ThemePrepared } from '@fluentui/react-theme-provider';
import { ITheme, memoizeFunction } from 'office-ui-fabric-react';

/**
 * Convert legacy ITheme to new ThemePrepared.
 */
export const convertLegacyTheme = memoizeFunction(
  (legacyTheme: ITheme): ThemePrepared => {
    const newTheme: ThemePrepared = {
      stylesheets: [],

      // TODO: convert theme once we know its shape.
      tokens: legacyTheme as any,
    };

    return newTheme;
  },
);
