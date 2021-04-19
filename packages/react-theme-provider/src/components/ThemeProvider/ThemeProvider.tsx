import * as React from 'react';
import { ThemeProviderProps } from './ThemeProvider.types';
import { useThemeProvider } from './useThemeProvider';
import { useThemeProviderStyles } from './useThemeProviderStyles';
import { renderThemeProvider } from './renderThemeProvider';

export const ThemeProvider = React.forwardRef<HTMLElement, ThemeProviderProps>((props, ref) => {
  const state = useThemeProvider(props, ref);

  useThemeProviderStyles(state);
  return renderThemeProvider(state);
});

ThemeProvider.displayName = 'ThemeProvider';
