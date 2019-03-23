import { IComponentStyles, IHTMLSlot, ISlotProp, IComponent, IStyleableComponentProps } from '../../Foundation';
import { IFontStyles } from '../../Styling';

export type ITextComponent = IComponent<ITextProps, ITextTokens, ITextStyles>;

// These types are redundant with ITextComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type ITextTokenReturnType = ReturnType<Extract<ITextComponent['tokens'], Function>>;
export type ITextStylesReturnType = ReturnType<Extract<ITextComponent['styles'], Function>>;

export type ITextSlot = ISlotProp<ITextProps, React.ReactNode>;

export interface ITextSlots {
  root?: IHTMLSlot;
}

// Inputs to the component
export interface ITextProps
  extends ITextSlots,
    IStyleableComponentProps<ITextProps, ITextTokens, ITextStyles>,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Optionally render the component as another component type or primitive.
   */
  as?: React.ReactType<React.HTMLAttributes<HTMLElement>>;

  /**
   * Optional font type for Text.
   */
  variant?: keyof IFontStyles;

  /**
   * Whether the text is displayed as a block element.
   *
   * Note that in order for ellipsis on overflow to work properly,
   * `block` and `nowrap` should be set to true.
   */
  block?: boolean;

  /**
   * Whether the text is not wrapped.
   *
   * Note that in order for ellipsis on overflow to work properly,
   * `block` and `nowrap` should be set to true.
   */
  nowrap?: boolean;
}

export interface ITextTokens {}

export type ITextStyles = IComponentStyles<ITextSlots>;
