import * as React from 'react';

import { IRefObject } from '../../Utilities';
import { ITheme, IStyle } from '../../Styling';
import { DirectionalHint } from '../../common/DirectionalHint';

/**
 * BaseCard common props.
 */
export interface IBaseCardProps<TCard> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the TCard interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<TCard>;

  /**
   *  Item to be returned with onRender functions
   */
  renderData?: any;

  /**
   * Element to anchor the card to.
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
   * Make callout content show on the set side
   * @default true
   */
  directionalHintFixed?: boolean;

  /**
   * Trap focus or not
   */
  trapFocus?: boolean;

  /**
   * Focus on first element by default on card or not
   */
  firstFocus?: boolean;

  /**
   * Additional CSS class(es) to apply to the Card content wrapper div.
   */
  className?: string;
}

export interface IBaseCardStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Optional className(s) for Card content wrapper div.
   */
  className?: string;
}

export interface IBaseCardStyles {
  /**
   * Style for the root element in the default enabled, non-toggled state.
   */
  root?: IStyle;
}
