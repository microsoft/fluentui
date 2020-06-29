import * as React from 'react';
import { IRefObject } from '../../Utilities';
import { Sticky } from './Sticky';

// tslint:disable-next-line:deprecation
export interface IStickyProps extends React.Props<Sticky> {
  /**
   * Gets ref to component interface.
   */
  componentRef?: IRefObject<IStickyProps>;

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
   * @defaultvalue Both
   */
  stickyPosition?: StickyPositionType;

  /**
   * If true, then match scrolling position of placeholder element in Sticky.
   * @defaultvalue true
   */
  isScrollSynced?: boolean;
}

export enum StickyPositionType {
  Both = 0,
  Header = 1,
  Footer = 2,
}
