import * as React from 'react';
import { useThemeProvider } from './useThemeProvider';
import { ThemeProviderProps } from './ThemeProvider.types';
import { renderThemeProvider } from './renderThemeProvider';

/**
 * {@docCategory ThemeProvider }
 * {@docCategory ThemeProvider }
 */
export const ThemeProvider = React.forwardRef<HTMLElement, ThemeProviderProps>((props, ref) => {
  const state = useThemeProvider(props, ref);
  return renderThemeProvider(state);
});

ThemeProvider.displayName = 'ThemeProvider';
