import * as React from 'react';
import { TooltipHost } from './TooltipHost';
import { TooltipDelay, ITooltipProps } from './Tooltip.Props';
import { ICalloutProps } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

export interface ITooltipHost {

}

export enum TooltipOverflowMode {
  /** Only show tooltip if parent DOM element is overflowing */
  Parent,

  /** Only show tooltip if tooltip host's content is overflowing */
  Self
}

/**
 * Tooltip component props.
 */
export interface ITooltipHostProps extends React.HTMLAttributes<HTMLDivElement | TooltipHost> {
  /**
   * Optional callback to access the ITooltipHost interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ITooltipHost) => void;

  /**
   * Additional properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

  /**
   * Additional properties to pass through for Tooltip, reference detail properties in ITooltipProps
   */
  tooltipProps?: ITooltipProps;

  /**
   * Whether or not to mark the container as described by the tooltip.
   * If not specified, the caller should mark as element as described by the tooltip id.
   */
  setAriaDescribedBy?: boolean;

  /**
   * Length of delay
   * @default medium
   */
  delay?: TooltipDelay;

  /**
   * String to be passed to the tooltip
   */
  content?: string;

  /**
   * Indicator of how the tooltip should be anchored to its targetElement.
   * @default DirectionalHint.topCenter
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * Only show if there is overflow. If set, the tooltip hosts observes  and only shows the tooltip if this element has overflow.
   * It also uses the parent as target element for the tooltip.
   */
  overflowMode?: TooltipOverflowMode;

  /**
   * Optional class name to apply to tooltip host.
   */
  hostClassName?: string;
}
