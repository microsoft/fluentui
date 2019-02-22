import { IComponent, IComponentStyles, IHTMLSlot, IStyleableComponentProps } from '../../Foundation';
import { IStackSlot } from 'office-ui-fabric-react';
import { IBaseProps } from '../../Utilities';

export type ICardComponent = IComponent<ICardProps, ICardTokens, ICardStyles>;

// These types are redundant with ICardComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.
export type ICardTokenReturnType = ReturnType<Extract<ICardComponent['tokens'], Function>>;
export type ICardStylesReturnType = ReturnType<Extract<ICardComponent['styles'], Function>>;

export interface ICard {}

export interface ICardSlots {
  /**
   * Defines root slot of the component.
   */
  root?: IHTMLSlot;

  /**
   * Defines a stack slot for managing the layout of the Card.
   */
  stack?: IStackSlot;
}

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
//    If you don't want these props to be included in your component, just remove this extension.
export interface ICardProps extends ICardSlots, IStyleableComponentProps<ICardProps, ICardTokens, ICardStyles>, IBaseProps<ICard> {
  /**
   * Defines whether to render a regular or a compact Card.
   * @defaultvalue false
   */
  compact?: boolean;
}

export interface ICardTokens {}

export type ICardStyles = IComponentStyles<ICardSlots>;
