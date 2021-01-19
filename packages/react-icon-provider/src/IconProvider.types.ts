import * as React from 'react';
import { IIconSubset } from '@fluentui/style-utilities';

/**
 * {@docCategory IconProvider}
 * Props for the IconProvider component.
 */
export interface IconProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * A component that should be used as the root element of the ThemeProvider component.
   */
  as?: React.ElementType;

  /**
   * Optional ref to the root element.
   */
  ref?: React.Ref<HTMLElement>;

  /**
   * Defines the icons provided by the user.
   */
  icons: IIconSubset;
}
