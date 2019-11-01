import * as React from 'react';
import { IBaseProps } from '@uifabric/utilities';
import { IStackSlot, IStackTokens } from 'office-ui-fabric-react';
import { IComponent, IComponentStyles, IStyleableComponentProps } from '@uifabric/foundation';

/**
 * {@docCategory Card}
 */
export type ICardComponent = IComponent<ICardProps, ICardTokens, ICardStyles>;

// These types are redundant with ICardComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.

/**
 * {@docCategory Card}
 */
export type ICardTokenReturnType = ReturnType<Extract<ICardComponent['tokens'], Function>>;

/**
 * {@docCategory Card}
 */
export type ICardStylesReturnType = ReturnType<Extract<ICardComponent['styles'], Function>>;

/**
 * {@docCategory Card}
 */
export interface ICard {}

/**
 * {@docCategory Card}
 */
export interface ICardSlots {
  /**
   * Defines the root slot of the component for managing the layout of the Card.
   */
  root?: IStackSlot;
}

/**
 * {@docCategory Card}
 */
export interface ICardProps
  extends ICardSlots,
    IStyleableComponentProps<ICardProps, ICardTokens, ICardStyles>,
    IBaseProps<ICard>,
    React.AllHTMLAttributes<HTMLElement> {
  /**
   * Defines whether to render a vertical or a horizontal Card.
   * @defaultvalue false
   */
  horizontal?: boolean;

  /**
   * Defines a callback that is called when the Card is clicked.
   */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

/**
 * {@docCategory Card}
 */
export interface ICardTokens extends IStackTokens {
  /**
   * Defines the box shadow of the Card.
   */
  boxShadow?: string;

  /**
   * Defines the box shadow of the Card when it is in a hovered state.
   */
  boxShadowHovered?: string;

  /**
   * Defines the margin that is applied to the Card's children.
   */
  childrenMargin?: number;

  /**
   * Defines the mouse cursor to be displayed when pointing over the Card.
   */
  cursor?: string;

  /**
   * Defines a fixed height for the Card.
   */
  height?: number | string;

  /**
   * Defines the box shadow of the Card when in high contrast mode.
   */
  highContrastBoxShadow?: string;

  /**
   * Defines the box shadow of the Card when it is in a hovered state and in high contrast mode.
   */
  highContrastBoxShadowHovered?: string;

  /**
   * Defines a minimum height the Card has regardless of the contents within it.
   */
  minHeight?: number | string;

  /**
   * Defines the minimum width of the Card.
   */
  minWidth?: number | string;

  /**
   * Defines the maximum width of the Card.
   */
  maxWidth?: number | string;

  /**
   * Defines a fixed width for the Card.
   */
  width?: number | string;
}

/**
 * {@docCategory Card}
 */
export type ICardStyles = IComponentStyles<ICardSlots>;
