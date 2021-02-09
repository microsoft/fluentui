import * as React from 'react';
import { IIconSubset } from '@fluentui/style-utilities';

/**
 * {@docCategory IconProvider}
 * Props for the IconProvider component.
 */
export interface IconProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the icons provided by the user.
   */
  icons: IIconSubset;
}
