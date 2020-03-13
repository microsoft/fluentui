import { ThemeInput } from '@fluentui/react-experimental';
import { CustomToolbarVariables } from './darkThemeOverrides';

export const highContrastThemeOverrides: ThemeInput = {
  componentVariables: {
    Toolbar: (): Partial<CustomToolbarVariables> => ({
      ctItemActiveBackgroundOverlay: undefined
    })
  }
};
