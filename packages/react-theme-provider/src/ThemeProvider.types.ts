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
   * Optional interface for registering dynamic styles. Defaults to using `merge-styles`. Use this
   * to opt into a particular rendering implementation, such as `emotion`, `styled-components`, or `jss`.
   * Note: performance will differ between all renders. Please measure your scenarios before using an alternative
   * implementation.
   */
  renderer?: StyleRenderer;

  /**
   * Defines where body-related theme is applied to.
   * Setting to 'element' will apply body styles to the root element of ThemeProvider.
   * Setting to 'body' will apply body styles to document body.
   * Setting to 'none' will not apply body styles to either element or body.
   *
   * @default 'element';
   */
  applyTo?: 'element' | 'body' | 'none';
}

/**
 * State for the ThemeProvider component.
 */
export type ThemeProviderState = Omit<ThemeProviderProps, 'theme'> & {
  theme: Theme;
};
