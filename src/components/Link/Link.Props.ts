/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface ILinkProps extends React.HTMLProps<HTMLLabelElement> {
  /**
   * Whether the link is disabled
   */
  disabled?: boolean;

  /**
   * Function to call when the link is clicked.
   */
  onClick?: (ev?: React.MouseEvent) => void;
}
