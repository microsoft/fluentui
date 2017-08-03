import * as React from 'react';
import { Sticky } from './Sticky';

export interface IStickyProps extends React.Props<Sticky> {
  /**
   * Optional callback to access the IDialog interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IStickyProps) => void;

  /**
   * Class name to apply to the sticky element if component is sticky.
  */
  stickyClassName?: string;
}