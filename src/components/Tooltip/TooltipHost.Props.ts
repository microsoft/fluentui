import * as React from 'react';
import { Tooltip } from './Tooltip';
import { ITooltipProps } from '../../index';

/**
 * Tooltip component props.
 */

export interface ITooltipHostProps extends React.Props<Tooltip> {
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
}