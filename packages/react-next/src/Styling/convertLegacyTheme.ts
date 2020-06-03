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
      // tslint:disable-next-line:no-any
      tokens: legacyTheme as any,
    };

    return newTheme;
  },
);
