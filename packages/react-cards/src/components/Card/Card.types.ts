import * as React from 'react';
import { IStackSlot, IStackTokens } from '@fluentui/react/lib/Stack';
import { IBaseProps } from '@fluentui/react/lib/Utilities';
import { IComponent, IComponentStyles, IStyleableComponentProps } from '@fluentui/foundation-legacy';

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardComponent = IComponent<ICardProps, ICardTokens, ICardStyles>;

// These types are redundant with ICardComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardTokenReturnType = ReturnType<Extract<ICardComponent['tokens'], Function>>;

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardStylesReturnType = ReturnType<Extract<ICardComponent['styles'], Function>>;

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICard {}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardSlots {
  /**
   * Defines the root slot of the component for managing the layout of the Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  root?: IStackSlot;
}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
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
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  horizontal?: boolean;

  /**
   * Defines a callback that is called when the Card is clicked.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Defines a callback that is called when the Card is a key is pressed down while focus is on the Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  onKeyDown?: (ev?: React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardTokens extends IStackTokens {
  /**
   * Defines the border of the Card when it is in a focused state.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  borderFocused?: string;

  /**
   * Defines the box shadow of the Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  boxShadow?: string;

  /**
   * Defines the box shadow of the Card when it is in a focused state.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  boxShadowFocused?: string;

  /**
   * Defines the box shadow of the Card when it is in a hovered state.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  boxShadowHovered?: string;

  /**
   * Defines the margin that is applied to the Card's children.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  childrenMargin?: number;

  /**
   * Defines the mouse cursor to be displayed when pointing over the Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  cursor?: string;

  /**
   * Defines a fixed height for the Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  height?: number | string;

  /**
   * Defines the box shadow of the Card when in high contrast mode.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  highContrastBoxShadow?: string;

  /**
   * Defines the box shadow of the Card when it is in a focused state and in high contrast mode.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  highContrastBoxShadowFocused?: string;

  /**
   * Defines the box shadow of the Card when it is in a hovered state and in high contrast mode.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  highContrastBoxShadowHovered?: string;

  /**
   * Defines a minimum height the Card has regardless of the contents within it.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  minHeight?: number | string;

  /**
   * Defines the minimum width of the Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  minWidth?: number | string;

  /**
   * Defines the maximum width of the Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  maxWidth?: number | string;

  /**
   * Defines a fixed width for the Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  width?: number | string;
}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardStyles = IComponentStyles<ICardSlots>;
