import * as React from 'react';
import { Tooltip } from './Tooltip';
import { TooltipContent } from './TooltipContent';
import { ICalloutProps } from '../../index';

/**
 * Tooltip component props.
 */

export interface ITooltipProps extends React.Props<Tooltip|TooltipContent> {
  /**
   * Properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

  /**
   * Element to anchor the Tooltip to.
   */
  targetElement?: HTMLElement;
}