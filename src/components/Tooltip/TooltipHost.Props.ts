import * as React from 'react';
import { TooltipHost } from './TooltipHost';
import { ITooltipProps, TooltipDelay } from './Tooltip.Props';
import { DirectionalHint } from '../../common/DirectionalHint';

/**
 * Tooltip component props.
 */

export interface ITooltipHostProps extends React.HTMLProps<HTMLDivElement | TooltipHost> {
  /**
   * Properties to pass through for Callout, reference detail properties in ITooltipProps
   */
  calloutProps?: ITooltipProps;

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