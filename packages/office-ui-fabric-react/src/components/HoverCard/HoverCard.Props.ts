import * as React from 'react';
import { HoverCard } from './HoverCard';
import { ICalloutProps } from '../../Callout';
import { IRenderFunction } from '../../Utilities';
import { DirectionalHint } from '../../common/DirectionalHint';

export interface IHoverCard {

}

/**
 * HoverCard component props.
 */
export interface IHoverCardProps extends React.HTMLAttributes<HTMLDivElement | HoverCard> {
  /**
   * Optional callback to access the IHoverCard interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IHoverCard) => void;

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
  onRenderContent?: IRenderFunction<IHoverCardProps>;

  /**
   * Length of delay. Can be set to zero if you do not want a delay.
   * @default medium
   */
  delay?: HoverCardDelay;

  /**
   * Element to anchor the HoverCard to.
   */
  targetElement?: HTMLElement;

  /**
   * Indicator of how the tooltip should be anchored to its targetElement.
   * @default DirectionalHint.topCenter
   */
  directionalHint?: DirectionalHint;
}

export enum HoverCardDelay {
  zero = 0,
  medium = 1
}