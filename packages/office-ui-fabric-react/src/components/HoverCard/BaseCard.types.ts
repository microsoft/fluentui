import * as React from 'react';

import { DirectionalHint } from '../../common/DirectionalHint';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';

/**
 * Interface containing props common for all types of cards.
 */
export interface IBaseCardProps<TComponent, TStyles, TStyleProps> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the TComponent interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<TComponent>;

  /**
   * Additional CSS class(es) to apply to the Card content wrapper div.
   */
  className?: string;

  /**
   * How the element should be positioned
   * @defaultvalue DirectionalHint.bottomLeftEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * Make callout content show on the set side
   * @defaultvalue true
   */
  directionalHintFixed?: boolean;

  /**
   * Focus on first element by default on card or not
   */
  firstFocus?: boolean;

  /**
   * The gap between the card and the target
   * @defaultvalue 0
   */
  gapSpace?: number;

  /**
   * Callback upon focus or mouse enter event
   */
  onEnter?: (ev?: any) => void;

  /**
   * Callback upon blur or mouse leave event
   */
  onLeave?: (ev?: any) => void;

  /**
   *  Item to be returned with onRender functions
   */
  renderData?: any;

  /**
   * Custom styles for this component
   */
  styles?: IStyleFunctionOrObject<TStyleProps, { [P in keyof TStyles]: IStyle }>;

  /**
   * Element to anchor the card to.
   */
  targetElement?: HTMLElement;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Trap focus or not
   */
  trapFocus?: boolean;
}

/**
 * Interface containing styleProps common for all types of cards.
 */
export interface IBaseCardStyleProps {
  /**
   * ClassName to inject into wrapper div of the content.
   */
  className?: string;

  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;
}

/**
 * Interface containing style sections common for all types of cards.
 */
export interface IBaseCardStyles {
  /**
   * Style for the root element in the default enabled, non-toggled state.
   */
  root?: IStyle;
}
