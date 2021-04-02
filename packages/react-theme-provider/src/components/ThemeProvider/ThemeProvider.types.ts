import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { PartialTheme, Theme } from '@fluentui/react-theme';

export interface ThemeProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  theme?: PartialTheme | Theme;
}

export const themeProviderShorthandProps = [] as const;

export type ThemeProviderState = ComponentState<
  React.RefObject<HTMLElement>,
  ThemeProviderProps & {
    theme: Theme;
  },
  /* ShorthandProps: */ typeof themeProviderShorthandProps[number],
  /* DefaultedProps: */ 'theme'
>;
