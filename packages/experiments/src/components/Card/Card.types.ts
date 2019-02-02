import { IComponent, IComponentStyles, IHTMLSlot, IStyleableComponentProps } from '../../Foundation';
import { IStackSlot } from '../../Stack';
import { IBaseProps } from '../../Utilities';

export type ICardComponent = IComponent<ICardProps, ICardTokens, ICardStyles>;

// These types are redundant with ICardComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.
export type ICardTokenReturnType = ReturnType<Extract<ICardComponent['tokens'], Function>>;
export type ICardStylesReturnType = ReturnType<Extract<ICardComponent['styles'], Function>>;

// Optional interface to use for componentRef. This should be limited in scope with the most common scenario being for focusing elements.
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
   * Defines how to render the Card.
   */
  as?: string | React.ReactType<ICardProps>;

  /**
   * Defines whether to render a regular or a compact Card.
   * @defaultvalue false
   */
  compact?: boolean;
}

export interface ICardTokens {}

export type ICardStyles = IComponentStyles<ICardSlots>;
