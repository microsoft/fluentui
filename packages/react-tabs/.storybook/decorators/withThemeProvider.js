import React from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider/lib/compat';
import { useCustomizationOptions } from '../knobs/theme';

export const withThemeProvider = storyFn => {
  const customizationOptions = useCustomizationOptions();
  const { customizations, isDark } = customizationOptions;
  const themeProviderProps = {
    theme: customizations ? { tokens: customizations.settings.theme } : undefined,
    style: {
      background: isDark ? 'black' : undefined,
    },
  };

  return <ThemeProvider {...themeProviderProps}>{storyFn()}</ThemeProvider>;
};
