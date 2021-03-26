import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { PartialTheme, Theme } from '@fluentui/react-theme';

/**
 * {@docCategory ThemeProvider }
 */
export interface ThemeProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  theme?: PartialTheme | Theme;
}

/**
 * {@docCategory ThemeProvider }
 */
export interface ThemeProviderState extends ThemeProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  theme: Theme;
}
