import * as React from 'react';
import { StyleRenderer } from './styleRenderers/types';
import { Theme, PartialTheme } from './types';
import { ICustomizerContext } from '@uifabric/utilities';

/**
 * {@docCategory ThemeProvider}
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * A component that should be used as the root element of the ThemeProvider component.
   */
  as?: React.ElementType;

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
   * @defaultvalue 'element'
   */
  applyTo?: 'element' | 'body' | 'none';
}

/**
 * State for the ThemeProvider component.
 */
export type ThemeProviderState = Omit<ThemeProviderProps, 'theme' | 'ref'> & {
  theme: Theme;

  ref: React.RefObject<HTMLElement>;

  customizerContext: ICustomizerContext;
};
