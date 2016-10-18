import * as React from 'react';
import { Tooltip } from './Tooltip';
import { ICalloutProps } from '../../index';

/**
 * Tooltip component props.
 */

export interface ITooltipProps extends React.Props<Tooltip> {
  /**
   * Properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

  /**
   * Element to anchor the Tooltip to.
   */
  targetElement?: HTMLElement;
}