import { ThemeInput } from '@fluentui/react-northstar';
import { CustomToolbarVariables } from './darkThemeOverrides';

export const highContrastThemeOverrides: ThemeInput = {
  componentVariables: {
    Toolbar: (): Partial<CustomToolbarVariables> => ({
      ctItemActiveBackgroundOverlay: undefined,
    }),
  },
};
