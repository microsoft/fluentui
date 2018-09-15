import * as React from 'react';

import { IExpandingCardProps } from './ExpandingCard/ExpandingCard.types';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject, KeyCodes } from '../../Utilities';

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
   * Additional CSS class(es) to apply to the HoverCard root element.
   */
  className?: string;

  /**
   * Length of card dismiss delay. A min number is necessary for pointer to hop between target and card
   * @default 100
   */
  cardDismissDelay?: number;

  /**
   * Length of compact card delay
   * @default 500
   */
  cardOpenDelay?: number;

  /**
   * Time in ms when expanded card should open after compact card
   * @default 1500
   */
  expandedCardOpenDelay?: number;

  /**
   * Additional properties to pass through for HoverCard, reference detail properties in IHoverCardProps
   */
  expandingCardProps?: IExpandingCardProps;

  /**
   * Enables instant open of the full card upon click
   * @default false
   */
  instantOpenOnClick?: boolean;

  /**
   * Callback when card becomes visible
   */
  onCardVisible?: () => void;

  /**
   * Callback when card hides
   */
  onCardHide?: () => void;

  /**
   * HotKey used for opening the HoverCard when tabbed to target.
   * @default 'KeyCodes.c'
   */
  openHotKey?: KeyCodes;

  /**
   * Whether or not to mark the container as described by the hover card.
   * If not specified, the caller should mark as element as described by the hover card id.
   */
  setAriaDescribedBy?: boolean;

  /**
   * Set to true to set focus on the first focusable element in the card. Works in pair with the 'trapFocus' prop.
   * @default false
   */
  setInitialFocus?: boolean;

  /**
   * Should block hover card or not
   */
  shouldBlockHoverCard?: () => void;

  /**
   * If true disables Card dismiss upon mouse leave, so that card sticks around.
   * @default false
   */
  sticky?: boolean;

  /**
   * Custom styles for this component
   */
  styles?: IStyleFunctionOrObject<IHoverCardStyleProps, IHoverCardStyles>;

  /**
   * Optional target element to tag hover card on.
   * If not provided and using HoverCard as a wrapper, don't set 'data-is-focusable=true' attribute to the root of the wrapped child.
   * When no target given, HoverCard will use it's root as a target and become the focusable element with a focus listener attached to it.
   */
  target?: HTMLElement | string;

  /**
   * Theme provided by higher order component.
   */
  theme?: ITheme;

  /**
   * Set to true if you want to render the content of the HoverCard in a FocusTrapZone for accessibility reasons.
   * Optionally 'setInitialFocus' prop can be set to true to move focus inside the FocusTrapZone.
   */
  trapFocus?: boolean;
}

export interface IHoverCardStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Optional className(s) for the host div of HoverCard.
   */
  className?: string;
}

export interface IHoverCardStyles {
  /**
   * Style for the host element in the default enabled, non-toggled state.
   */
  host?: IStyle;
}
