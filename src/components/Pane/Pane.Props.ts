import * as React from 'react';
import { Pane } from './Pane';

export interface IPaneProps extends React.Props<Pane> {
  /**
  * Whether the pane is displayed.
  * @default false
  */
  isOpen?: boolean;

  /**
  * Has the close button visible.
  * @default true
  */
  hasCloseButton?: boolean;

  /**
  * Header text for the Pane.
  * @default ""
  */
  headerText?: string;

  /**
  * Event handler for when the pane is closed.
  */
  onDismiss?: () => void;

  /**
  * Additional styling options.
  */
  className?: string;

  /**
  * Type of the pane.
  * @default PaneType.smallFixedRight
  */
  type?: PaneType;

  /**
   * Aria label on close button
   */
  closeButtonAriaLabel?: string;

  /**
   * Optional parameter to provider the class name for header text
   */
  headerClassName?: string;
}

export enum PaneType {
  /**
   * Renders the pane in 'small' mode, anchored to the far side (right in LTR mode), and has a fluid width.
   * Only used on Small screen breakpoints.
   * Small: 320-479px width (full screen), 16px Left/Right padding
   * Medium: <unused>
   * Large: <unused>
   * XLarge: <unused>
   * XXLarge: <unused>
   */
  smallFluid,

  /**
   * Renders the pane in 'small' mode, anchored to the far side (right in LTR mode), and has a fixed width.
   * Small: 272px width, 16px Left/Right padding
   * Medium: 340px width, 16px Left/Right padding
   * Large: 340px width, 32px Left/Right padding
   * XLarge: 340px width, 32px Left/Right padding
   * XXLarge: 340px width, 40px Left/Right padding
   */
  smallFixedFar,

  /**
   * Renders the pane in 'small' mode, anchored to the near side (left in LTR mode), and has a fixed width.
   * Small: 272px width, 16px Left/Right padding
   * Medium: 272px width, 16px Left/Right padding
   * Large: 272px width, 32px Left/Right padding
   * XLarge: 272px width, 32px Left/Right padding
   * XXLarge: 272px width, 32px Left/Right padding
   */
  smallFixedNear,

  /**
   * Renders the pane in 'medium' mode, anchored to the far side (right in LTR mode).
   * Small: <adapts to smallFluid>
   * Medium: <adapts to smallFixedFar>
   * Large: 48px fixed left margin, 32px Left/Right padding
   * XLarge: 644px width, 32px Left/Right padding
   * XXLarge: 643px width, 40px Left/Right padding
   */
  medium,

  /**
   * Renders the pane in 'large' mode, anchored to the far side (right in LTR mode), and is fluid at XXX-Large breakpoint.
   * Small: <adapts to smallFluid>
   * Medium:  <adapts to smallFixedFar>
   * Large: <adapts to medium>
   * XLarge: 48px fixed left margin, 32px Left/Right padding
   * XXLarge: 48px fixed left margin, 32px Left/Right padding
   * XXXLarge: 48px fixed left margin, (no redlines for padding, assuming previous breakpoint)
   */
  large,

  /**
   * Renders the pane in 'large' mode, anchored to the far side (right in LTR mode), and is fixed at XXX-Large breakpoint.
   * Small: <adapts to smallFluid>
   * Medium:  <adapts to smallFixedFar>
   * Large: <adapts to medium>
   * XLarge: 48px fixed left margin, 32px Left/Right padding
   * XXLarge: 48px fixed left margin, 32px Left/Right padding
   * XXXLarge: 940px width, (no redlines for padding, assuming previous breakpoint)
   */
  largeFixed,

  /**
   * Renders the pane in 'extra large' mode, anchored to the far side (right in LTR mode).
   * Small: <adapts to smallFluid>
   * Medium: <adapts to smallFixedFar>
   * Large: <adapts to medium>
   * XLarge: <adapts to large>
   * XXLarge: 176px fixed left margin, 40px Left/Right padding
   * XXXLarge: 176px fixed left margin, 40px Left/Right padding
   */
  extraLarge
}
