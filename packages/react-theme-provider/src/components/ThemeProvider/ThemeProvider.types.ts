import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { PartialTheme, Theme } from '@fluentui/react-theme';

export interface ThemeProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  theme?: PartialTheme | Theme;
  targetDocument?: Document | undefined;
}

export interface ThemeProviderState extends ThemeProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  theme: Theme;
  /**
   * CSS class that will apply theme CSS variables
   */
  themeClassName: string;
}
