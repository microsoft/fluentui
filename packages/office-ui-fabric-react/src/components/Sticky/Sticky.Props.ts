import * as React from 'react';
import { Sticky } from './Sticky';

export interface IStickyProps extends React.Props<Sticky> {
  /**
   * Class name to apply to the sticky element if component is sticky.
  */
  stickyClassName?: string;
}