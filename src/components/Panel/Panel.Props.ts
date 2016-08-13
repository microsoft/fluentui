import * as React from 'react';
import { Panel } from './Panel';

export interface IPanelProps extends React.Props<Panel> {
  /**
  * Whether the panel is displayed.
  * @default false
  */
  isOpen?: boolean;

  /**
  * Has the close button visible.
  * @default true
  */
  hasCloseButton?: boolean;

  /**
  * Whether the panel can be light dismissed.
  * @default false
  */
  isLightDismiss?: boolean;

  /**
  * Header text for the Panel.
  * @default ""
  */
  headerText?: string;

  /**
  * Event handler for when the panel is closed.
  */
  onDismiss?: () => void;

  /**
  * Additional styling options.
  */
  className?: string;

  /**
  * Type of the panel.
  * @default PanelType.smallFixedRight
  */
  type?: PanelType;

  /**
   * Aria label on close button
   */
  closeButtonAriaLabel?: string;

  /**
   * Optional parameter to provider the class name for header text
   */
  headerClassName?: string;
}

export enum PanelType {
  /**
   * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fluid width.
   * Only used on Small screen breakpoints.
   * Small: 320-479px width (full screen), 16px Left/Right padding
   * Medium: <unused>
   * Large: <unused>
   * XLarge: <unused>
   * XXLarge: <unused>
   */
  smallFluid,

  /**
   * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fixed width.
   * Small: 272px width, 16px Left/Right padding
   * Medium: 340px width, 16px Left/Right padding
   * Large: 340px width, 32px Left/Right padding
   * XLarge: 340px width, 32px Left/Right padding
   * XXLarge: 340px width, 40px Left/Right padding
   */
  smallFixedFar,

  /**
   * Renders the panel in 'small' mode, anchored to the near side (left in LTR mode), and has a fixed width.
   * Small: 272px width, 16px Left/Right padding
   * Medium: 272px width, 16px Left/Right padding
   * Large: 272px width, 32px Left/Right padding
   * XLarge: 272px width, 32px Left/Right padding
   * XXLarge: 272px width, 32px Left/Right padding
   */
  smallFixedNear,

  /**
   * Renders the panel in 'medium' mode, anchored to the far side (right in LTR mode).
   * Small: <adapts to smallFluid>
   * Medium: <adapts to smallFixedFar>
   * Large: 48px fixed left margin, 32px Left/Right padding
   * XLarge: 644px width, 32px Left/Right padding
   * XXLarge: 643px width, 40px Left/Right padding
   */
  medium,

  /**
   * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fluid at XXX-Large breakpoint.
   * Small: <adapts to smallFluid>
   * Medium:  <adapts to smallFixedFar>
   * Large: <adapts to medium>
   * XLarge: 48px fixed left margin, 32px Left/Right padding
   * XXLarge: 48px fixed left margin, 32px Left/Right padding
   * XXXLarge: 48px fixed left margin, (no redlines for padding, assuming previous breakpoint)
   */
  large,

  /**
   * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fixed at XXX-Large breakpoint.
   * Small: <adapts to smallFluid>
   * Medium:  <adapts to smallFixedFar>
   * Large: <adapts to medium>
   * XLarge: 48px fixed left margin, 32px Left/Right padding
   * XXLarge: 48px fixed left margin, 32px Left/Right padding
   * XXXLarge: 940px width, (no redlines for padding, assuming previous breakpoint)
   */
  largeFixed,

  /**
   * Renders the panel in 'extra large' mode, anchored to the far side (right in LTR mode).
   * Small: <adapts to smallFluid>
   * Medium: <adapts to smallFixedFar>
   * Large: <adapts to medium>
   * XLarge: <adapts to large>
   * XXLarge: 176px fixed left margin, 40px Left/Right padding
   * XXXLarge: 176px fixed left margin, 40px Left/Right padding
   */
  extraLarge
}
