import { ThemeInput } from '@fluentui/react';
import { CustomToolbarVariables } from './darkThemeOverrides';

export const highContrastThemeOverrides: ThemeInput = {
  componentVariables: {
    Toolbar: (): Partial<CustomToolbarVariables> => ({
      ctItemActiveBackgroundOverlay: undefined
    })
  }
};
