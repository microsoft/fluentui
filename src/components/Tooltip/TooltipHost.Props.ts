import * as React from 'react';
import { TooltipHost } from './TooltipHost';
import { ITooltipProps } from '../../index';
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
   * Number of milliseconds to wait before showing the tooltip
   * @default 1000
   */
  delay?: number;

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