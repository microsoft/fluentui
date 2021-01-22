import React from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';

export const withThemeProvider = (Story, context) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);
