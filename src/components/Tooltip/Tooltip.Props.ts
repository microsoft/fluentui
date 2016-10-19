import * as React from 'react';
import { Tooltip } from './Tooltip';
import { ICalloutProps } from '../../index';
import { DirectionalHint } from '../../common/DirectionalHint';


/**
 * Tooltip component props.
 */

export interface ITooltipProps extends React.Props<Tooltip> {
  /**
   * Properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

  /**
   * Indicator of how the callout should be anchored to its targetElement.
   * @default DirectionalHint.rightCenter
   */
  directionalHint?: DirectionalHint;

  on?: string;

  delay?: string;

  tooltipContent?: string;

  /**
   * Element to anchor the Tooltip to.
   */
  targetElement?: HTMLElement;
}