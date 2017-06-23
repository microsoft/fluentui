import * as React from 'react';
import { StickyHeader } from './StickyHeader';

export interface IStickyHeaderProps extends React.Props<StickyHeader> {
  /**
   * Class name to apply to the root in addition to ms-ScrollablePane.
  */
  className?: string;
}