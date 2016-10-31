import * as React from 'react';
import { Tooltip } from './Tooltip';
import { ICalloutProps } from '../../index';
import { DirectionalHint } from '../../common/DirectionalHint';

/**
 * Tooltip component props.
 */

export interface ITooltipProps extends React.HTMLProps<HTMLDivElement | Tooltip> {
  /**
   * Properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

  /**
   *  String to be passed to the tooltip
   */
  content?: string;

  /**
   * Element to anchor the Tooltip to.
   */
  targetElement?: HTMLElement;

  /**
   * Indicator of how the tooltip should be anchored to its targetElement.
   * @default DirectionalHint.topCenter
   */
  directionalHint?: DirectionalHint;
}