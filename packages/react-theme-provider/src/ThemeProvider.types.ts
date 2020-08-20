import * as React from 'react';
import { Theme, PartialTheme } from '@fluentui/theme';

export { Theme, PartialTheme } from '@fluentui/theme';

/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the theme provided by the user.
   */
  theme?: PartialTheme | Theme;
}
