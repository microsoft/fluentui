import * as React from 'react';
import { Sticky } from './Sticky';

export interface IStickyProps extends React.Props<Sticky> {
  /**
   * Gets ref to component interface.
   */
  componentRef?: (component: IStickyProps) => void;

  /**
   * Class name to apply to the sticky element if component is sticky.
  */
  stickyClassName?: string;

  /**
   * Region to render sticky component in.  Defaults to Both.
   */
  stickyPosition?: StickyPositionType;
}

export enum StickyPositionType {
  Both = 0,
  Header = 1,
  Footer = 2
}