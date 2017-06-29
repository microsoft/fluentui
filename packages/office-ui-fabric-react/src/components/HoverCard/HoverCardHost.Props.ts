import * as React from 'react';
import { HoverCardHost } from './HoverCardHost';
import { IHoverCardProps } from './HoverCard.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IStyle } from '../../Styling';

export interface IHoverCardHost {

}

/**
 * HoverCard component props.
 */
export interface IHoverCardHostProps extends React.HTMLAttributes<HTMLDivElement | HoverCardHost> {
  /**
   * Optional callback to access the IHoverCardHost interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IHoverCardHost) => void;

  /**
   * Additional properties to pass through for HoverCard, reference detail properties in IHoverCardProps
   */
  hoverCardProps?: IHoverCardProps;

  /**
   * Whether or not to mark the container as described by the hover card.
   * If not specified, the caller should mark as element as described by the hover card id.
   */
  setAriaDescribedBy?: boolean;

  /**
   * Length of compact card delay
   */
  cardOpenDelay?: number;

  /**
   * Length of card dismiss delay. A min number is necessary for pointer to hop between target and card
   */
  cardDismissDelay?: number;

  /**
   * Indicator of how the hover card should be anchored to its targetElement.
   * @default DirectionalHint.topCenter
   */
  directionalHint?: DirectionalHint;

  /**
   * If true disables Card dismiss upon mouse leave, so that card sticks around.
   * @default false
   */
  sticky?: boolean;

  /**
   * Custom styles for this component
   */
  styles?: IHoverCardHostStyles;
}

export interface IHoverCardHostStyles {
  /**
   * Style for the host element in the default enabled, non-toggled state.
   */
  host?: IStyle;
}
