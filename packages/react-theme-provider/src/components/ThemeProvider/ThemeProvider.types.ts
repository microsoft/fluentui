import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { PartialTheme, Theme } from '@fluentui/react-theme';

export interface ThemeProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  theme?: PartialTheme | Theme;
}

export interface ThemeProviderState extends ThemeProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  theme: Theme;
  document: Document | undefined;
}
