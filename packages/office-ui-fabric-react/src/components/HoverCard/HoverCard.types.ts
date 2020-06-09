import * as React from 'react';

import { IExpandingCardProps } from './ExpandingCard.types';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject, KeyCodes } from '../../Utilities';
import { IPlainCardProps } from './PlainCard/PlainCard.types';

/**
 * {@docCategory HoverCard}
 */
export interface IHoverCard {
  /**
   * Public `dismiss` method to be used through `componentRef` of the HoverCard.
   * Boolean argument controls if the dismiss happens with a timeout delay.
   */
  dismiss: (withTimeOut?: boolean) => void;
}

/**
 * HoverCard component props.
 * {@docCategory HoverCard}
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
   * @defaultvalue 100
   */
  cardDismissDelay?: number;

  /**
   * Length of compact card delay
   * @defaultvalue 500
   */
  cardOpenDelay?: number;

  /**
   * Time in ms when expanded card should open after compact card
   * @defaultvalue 1500
   */
  expandedCardOpenDelay?: number;

  /**
   * Additional ExpandingCard props to pass through HoverCard like renderers, target. gapSpace etc.
   * Used along with 'type' prop set to HoverCardType.expanding.
   * Reference detail properties in ICardProps and IExpandingCardProps.
   */
  expandingCardProps?: IExpandingCardProps;

  /**
   * Enables instant open of the full card upon click
   * @defaultvalue false
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
   * @defaultvalue 'KeyCodes.c'
   */
  openHotKey?: KeyCodes;

  /**
   * Additional PlainCard props to pass through HoverCard like renderers, target, gapSpace etc.
   * Used along with 'type' prop set to HoverCardType.plain.
   * See for more details ICardProps and IPlainCardProps interfaces.
   */
  plainCardProps?: IPlainCardProps;

  /**
   * Whether or not to mark the container as described by the hover card.
   * If not specified, the caller should mark as element as described by the hover card id.
   */
  setAriaDescribedBy?: boolean;

  /**
   * Callback when visible card is expanded.
   */
  onCardExpand?: () => void;

  /**
   * Set to true to set focus on the first focusable element in the card. Works in pair with the 'trapFocus' prop.
   * @defaultvalue false
   */
  setInitialFocus?: boolean;

  /**
   * Should block hover card or not
   */
  shouldBlockHoverCard?: () => void;

  /**
   * If true disables Card dismiss upon mouse leave, so that card sticks around.
   * @defaultvalue false
   */
  sticky?: boolean;

  /**
   * Custom styles for this component
   */
  styles?: IStyleFunctionOrObject<IHoverCardStyleProps, IHoverCardStyles>;

  /**
   * Optional target element to tag hover card on. If not provided and using HoverCard as a wrapper, don't set the
   * 'data-is-focusable=true' attribute to the root of the wrapped child.
   * If no target is given, HoverCard will use its root as a target and become the focusable element with a
   * focus listener attached to it.
   */
  target?: HTMLElement | string | null;

  /**
   * This prop is to separate the target to anchor hover card from the target to attach event listener.
   * If set, this prop separates the target to anchor the hover card from the target to attach the event listener.
   * When no `eventListenerTarget` given, HoverCard will use `target` prop or its root to set event listener.
   */
  eventListenerTarget?: HTMLElement | string | null;

  /**
   * Theme provided by higher order component.
   */
  theme?: ITheme;

  /**
   * Set to true if you want to render the content of the HoverCard in a FocusTrapZone for accessibility reasons.
   * Optionally 'setInitialFocus' prop can be set to true to move focus inside the FocusTrapZone.
   */
  trapFocus?: boolean;

  /**
   * Type of the hover card to render.
   * @defaultvalue HoverCardType.expanding
   */
  type?: HoverCardType;
}

/**
 * {@docCategory HoverCard}
 */
export enum OpenCardMode {
  /**
   * Open card by hover
   */
  hover = 0,

  /**
   * Open card by hot key
   */
  hotKey = 1,
}

/**
 * {@docCategory HoverCard}
 */
export enum HoverCardType {
  /**
   * Plain card consisting of one part responsive to the size of content.
   */
  plain = 'PlainCard',

  /**
   * File card consisting of two parts: compact and expanded. Has some default sizes if not specified.
   */
  expanding = 'ExpandingCard',
}

/**
 * {@docCategory HoverCard}
 */
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

/**
 * {@docCategory HoverCard}
 */
export interface IHoverCardStyles {
  /**
   * Style for the host element in the default enabled, non-toggled state.
   */
  host?: IStyle;
}
