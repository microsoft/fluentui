import { IBaseProps } from '@uifabric/utilities';
import { IStackSlot, IStackTokens } from 'office-ui-fabric-react';
import { IComponent, IComponentStyles, IStyleableComponentProps } from '@uifabric/foundation';

export type ICardComponent = IComponent<ICardProps, ICardTokens, ICardStyles>;

// These types are redundant with ICardComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.
export type ICardTokenReturnType = ReturnType<Extract<ICardComponent['tokens'], Function>>;
export type ICardStylesReturnType = ReturnType<Extract<ICardComponent['styles'], Function>>;

export interface ICard {}

export interface ICardSlots {
  /**
   * Defines root slot of the component for managing the layout of the Card.
   */
  root?: IStackSlot;
}

export interface ICardProps extends ICardSlots, IStyleableComponentProps<ICardProps, ICardTokens, ICardStyles>, IBaseProps<ICard> {
  /**
   * Defines whether to render a regular or a compact Card.
   * @defaultvalue false
   */
  compact?: boolean;

  /**
   * Defines a callback that is called when the Card is clicked.
   */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export interface ICardTokens extends IStackTokens {
  /**
   * Defines the box shadow of the Card.
   */
  boxShadow?: string;

  /**
   * Defines the box shadow of the Card when it is in a hovered state.
   */
  boxShadowHovered?: string;

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
   * Defines the padding of the Card, between the Card border and the Card contents.
   */
  padding?: number | string;

  /**
   * Defines a fixed width for the Card.
   */
  width?: number | string;
}

export type ICardStyles = IComponentStyles<ICardSlots>;
