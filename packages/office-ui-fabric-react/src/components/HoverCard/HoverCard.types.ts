import * as React from 'react';

import { IExpandingCardProps } from './ExpandingCard.types';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, KeyCodes, IStyleFunctionOrObject } from '../../Utilities';

export interface IHoverCard {}

/**
 * HoverCard component props.
 */
export interface IHoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IHoverCardHost interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IHoverCard>;

  /**
   * Additional properties to pass through for HoverCard, reference detail properties in IHoverCardProps
   */
  expandingCardProps?: IExpandingCardProps;

  /**
   * Whether or not to mark the container as described by the hover card.
   * If not specified, the caller should mark as element as described by the hover card id.
   */
  setAriaDescribedBy?: boolean;

  /**
   * Length of compact card delay
   * @default 500
   */
  cardOpenDelay?: number;

  /**
   * Length of card dismiss delay. A min number is necessary for pointer to hop between target and card
   * @default 100
   */
  cardDismissDelay?: number;

  /**
   * Time in ms when expanded card should open after compact card
   * @default 1500
   */
  expandedCardOpenDelay?: number;

  /**
   * If true disables Card dismiss upon mouse leave, so that card sticks around.
   * @default false
   */
  sticky?: boolean;

  /**
   * Enables instant open of the full card upon click
   * @default false
   */
  instantOpenOnClick?: boolean;

  /**
   * Custom styles for this component
   */
  styles?: IStyleFunctionOrObject<IHoverCardStyleProps, IHoverCardStyles>;

  /**
   * Optional target element to tag hover card on
   */
  target?: HTMLElement | string;

  /**
   * Callback when card becomes visible
   */
  onCardVisible?: () => void;

  /**
   * Callback when card hides
   */
  onCardHide?: () => void;

  /**
   * Trap focus or not
   */
  trapFocus?: boolean;

  /**
   * Should block hover card or not
   */
  shouldBlockHoverCard?: () => void;

  /**
   * Set first focus into hover card.
   * @default false
   */
  setInitialFocus?: boolean;

  /**
   * HotKey used for opening the HoverCard when tabbed to target.
   * @default 'KeyCodes.c'
   */
  openHotKey?: KeyCodes;

  /**
   * Additional CSS class(es) to apply to the Shimmer container.
   */
  className?: string;

  /**
   * Theme provided by higher order component.
   */
  theme?: ITheme;
}

export interface IHoverCardStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;
}

export interface IHoverCardStyles {
  /**
   * Style for the host element in the default enabled, non-toggled state.
   */
  host?: IStyle;
}
