/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface ILinkProps extends React.HTMLProps<HTMLLabelElement> {
  /**
   *  The props of pop up window.
   */
  popupWindowProps?: IPopupWindowProps;
}

export interface IPopupWindowProps {
  /**
   * Title of pop up window
   */
  title: string;

  /**
   * Width of pop up window
   */
  width: number;

  /**
   * Height of pop up window
   */

  height: number;

  /**
   * The position of pop up window
   */
  positionWindowPosition: PopupWindowPosition;
}

/**
 * The position of pop up window
 */
export enum PopupWindowPosition {
  /**
   * PopupWindowPosition would be located in center of screen
   */
  center,

  /**
   * PopupWindowPosition would be located in right top of screen
   */
  rightTop,

  /**
   * PopupWindowPosition would be located in left top of screen
   */
  leftTop,

  /**
   * PopupWindowPosition would be located in right bottom of screen
   */
  rightBottom,

  /**
   * PopupWindowPosition would be located in left bottom of screen
   */
  leftBottom
}
