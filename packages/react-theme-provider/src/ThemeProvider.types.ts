import * as React from 'react';
import { StyleRenderer } from './styleRenderers/types';
import { Theme, PartialTheme } from './types';
import { ComponentProps } from '@fluentui/react-compose/lib/next/index';
/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps extends ComponentProps, React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional ref to the root element.
   */
  ref?: React.Ref<HTMLElement>;

  /**
   * Defines the theme provided by the user.
   */
  theme?: PartialTheme | Theme;

  /**
   * Defines the target window to render into. Defaults to the global window. Providing `null`
   * will opt out of style rendering, which is used for SSR.
   */
  targetWindow?: Window | null;

  /**
   * Optional interface for registering dynamic styles. Defaults to using `merge-styles`. Use this
   * to opt into a particular rendering implementation, such as `emotion`, `styled-components`, or `jss`.
   * Note: performance will differ between all renders. Please measure your scenarios before using an alternative
   * implementation.
   */
  renderer?: StyleRenderer;
}

/**
 * State for the ThemeProvider component.
 */
export type ThemeProviderState = Omit<ThemeProviderProps, 'theme'> & {
  theme: Theme;
};
