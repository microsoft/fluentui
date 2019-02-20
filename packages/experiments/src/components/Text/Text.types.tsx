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
export interface ITextProps extends ITextSlots, IStyleableComponentProps<ITextProps, ITextTokens, ITextStyles> {
  /**
   * Optionally render the component as another component type or primitive.
   */
  as?: string | React.ReactType<ITextProps>;

  /**
   * Optional class name for Text.
   */
  className?: string;

  /**
   * Inline styling.
   */
  style?: React.CSSProperties;

  /**
   * Optional font type for Text.
   */
  variant?: keyof IFontStyles;

  /**
   * Whether the text is displayed as an inline element.
   * Note that inline does not support ellipsis truncation by default.
   */
  inline?: boolean;

  /**
   * Whether the text is wrapped.
   */
  wrap?: boolean;
}

export interface ITextTokens {}

export type ITextStyles = IComponentStyles<ITextSlots>;
