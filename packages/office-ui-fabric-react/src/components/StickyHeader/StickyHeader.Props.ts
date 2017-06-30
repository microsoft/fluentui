import * as React from 'react';
import { StickyHeader } from './StickyHeader';

export interface IStickyHeaderProps extends React.Props<StickyHeader> {
  /**
   * Class name to apply to the sticky element if component is sticky.
  */
  stickyClassName?: string;
}