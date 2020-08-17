import * as React from 'react';
import { Theme, PartialTheme } from './types';

/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the theme provided by the user.
   */
  theme?: PartialTheme | Theme;
}
