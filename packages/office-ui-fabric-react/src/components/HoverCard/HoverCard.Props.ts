import * as React from 'react';
import { HoverCard } from './HoverCard';
import { ICalloutProps } from '../../Callout';
import { IRenderFunction } from '../../Utilities';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IStyle } from '../../Styling';

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

  /**
   * Custom styles for this component
   */
  styles?: IHoverCardStyles;
}

export enum HoverCardDelay {
  zero = 0,
  medium = 1
}

export interface IHoverCardStyles {
  /**
   * Style for the root element in the default enabled, non-toggled state.
   */
  root?: IStyle;

  /**
   * Style for the main card element.
   */
  card?: IStyle;

  /**
   * Style for the content element in the default enabled, non-toggled state.
   */
  content?: IStyle;
}