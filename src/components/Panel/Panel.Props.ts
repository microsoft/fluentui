import * as React from 'react';
import Panel from './Panel';

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
  onDismiss?: () => {};

  /**
  * Additional styling options.
  */
  className?: string;

  /**
  * Type of the panel.
  * @default PanelType.smallFixedRight
  */
  type?: PanelType;
}

export enum PanelType {
  /**
   * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fluid width.
   * Only used on Small screen breakpoints.
   */
  smallFluid,

  /**
   * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fixed width.
   */
  smallFixedFar,

  /**
   * Renders the panel in 'small' mode, anchored to the near side (left in LTR mode), and has a fixed width.
   */
  smallFixedNear,

  /**
   * Renders the panel in 'medium' mode, anchored to the far side (right in LTR mode).
   */
  medium,

  /**
   * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fluid at XXX-Large breakpoint.
   */
  large,

  /**
   * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fixed at XXX-Large breakpoint.
   */
  largeFixed,

  /**
   * Renders the panel in 'extra large' mode, anchored to the far side (right in LTR mode).
   */
  extraLarge
}
