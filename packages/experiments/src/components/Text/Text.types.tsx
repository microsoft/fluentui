import { IComponentStyles, IHTMLSpanSlot, ISlotProp, IStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { IFontStyles } from '../../Styling';

export type ITextComponent = IStatelessComponent<ITextProps, ITextTokens, ITextStyles>;

export type ITextSlot = ISlotProp<ITextProps, 'children'>;

export interface ITextSlots {
  root?: IHTMLSpanSlot;
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
