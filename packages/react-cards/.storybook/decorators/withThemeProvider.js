import React from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { useTheme } from '../knobs/theme';

export const withThemeProvider = storyFn => {
  const { theme } = useTheme();

  return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
};
