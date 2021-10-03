import * as React from 'react';
import type { IIconSubset } from '@fluentui/style-utilities';

/**
 * Props for the IconProvider component.
 */
export interface IconProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the icons provided by the user.
   */
  icons: IIconSubset;
}
