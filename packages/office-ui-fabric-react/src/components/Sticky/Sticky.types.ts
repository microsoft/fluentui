import * as React from 'react';
import { Sticky } from './Sticky';

export interface IStickyProps extends React.Props<Sticky> {
  /**
   * Gets ref to component interface.
   */
  componentRef?: (component: IStickyProps | null) => void;

  /**
   * Class name to apply to the sticky element if component is sticky.
  */
  stickyClassName?: string;

  /**
   * color to apply as 'background-color' style for sticky element.
  */
  stickyBackgroundColor?: string;

  /**
   * Region to render sticky component in.
   * @default Both
   */
  stickyPosition?: StickyPositionType;
}

export enum StickyPositionType {
  Both = 0,
  Header = 1,
  Footer = 2
}