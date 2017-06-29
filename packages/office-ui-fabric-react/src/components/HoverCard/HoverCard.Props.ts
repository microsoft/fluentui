import * as React from 'react';
import { HoverCard } from './HoverCard';
import { IRenderFunction } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';

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
   *  Item to be returned with onRender functions
   */
  item?: any;

  /**
   *  Render function to populate compact content area
   */
  onRenderCompactContent: IRenderFunction<IHoverCardProps>;

  /**
   *  Render function to populate expanded content area
   */
  onRenderExpandedContent?: IRenderFunction<IHoverCardProps>;

  /**
   * Element to anchor the HoverCard to.
   */
  targetElement?: HTMLElement;

  /**
   * Callback when the HoverCard tries to open
   */
  onEnter?: (ev?: any) => void;

  /**
   * Callback when the HoverCard tries to close
   */
  onDismiss?: (ev?: any) => void;

  /**
   * Time in ms when expanded card should open
   * @default 1000
   */
  expandedCardOpenDelay?: number;

  /**
   * Height of compact card
   * @default 156
   */
  compactCardHeight?: number;

  /**
   * Height of expanded card
   * @default 384
   */
  expandedCardHeight?: number;

  /**
   * Use to open the card in expanded format and not wait for the delay
   * @default false
   */
  openExpanded?: boolean;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Custom styles for this component
   */
  styles?: IHoverCardStyles;
}

export interface IHoverCardStyles {
  /**
   * Style for the root element in the default enabled, non-toggled state.
   */
  root?: IStyle;

  /**
   * Style for the main card element.
   */
  compactCard?: IStyle;

  /**
   * Base Style for the expanded card content
   */
  expandedCard?: IStyle;
}