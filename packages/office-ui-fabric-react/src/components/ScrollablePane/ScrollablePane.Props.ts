import * as React from 'react';
import { ScrollablePane } from './ScrollablePane';

export interface IScrollablePaneProps extends React.HTMLAttributes<HTMLElement | ScrollablePane> {
  /**
   * Gets ref to component interface.
   */
  componentRef?: (component: IScrollablePaneProps) => void;

  /**
   * Class name to apply to the root in addition to ms-ScrollablePane.
  */
  className?: string;
}