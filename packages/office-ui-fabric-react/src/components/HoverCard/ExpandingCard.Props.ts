import * as React from 'react';
import { ExpandingCard } from './ExpandingCard';
import { IRenderFunction } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';
import { DirectionalHint } from '../../common/DirectionalHint';

export interface IExpandingCard {

}

/**
 * ExpandingCard component props.
 */
export interface IExpandingCardProps extends React.HTMLAttributes<HTMLDivElement | ExpandingCard> {
  /**
   * Optional callback to access the IExpandingCard interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IExpandingCard) => void;

  /**
   *  Item to be returned with onRender functions
   */
  renderData?: any;

  /**
   *  Render function to populate compact content area
   */
  onRenderCompactCard?: IRenderFunction<IExpandingCardProps>;

  /**
   *  Render function to populate expanded content area
   */
  onRenderExpandedCard?: IRenderFunction<IExpandingCardProps>;

  /**
   * Element to anchor the ExpandingCard to.
   */
  targetElement?: HTMLElement;

  /**
   * Callback upon focus or mouse enter event
   */
  onEnter?: (ev?: any) => void;

  /**
   * Callback upon blur or mouse leave event
   */
  onLeave?: (ev?: any) => void;

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
   * @default ExpandingCardMode.compact
   */
  mode?: ExpandingCardMode;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * How the element should be positioned
   * @default DirectionalHint.bottomLeftEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * The gap between the card and the target
   * @default 0
   */
  gapSpace?: number;

  /**
   * Custom styles for this component
   */
  styles?: IExpandingCardStyles;

  /**
   * Make callout content fixed on the set side
   */
  directionalHintFixed?: boolean;
}

export enum ExpandingCardMode {
  /**
   * To have top compact card only
   */
  compact = 0,

  /**
   * To have both top compact and bottom expanded card
   */
  expanded = 1
}

export interface IExpandingCardStyles {
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

  /**
   * Style for the expanded card scroll content
   */
  expandedCardScroll?: IStyle;
}