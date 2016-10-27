/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface ILinkProps extends React.HTMLProps<HTMLAnchorElement | HTMLButtonElement> {
  /**
   * Whether the link is disabled
   */
  disabled?: boolean;
}
