import * as React from 'react';
import { ScrollablePane } from './ScrollablePane';

export interface IScrollablePaneProps extends React.HTMLAttributes<HTMLElement | ScrollablePane> {
  /**
   * Optional callback to access the IContextualMenu interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IScrollablePaneProps) => void;

  /**
   * Class name to apply to the root in addition to ms-ScrollablePane.
  */
  className?: string;
}