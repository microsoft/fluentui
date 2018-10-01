import { IStyle, IPalette, ISemanticColors } from '../../Styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { IFontVariants, IFontFamilies, IFontSizes, IFontWeights } from '../../Styling';

export type ITextComponent = IStatelessComponent<ITextProps, ITextStyles>;

// Styles for the component
export interface ITextStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
}

// Inputs to the component
export interface ITextProps extends IStyleableComponentProps<ITextProps, ITextStyles> {
  /**
   * Optionaly render the component as another component type or primative.
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
  variant?: keyof IFontVariants;

  /**
   * Optional font family for Text.
   */
  family?: keyof IFontFamilies;

  /**
   * Optional font size for Text.
   */
  size?: keyof IFontSizes;

  /**
   * Optional font weight for Text.
   */
  weight?: keyof IFontWeights;

  /**
   * Optional font color for Text.
   */
  color?: keyof IPalette | keyof ISemanticColors;

  /**
   * Optional color for hovered text.
   */
  hoverColor?: keyof IPalette | keyof ISemanticColors;

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
