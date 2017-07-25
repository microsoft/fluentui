import * as React from 'react';
import { Tooltip } from './Tooltip';
import { ICalloutProps } from '../../Callout';
import { IRenderFunction } from '../../Utilities';
import { DirectionalHint } from '../../common/DirectionalHint';

export interface ITooltip {

}

/**
 * Tooltip component props.
 */
export interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement | Tooltip> {
  /**
   * Optional callback to access the ITooltip interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ITooltip) => void;

  /**
   * Properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

  /**
   *  String to be passed to the tooltip
   */
  content?: string;

  /**
   *  Render function to populate content area
   */
  onRenderContent?: IRenderFunction<ITooltipProps>;

  /**
   * Length of delay. Can be set to zero if you do not want a delay.
   * @default medium
   */
  delay?: TooltipDelay;

  /**
   * Element to anchor the Tooltip to.
   */
  targetElement?: HTMLElement;

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
}

export enum TooltipDelay {
  zero = 0,
  medium = 1
}