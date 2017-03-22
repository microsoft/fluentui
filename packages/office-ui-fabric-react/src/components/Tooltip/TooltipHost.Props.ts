import * as React from 'react';
import { TooltipHost } from './TooltipHost';
import { TooltipDelay } from './Tooltip.Props';
import { ICalloutProps } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

/**
 * Tooltip component props.
 */

export interface ITooltipHostProps extends React.HTMLProps<HTMLDivElement | TooltipHost> {
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
}
