import * as React from 'react';
import { TooltipHost } from './TooltipHost';
import { TooltipDelay } from './Tooltip.Props';
import { ICalloutProps } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

export interface ITooltipHost {

}

/**
 * Tooltip component props.
 */
export interface ITooltipHostProps extends React.HTMLProps<HTMLDivElement | TooltipHost> {
  /**
   * Optional class name to apply to the root element of the tooltip host.
   */
  hostClassName?: string;

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
   *
   */
  onlyShowIfOverflow?: boolean;
}
